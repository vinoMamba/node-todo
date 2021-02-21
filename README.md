# node-todo

基于commander.js、inquire.js 实现的命令行TODO小程序

## 安装

#### 使用npm安装

```
npm install vino-todo
```

#### 使用yarn安装

```
yarn global add vino-todo
```

## 使用

#### 使用命令 `vn -h` 可以查看帮助信息

```shell
Options:
    -x, --xxx       what a xxx
-h, --help      display help for command

    Commands:
        add             add a task
clear           clear all tasks
showAll         show all tasks
help [command]  display help for command
```

#### 使用 `vn add  <taskName>`  添加任务

```shell
vn add 买菜
添加成功
? 请选择你要操作的任务
  退出
> [✘]1 - 买菜
  +创建任务
```

#### 使用 `vn clear`  清除所有任务

#### 使用 `vn showAll`  查看所有任务



