# Introduction to Pygame

本篇是写给Python程序员的Pygame库的介绍。本篇最早发表在[PyZine第1卷第3期](https://web.archive.org/web/20030810011958/http://store.pyzine.com:80/article.phtml?a=2)。如今你看到的版本包含了一些小的修订，这是为了让本篇更加的全面和完善。Pygame是一个Python的扩展库，封装了SDL库以及其他的一些辅助库。

## 历史

Pygame起始于2000年的夏天。作为一个C语言程序员，我同时发现了Python和SDL。你应该已经很熟悉Python了。现在让我简单介绍一下SDL，即[Simple DirectMedia Layer](http://www.libsdl.org/)。SDL是由Sam Lantinga编写，是一个用于空值多媒体的阔平台C语言库，可以与DirectX相媲美。SDL已经在成百上千的商业和开源游戏中运用。这两个项目的简洁给我留下了很深的印象，并且不久之后我就意识到了混合Python和SDL是一个有趣的提议。

我发现了一个进行中的小项目PySDL，我的想法和他不谋而合。PySDL是由Mark Baker编写的，它直接将SDL作为Python扩展实现。它的接口比通用的SWIG封装更佳简洁，但是我感觉它强迫了一种“C语言风格”的代码。PySDL的爆死促使我自己来构建一个新项目。

## 体验一下吧

我发现理解一个新的库的最好方式是直接浏览一个例子。在pygame的早期，我使用7行代码构造了一个弹跳的球。现在让我试试用一个更友好的代码实现相同的功能。