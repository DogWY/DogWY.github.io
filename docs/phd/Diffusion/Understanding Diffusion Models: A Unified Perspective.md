# Understanding Diffusion Models: A Unified Perspective

> 论文翻译与阅读笔记

## Introduction: Generative Models

给定从感兴趣分布中学到的采样$x$，生成模型的目标是建模真实的分布$p(x)$。

有几个广为人知的方向：

- Generative Adversarial Network(GANS): 对复杂分布的采样过程进行建模，并且通过对抗的方式学习。
    
- “基于可能性的“：力求学一个模型，这个模型能够为观察到的采样分配高置信度。
    
- “基于能量的“：分布被学习为一个任意的灵活的能量函数，然后再进行归一化。
    
- “基于分数的”：学习基于能量的模型的分数
    

Diffusion Model既有基于可能性的解释，也有基于分数的解释。

## Background: ELBO, VAE, and Hierarchical VAE

对于大多数模态的数据，我们可以认为我们观察到的数据都是由一组不可见的潜变量生成或表达的。

> 一个形象的例子是柏拉图的洞穴预言，预言中，一群人被锁在山洞中，穷极一生他们只能看到他们的投影到石壁上的二维影子。二维影子就是由他们所看不到的三维的身体所生成的，他们所看到一切都是由他们观测不到的“高纬度抽象概念”所决定的。
> 
> 尽管洞穴中的人们无法看到印象的三维物体，但是他们仍然可以解释和推理它们。

如柏拉图语言所揭示的：浅变量是决定观察结果的潜在不可观察的表征，值得注意的是，在生成模型中我们通常寻求学习低纬潜在表征而不是高纬。

> 学习低纬度表征的原因：在没有先验的情况下学习高纬度表征是一件徒劳无功的事。而低纬度表征可以被解释为一种压缩，也可以视为对观察相关的特征的选择性揭露。

### Evidence Lower Bound

数学上，我们可以想象潜变量和我们观察到的数据是通过联合分布$p(x,z)$建模的。回想一个叫“基于似然”的生成模型方法，它是在学习一个模型来最大化所有观测到的$x$的似然$p(x)$。有两种方式通过联合分布恢复到我们观察到的数据的纯粹似然$p(x)$，我们可以明确地边缘化潜变量$z$:

$$
p(x) = \int p(x,z) dz \tag{1}
$$

> 似然：生成观测到的数据的可能性

也可以求助于链式法则:

$$
p(x) = \frac{p(x,z)}{p(z|x)} \tag{2}
$$

直接计算并最大化似然$p(x)$是困难的，因为它要么涉及对潜变量$z$进行积分（这对复杂模型来说是很难做到的），要么涉及对真是的潜变量编码器$p(z|x)$的需求。不过通过使用这两个等式，我们能够推导出ELBO(Evidence Lower Bound)的概念，如它的名字，他是证据的下界。证据在本文中被量化为观测到的数据的$\log$似然。然后，最大化ELBO就变成了优化潜变量模型的替代目标，在最优的情况下，当ELBO被有效的参数化并完美的优化，它会精确的等于证据。形式上，ELBO的公式可以写成：

$$
\mathbb{E}_{q_{\phi(z|x)}}[\log \frac{p(x,z)}{q_{\phi}(z|x)}] \tag{3}
$$

为了明确证据和ELBO之间的关系，我们可以从数学上表达：

$$
\log p(x) \ge \mathbb{E}_{q_\phi (z|x)}[\log \frac{p(x,z)}{q_\phi (z|x)}] \tag{4}
$$

> "证据"或"Evidence"我理解就是指$p(x)$的等价形式，这里是$\log p(x)$

这里，$q_\phi (z|x)$是一个灵活的对潜变量分布的近似，带有我们训有的参数$\phi$。直觉上，它可以被认为是一个可参数化的模型，能够估计给定样本$x$的潜变量$z$的分布，换句话说，它试图去逼近真实的后验概率$p(z|x)$。正如我们在探索变分自动编码器时所看到的，随着我们调整参数$\phi$来最大化ELBO，我们会提高下界，然后我们就会得到一个用来建模真实数据分布的组建，并且从中采样，由此学习到一个生成模型。现在，让我们尝试更深度的探索为什么我们的最大化目标是ELBO。

