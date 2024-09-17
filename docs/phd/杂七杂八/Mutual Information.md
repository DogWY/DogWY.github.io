# Mutual Information

## 0. 预备知识

熵(entropy)的概念起源于物理学，用于度量一个热力系统的无序程度。在信息论中，熵是对不确定性的测量，用$H$表示。对随机变量X的熵表示为：

$$H(X)=-\sum_{x \in X} p(x) \log p(x)$$

## 1. 什么是互信息？

互信息（mutual information）是衡量两个随机变量之间的相互依赖程度的一种度量，用$I(X;Y)$表示。

> 知道随机变量X，对随机变量Y的不确定性减少的成度。也可以理解为随机变量X与随机变量Y之间共享的信息。

## 2. 互信息的计算方法

![互信息韦恩图](<assets/Mutual Information/image.png>)

$$
\begin{align*}
I(X;Y) & = H(X) - H(X|Y) = H(Y) - H(Y|X) \\ & = H(X) + H(Y) - H(X,Y) \\ & = \sum_{x,y} p(x,y) \log \frac{p(x,y)}{p(x)p(y)}
\end{align*}
$$
