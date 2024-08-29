# optim

> optim模块中实现了各种各样的优化算法

## 优化器的使用

统一步骤：

1. 初始化优化器
2. 计算梯度
3. 优化

eg:

```python
optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
loss.backword()
optimizer.step()
```

## Optimizer

Optimizer是实现各种优化算法的父类，具体的优化算法都继承自Optimizer。

```python
torch.optim.Optimizer(params, defaults)
```

Parameters:

- `param`(iterable)：一个`torch.Tensor`的可迭代对象，或`dict`
- `default`(Dict[str, Any])

> `param`指定的可迭代对象必须是在过程中有确定性顺序，且在过程中保持一致性的可迭代对象。如集合类型、字典的values()方法返回的迭代器等就不符合要求

Function:

- `Optimizer.add_param_group`:追加一个待优化参数组
- `Optimizer.load_state_dict`:加载优化器状态
- `Optimizer.state_dict`:获取优化器状态
- `Optimizer.step`:执行一步优化
- `Optimizer.zero_grad`:清空梯度

## 常用优化器

- `Adadelta`
- `Adagrad`
- `Adam`
- `AdamW`
- `SparseAdam`
- `Adamax`
- `ASGD`
- `LBFGS`
- `NAdam`
- `RAdam`
- `RMSprop`
- `Rprop`
- `SGD`

> 以上算法在pytorch中都有实现，具体使用方法可以参考官方文档

## 实现细节

优化器的实现有很多方式，pytorch主要支持了三种实现方式：

- for-loop
- foreach
- fused

> pytorch虽然实现了三种方式，但为了简化使用，pytorch总是默认使用三种实现方式中最快的那一种。

### for-loop

for-loop是最简单的实现方式，直接按照算法公式迭代更新参数。所有优化方法都有对应的for-loop实现。

> for-loop实现的优化器一般都比较慢，但是所有的优化算法都可以通过for-loop实现

### foreach

foreach是pytorch的新特性，可以自动化并行化计算，并减少内存占用。其实现逻辑简单来说就是将所有优化参数整合成一个多张量，然后使用张量运算一次性得出结果，从而节省许多顺序内核调用的开销。

> 不是所有优化方案都能实现foreach

### fused

fused是在foreach的基础上，进一步优化了计算效率。其主要思想是将优化算法的计算分解成多个步骤，将多个步骤的大量计算合并到一个内核中，然后使用张量运算一次性得出结果。

> 不是所有优化方案都能实现fused

## 调整学习率

`torch.optim.lr_scheduler`提功能几个方法在训练过程中调整学习率。

以`torch.optim.lr_scheduler.ReduceLROnPlateau`为例介绍学习率调整器的使用方式，其主要功能是当评估指标不再改善时，减少学习率。

```python
optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
scheduler = ExponentialLR(optimizer, gamma=0.9)

for epoch in range(20):
    for input, target in dataset:
        optimizer.zero_grad()
        output = model(input)
        loss = loss_fn(output, target)
        loss.backward()
        optimizer.step()
    scheduler.step()
```

学习率调整器一般是在每epoch结束时调用。

此外，可以同时使用多个调整器:

```python
optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
scheduler1 = ExponentialLR(optimizer, gamma=0.9)
scheduler2 = MultiStepLR(optimizer, milestones=[30,80], gamma=0.1)

for epoch in range(20):
    for input, target in dataset:
        optimizer.zero_grad()
        output = model(input)
        loss = loss_fn(output, target)
        loss.backward()
        optimizer.step()
    scheduler1.step()
    scheduler2.step()
```

> 最终效果是第二个调整器会在第一个调整器的结果的基础上继续调整

引入学习率调整器后的炼丹过程：

```python
scheduler = ...
for epoch in range(100):
    train(...)
    validate(...)
    scheduler.step()
```

> 在Pyorch的`1.1.0`版本之前，学习率调整器应该被放在每次optimizer更新之前，但是在这之后学习率调整器就被期望放在optimizer更新之后了。如果你坚持将其放在之前，则会跳过第一次训练的学习率调整。

### 支持的学习率调整算法

- `LambdaLR`
- `MultiplicativeLR`
- `StepLR`
- `MultiStepLR`
- `ConstantLR`
- `LinearLR`
- `ExponentialLR`
- `PolynomialLR`
- `CosineAnnealingLR`
- `ChainedScheduler`
- `SequentialLR`
- `ReduceLROnPlateau`
- `CyclicLR`
- `OneCycleLR`
- `CosineAnnealingWarmRestarts`

## 权重平均（SWA和EMA）

“Weight Averaging”（权重平均）是指在训练深度学习模型的过程中，对模型权重进行平均处理的一种技术。Pytorch中实现的主要有两种方案：

- SWA（Stochastic Weight Averaging）
- EMA（Exponential Moving Average）

### SWA

SWA是一种简单有效的权重平均方法，其思想是每一轮训练结束后，将模型权重的当前状态作为一次“检查点”，并将其与之前的检查点的平均值作为模型的最终权重。

通过在训练的最后阶段对多个模型权重进行平均，从而生成一个更鲁棒、泛化能力更强的模型。SWA 可以通过对不同训练阶段的模型权重进行平均来扩展优化的区域，从而提高模型的性能。

示例代码:

```python
loader, optimizer, model, loss_fn = ...
swa_model = torch.optim.swa_utils.AveragedModel(model)
scheduler = torch.optim.lr_scheduler.CosineAnnealingLR(optimizer, T_max=300)
swa_start = 160
swa_scheduler = SWALR(optimizer, swa_lr=0.05)
for epoch in range(300):
      for input, target in loader:
          optimizer.zero_grad()
          loss_fn(model(input), target).backward()
          optimizer.step()
      if epoch > swa_start:
          swa_model.update_parameters(model)
          swa_scheduler.step()
      else:
          scheduler.step()
# Update bn statistics for the swa_model at the end
torch.optim.swa_utils.update_bn(loader, swa_model)
# Use swa_model to make predictions on test data
preds = swa_model(test_input)
```

> `torch.optim.swa_utils.SWALR`是与swa配套使用的学习率调整器

### EMA

EMA 是另一种常用的技术，它通过对模型权重的指数加权移动平均来减少模型训练中的波动性。与普通的平均相比，EMA 会赋予较新权重更高的权重，使得模型对最近的数据更敏感，同时又保持了一定的稳定性。

示例代码：

```python
loader, optimizer, model, loss_fn = ...
ema_model = torch.optim.swa_utils.AveragedModel(model, \
            multi_avg_fn=torch.optim.swa_utils.get_ema_multi_avg_fn(0.999))
for epoch in range(300):
      for input, target in loader:
          optimizer.zero_grad()
          loss_fn(model(input), target).backward()
          optimizer.step()
          ema_model.update_parameters(model)
# Update bn statistics for the ema_model at the end
torch.optim.swa_utils.update_bn(loader, ema_model)
# Use ema_model to make predictions on test data
preds = ema_model(test_input)
```



