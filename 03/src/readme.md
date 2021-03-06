# homework 第一周 5.23-5.29

## 画图/寻路问题

---
根据课程教授内容完成了画板小应用以及寻路算法

  ##### 收获如下
  - 画板实现
    - 根据简单的思路（类似于上节课井字棋的DOM控制方式绘制画板、画笔、橡皮擦）完成基础画板
    -  通过js去操作DOM进行绘制，初始化面板时需要固定画板宽度，以正确保存后期绘制内容
    -  行与行之间存在间隙，需要手动调整行间距line-height
    -  通过灵活使用js原生鼠标交互方法，对点击的DOM进行颜色属性调整，以达到绘制效果
    -  左键绘制（这里需要绑定在container父容器上，以确保从边界外向里进行绘制时可以出发绘制方法），右键擦除
    -  保存绘制，根据格子的状态存储在一维数组中
  - 寻路算法（基于画板事实绘制设置障碍，进行寻路计算）
    - 这里的寻路类似于上一节的井字棋思想，占据一个位置时，可以走八个方向（上下左右，左上（下），右上（下）。
    - 首先限制边界情况
      - 没有走到的点  map [100 * y + x]
      - 超过画板边界  x <= 0 || y<= 0 || x >= 100 || y >= 100
      - 其余的点进行标记 （标记位置时需要将这里换成带进来的pre（上一个点））
    - 课程中使用广度（队列）/深度（栈）的两种方式进行数据的存取，性能相比之下寻路来说队列的方式更加可取
    - 通过入队出队来循环遍历
      - 判断当前点是否和终点（End）重合 -> 找到终点，开始回溯路线  （过程中需要更新坐标）
      - 回溯停止的条件 -> 当前点与起点重合
    - 队列的优化点在于对入队的数组进行排序
      - 使用普通排序
      - 使用二叉树排序 （这部分没明白二叉树的存取顺序，看的懵）
