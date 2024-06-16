# Impulse Function

脉冲函数，一般写作:$\delta(\cdot)$，是一种在数学和工程中广泛应用的特殊函数，主要功能是：在积分过程中挑选出特定点的函数值。

## 定义

Impulse function在数学上可以定义为一个在$t=0$时具有无限大值，但在其他点上值均为$0$的函数，同时它的无穷积分为$1$，即:

$$
\begin{align}
    &\int_{-\infty}^{\infty}\delta (t)dt = 1 \\ 
    &\delta(t) = 0 , 对于 t\not= 0
\end{align}
$$

## 筛选

$$
\int_{-\infty}^{\infty} f(t)\delta(t-t_0)dt = f(t_0)
$$