让我们先使用公式一推到出ELBO：

$$
\begin{align*}
\log p(x) &= \log \int p(x,z) dz & (Apply \ Equation \ 1) \\
&= \log \int \frac{p(x,z) q_{\phi}(z|x)dz}{q_\phi (z|x)} &(Multiply\ by\ 1 = \frac{q_\phi (z|x)}{q_\phi (z|x)})\\
&= \log \mathbb{E}_{q_\phi (z|x)}[\frac{p(x,z)}{q_\phi (z|x)}] &(Definition \ of \ Expectation) \\
&\ge \mathbb{E}_{q_\phi (z|x)}[\log \frac{p(x,z)}{q_\phi (z|x)}] &(Apply\ Jensen's\ Inequality) 
\end{align*}
$$

在以上的推导中，通过利用[詹森不等式](https://en.wikipedia.org/wiki/Jensen%27s_inequality)我们直接退出了下界。然而，这并没有为我们提供太多这背后发生的事情的信息；关键的是，这个证明并没有直观的说明为什么ELBO实际上是证据的下届，因为詹森不等式将其抛出在外。进一步的，仅知道ELBO是数据的真实下届并不能告诉我们为什么我们需要去以它为优化目标。为了更好理解证据和ELBO的关系，让我们进行另一个推导，这次我们使用公式二：

$$
\begin{align*}
\log p(x) &= \log p(x) \int q_\phi (z|x) dz &(Mulyipy\ by\ 1 = \int q_\phi(z|x)dz)\\
&=\int q_\phi(z|x)(\log p(x))dz &(Bring\ evidence\ into\ integral)\\
&= \mathbb{E}_{q_\phi (z|x)} [\log p(x)] &(Definition\ of\ Expectation)\\
&= \mathbb{E}_{q_\phi (z|x)}[\log \frac{p(x,z)}{p(z|x)}] &(Apply\ Equation\ 2) \\
&=\mathbb{E}_{q_\phi (z|x)}[\log \frac{p(x,z)q_\phi (z|x)}{p(z|x)q_\phi (z|x)}] &(Multiply\ by\ 1 = \frac{q_\phi (z|x)}{q_\phi (z|x)})\\
&=\mathbb{E}_{q_\phi (z|x)}[\log \frac{p(x,z)}{q_\phi (z|x)}] + \mathbb{E}_{q_\phi (z|x)}[\log \frac{q_\phi (z|x)}{p(z|x)}]&(Split\ the\ Expectation)\\
&=\mathbb{E}_{q_\phi (z|x)}[\log \frac{p(x,z)}{q_\phi (z|x)}] + D_{KL}(q_\phi(z|x)||p(z|x)) &(Definiton \ of\ KL\ Divergence)\\
&\ge \mathbb{E}_{q_\phi (z|x)}[\log \frac{p(x,z)}{q_\phi (z|x)}] &(KL\ Divergence\ always\ \ge 0)
\end{align*}
$$

经过以上推导，我们可以清楚的看到证据等于ELBO加上近似的后验概$q_\phi(z|x)$和真实的后验概率$p(z|x)$之间的KL散度。实际上，这个KL散度在上一个推导中被詹森不等式神奇的删除。理解这个推导不仅是理解ELBO和证据之间的关系的关键，还是理解为什么ELBO可以当作替代优化目标的关键。

首先，我们现在知道为什么ELBO是理想的下届：证据和ELBO之间差了一个严格非负的KL项，因此，ELBO 的价值永远不会超过证据。

其次，我们探索为什么我们寻求最大化 ELBO。在引入潜变量后，我们的目标是学习描述我们观察到的数据的潜在结构。换句话说，我们想要优化变分后验概率$q_\phi (z|x)$的的参数，来精确匹配真实的后验概率分布$p(z|x)$，这是通过最小化 KL 散度（理想情况下为零）来实现的。不幸的是，直接最小化 KL 散度项是很困难的，正如我们不能得到真实的$p(z|x)$。然而，如以上推导所展示的，我们的数据的似然（或者说证据$\log p(x)$）相对于$\phi$总是一个常数，因为它是通过从联合分布 $p(x, z)$ 中边缘化所有潜在 $z$ 来计算的，并且不依赖于 $\phi$。由于 ELBO 和 KL 散度项之和为一个常数，因此 ELBO 项相对于$\phi$的任何最大化都必然导致 KL 散度项的同等最小化。因此，最大化ELBO可以作为一个替代目标来学习如何完美的建模真实的潜变量后验分布。此外，一旦经过训练，ELBO 也可用于估计观察到或生成的数据的可能性，因为它被用来近似模型证据 $\log p(x)$。

### Variational Autoencoders(VAE)

在VAE的默认公式中，我们直接最大化ELBO。这种方法是变分的，因为我们在由 $\phi$ 参数化的一系列潜在后验分布中优化最佳$q_\phi (z|x)$。它被称为自动编码器，因为它让人想起传统的自动编码器模型，其中输入数据在经历中间瓶颈表示步骤后被训练以预测自身。为了明确这种联系，让我们进一步剖析 ELBO 术语：

$$
\begin{align*}
\mathbb{E}_{q_{\phi}(z|x)}[\log \frac{p(x,z)}{q_\phi (z|x)}] &= \mathbb{E}_{q_\phi (z|x)}[\log \frac{p_\theta (x|z)p(z)}{q_\phi (z|x)}] &(Chain\ Rule\ of\ Probability)\\
&=\mathbb{E}_{q_\phi (z|x)}[\log p_\theta (x|z)] + \mathbb{E}_{q_\phi (z|x)}[\log \frac{p(z)}{q_\phi (z|x)}] &(Split\ the\ Expectation)\\
&= \underbrace{\mathbb{E}_{q_\phi (z|x)}[\log p_\theta (x|z)]}_{reconstruction\ term} - \underbrace{D_{KL}(q_\phi (z|x)||p(z))}_{prior\ matching\ term} &(Definition\ of\ KL\ Divergence) \tag{5}
\end{align*}
$$

> $reconstruction\ term$最终变成了损失函数中的重建图像的均方误差，$prior\ matching\ term$最终变成了损失函数中的$\sum_{i=1}^d (exp{\sigma_i} - (1+\sigma_i) + (m_i)^2)$（推导过程见原始论文）

在这种情况下，我们学习一个可以被视为编码器的中间瓶颈分布$q_\phi (z|x)$；它将输入转换为可能的潜在变量的分布。相似的，我们学一个确定性的函数$p_\theta (x|z)$，它将给出的潜变量$z$转换为一个观测数据$x$，也能被叫做解码器。

公式 5 中的两项都有直观的描述：第一项根据我们的变分分布测量解码器的重建可能性，这确保了学习到的分布正在对可以重新生成原始数据的有效潜在变量进行建模。第二项衡量学习到的变分分布与对潜在变量的先验信念的相似程度，最小化第二项能够鼓励编码器实际去学习一个分布而不是塌陷为一个狄利克雷函数。此时最大化ELBO等价于最大化第一项，最小化第二项。

> 我理解上，最小化第二项确保了潜变量$z$与观测数据的$x$的相关性（如果$q_\phi (z|x)$与$p(z)$接近甚至相等，就表示潜变量$z$与观测数据$x$近乎独立，就与潜变量的概念不符合了），所以最小化$D_{KL}(q_\phi (z|x)||p(z))$就是在尽可能提高潜变量$z$与观测数据$x$的相关性。

VAE的一个决定性特性是如何对参数$\theta$和$\phi$进行联合优化。VAE的编码器通常选择建模为具有对角协方差的多元高斯分布，先验则通常选择为标准多元高斯分布：

$$
\begin{align*}
q_\phi(z|x) &= \mathcal{N}(z; \mu_\phi(x), \sigma^2_\phi(x)I) \\
p(z) &= \mathcal{N}(z; 0, I)
\end{align*}
$$

> 为什么用标准多维高斯分布建模$p(z)$？
> 答：因为假设一个分布能够简化计算过程，并且高斯分布在大自然中的大部分情况都是适用的，因此我们选择使用高斯分布建模隐变量，并希望如此作能够适配目标场景并简化计算。
> 更进一步将，其实对于GAN网络来说，把高斯分布替换为均匀分布在某些情况下会取得意想不到的效果，但是在VAE中，由于涉及到KL散度，使用均匀分布会导致出现除零错误，因此我们只能使用高斯分布。详情参见[博客](https://kexue.fm/archives/5253/comment-page-2)。

然后，可以分析计ELBO的KL散度，并且可以使用蒙特卡洛估计来近似重建项。我们的目标可以写为：

$$
\underset{\phi, \theta}{\arg \max} \mathbb{E}_{q_\phi (z|x)}[\log p_\theta (x|z)] - D_{KL}(q_\phi (z|x)||p(z)) \approx \underset{\phi, \theta}{\arg \max}\sum_{l=1}^{L} \log p_\theta (x|z^{(l)}) - D_{KL}(q_\phi (z|x)||p(z))
$$

其中潜变量$\{z^{(l)}\}^L_{l=1}$是从$q_\phi (z|x)$中采样得到的，对于数据集中的每个观测值 $x$ 。一个新的问题随之产生：每个用于计算损失的潜变量$z$是由随机采样产生的，这通常都是不可微分的。幸运的是，当 $q_\phi (z|x)$ 被设计为对某些分布（包括多元高斯分布）进行建模时，可以通过重新参数化技巧来解决这个问题。

重新参数化技巧将随机变量重写为噪声变量的确定性函数；这允许通过梯度下降来优化非随机项。比如，从一个均值为$\mu$方差为$\sigma^2$的正态分布中采样的噪声变量$x$可以被写为：

$$
x = \mu + \sigma \epsilon \ \ with\ \epsilon \sim N(\epsilon;0,I)
$$

换句话说，任意的高斯分布都可以被解释为标准高斯分布（$\epsilon$是一个采样），其均值通过加法从零转移到目标均值 μ，其方差被拉伸为目标方差$\sigma^2$。因此，通过重新参数化技巧，从任意高斯分布中的采样可以被转化为从标准高斯采样、按目标标准差缩放结果并按目标平均值移动来执行。

因此，在VAE中，每个 $z$ 都被计算为输入 $x$ 和辅助噪声变量$\epsilon$的确定性函数：

$$
z = \mu_\phi (x) + \sigma_\phi(x) \odot \epsilon \sim N(\epsilon;0,I)
$$

其中$\odot$表示元素级乘积。在这种$z$的表征下我们能够计算$\phi$的梯度，来优化$\mu_\phi$和$\sigma_\phi$。一句话来说，VAE利用重建参数化技巧和蒙特卡洛估计来联合优化$\phi$和$\theta$上的ELBO。

在训练后，可以通过直接从潜在空间 $p(z)$ 采样然后通过解码器来生成新数据。变分自编码器在$z$的维度小于$x$的维度时特别有趣，因为我们可能会学习紧凑，有用的表示。此外，当学习到语义上有意义的潜在空间时，隐变量能够在输入解码器之前进行编辑，从而更精确的控制数据的生成。

### Hierarchical Variational Autoencoders

分层变分自编码器时VAE的推广，可扩展到潜变量的多个层次结构。在这种阐述下，隐变量被建模为是从其他更高级别的更抽象的隐层生成而来的。正如我们将三维观察对象视为从更高层次的抽象潜在对象生成的一样，柏拉图洞穴中的人们将三维对象视为生成二维观察的潜在对象。因此，从柏拉图的洞穴居民的角度来看，他们的观察可以被视为由深度为二（或更多）的潜在层次结构建模。


