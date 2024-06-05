# 论文报告

> 汇总本人WiFi Sensing方向的论文读书笔记（精读）

## 记录在册

### 1. WiFi Sensing with Channel State Information: A Survey

> 时间：2019
> 
> 期刊：ACM Computing Surveys
>
> 关键词：`综述`

总结了WiFi Sensing领域的系统范式、研究方法、典型技术、主要应用。

### 2. WiFi Sensing on the Edge: Signal Processing Techniques and Challenges for Real-World Systems

> 时间：2023
>
> 期刊：IEEE Communications Surveys & Tutorials
>
> 关键词：`综述`

围绕边缘设备展开，突出算法的复杂度，贡献了一个基于ESP32开发板的WiFi Sensing系统套件。

### 3. Enabling Ubiquitous WiFi Sensing with Beamforming Reports

> 时间：2023
>
> 期刊：Proceedings of the ACM SIGCOMM 2023 Conference
>
> 关键词：`CBR`、`部署`

调研后发现当前大部分商用WiFi设备不支持CSI的获取，但是大部分都支持CBR（可以简单理解为CSI的压缩版）的获取。问题提出基于CBR的WiFi感知方案。主要思路：通过深度网络将CBR还原为CSI，这样就可以套用现有的基于CSI的方法了。

### 4. Wi-Fi Sensing for Joint Gesture Recognition and Human Identification From Few Samples in Human-Computer Interaction

> 时间：2022
>
> 期刊：IEEE Journal on Selected Areas in Communications
>
> 关键词：`共存`、`手势识别`、`身份验证`

基于小样本学习，提出了一个能够同时支持手势识别和身份验证的方法，该方法有一定的泛化能力，并且能够支持对未知手势和身份的识别。

## 别急，在看了

