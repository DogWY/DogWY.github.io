# BLEU

## 介绍

BLEU（Bilingual Evaluation Understudy）是一种机器翻译评价指标，由WMT（The Conference on Machine Translation）评测小组于2002年提出。

## 原理

BLEU的原理是通过计算参考翻译和生成翻译的n-gram重合程度，来衡量生成翻译的质量。

假设有两个句子：

1. 参考翻译：The quick brown fox jumps over the lazy dog.
2. 生成翻译：The quick brown dog jumps on the log.

首先，将两个句子分割成n-gram，n-gram的长度由1到4个词组成。

- 1-gram：The, quick, brown, fox, jumps, over, the, lazy, dog.
- 2-gram：The quick, quick brown, brown fox, fox jumps, jumps over, over the, the lazy, lazy dog.
- 3-gram：The quick brown, quick brown fox, brown fox jumps, fox jumps over, jumps over the, over the lazy, the lazy dog.
- 4-gram：The quick brown fox, quick brown fox jumps, brown fox jumps over, fox jumps over the, jumps over the lazy, over the lazy dog.

1-gram中，只有"The"、"quick"和"brown"三个词组重合，所以BLEU值为$\frac{3}{9} = \frac{1}{3}$。

2-gram中，只有"The quick"和"quick brown"两个词组重合，所以BLEU值为$\frac{2}{8}=\frac{1}{4}$。

3-gram中，只有"The quick brown"和"brown fox"两个词组重合，所以BLEU值为$\frac{2}{7}$。

4-gram中，没有词组重合，所以BLEU值为$0$。

综上，BLEU值为$\frac{1}{3}\alpha_{1-gram}+\frac{1}{4}\alpha_{2-gram}+\frac{1}{7}\alpha_{3-gram}+\frac{0}{1}\alpha_{4-gram}=...$，取值范围为0到1，值越接近1，生成翻译的质量越好。

> $\alpha_{n-gram}$是n-gram的权重，取值范围为0到1，取值越大，n-gram的权重越大。

## 计算方法

BLEU的计算方法如下：

1. 首先，将参考翻译和生成翻译分割成n-gram。
2. 然后，计算每个n-gram的重合程度。
3. 最后，计算所有n-gram的重合程度的加权平均值，作为BLEU的评价结果。

## 参考

- [BLEU: a Method for Automatic Evaluation of Machine Translation](https://www.aclweb.org/anthology/P02-1040.pdf)