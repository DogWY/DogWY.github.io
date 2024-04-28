# Pygame Front Page

## 快速开始

欢迎来到PyGame！在你安装好pygame之后（对于大部分人来说其实就是执行了`pip install pygame` 或者 `pip3 install pygame`），下一步就是如何拉起一个游戏的主循环。不想其他的库，Pygame会给你程序的完全控制权。这意味着你在初始化的时候很容易踩雷。

以下是一个好的例子，这个例子包含了打开窗口、刷新屏幕并且执行循环：

```python
# Example file showing a basic pygame "game loop"
import pygame

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # fill the screen with a color to wipe away anything from last frame
    screen.fill("purple")

    # RENDER YOUR GAME HERE

    # flip() the display to put your work on screen
    pygame.display.flip()

    clock.tick(60)  # limits FPS to 60

pygame.quit()
```

这里还有一个更丰满的例子，这个例子展示了如何让一个东西（在这个例子里是一个圆）绕着屏幕移动：

```python
# Example file showing a circle moving on screen
import pygame

# pygame setup
pygame.init()
screen = pygame.display.set_mode((1280, 720))
clock = pygame.time.Clock()
running = True
dt = 0

player_pos = pygame.Vector2(screen.get_width() / 2, screen.get_height() / 2)

while running:
    # poll for events
    # pygame.QUIT event means the user clicked X to close your window
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # fill the screen with a color to wipe away anything from last frame
    screen.fill("purple")

    pygame.draw.circle(screen, "red", player_pos, 40)

    keys = pygame.key.get_pressed()
    if keys[pygame.K_w]:
        player_pos.y -= 300 * dt
    if keys[pygame.K_s]:
        player_pos.y += 300 * dt
    if keys[pygame.K_a]:
        player_pos.x -= 300 * dt
    if keys[pygame.K_d]:
        player_pos.x += 300 * dt

    # flip() the display to put your work on screen
    pygame.display.flip()

    # limits FPS to 60
    # dt is delta time in seconds since last frame, used for framerate-
    # independent physics.
    dt = clock.tick(60) / 1000

pygame.quit()
```

如果你想更近一步的学习，可以浏览接下来的`Tutorial`部分、也可以查看[视频教程](https://www.youtube.com/watch?v=AY9MnQ4x3zk)，或者按照模块查看API文档。