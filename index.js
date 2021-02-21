const db = require('./db')
const inquirer = require('inquirer');

module.exports.add = async (taskName) => {
    //读取本地文件，如果没有就创建文件
    const list = await db.read()
    //写入新任务
    list.push({taskName, done: false})
    //存储到文件
    await db.write(list)
    this.showAll()
}
module.exports.clear = async () => {
    await db.write([])
}

function taskFinished(list, index) {
    list[index].done = true
    db.write(list)
}

function taskUnfinished(list, index) {
    list[index].done = false
    db.write(list)
}

function editTaskName(list, index) {
    inquirer.prompt({
        type: 'input',
        name: 'taskName',
        message: '新的任务名',
        default: list[index].taskName
    }).then(answer3 => {
        list[index].taskName = answer3.taskName
        db.write(list)
    })
}

function deleteTask(list, index) {
    list.splice(index, 1)
    db.write(list)
}

function askForAction(list, index) {
    const actions = {taskFinished, taskUnfinished, editTaskName, deleteTask}
    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: '请选择你要执行的操作',
            choices: [
                {name: '退出', value: 'quit'},
                {name: '已完成', value: 'taskFinished'},
                {name: '未完成', value: 'taskUnfinished'},
                {name: '改标题', value: 'editTaskName'},
                {name: '删除', value: 'deleteTask'},
            ]
        }).then(answer2 => {
        const action = actions[answer2.action]
        action && action(list, index)
    })
}

function askForCreateTask(list) {
    inquirer.prompt({
        type: 'input',
        name: 'taskName',
        message: '输入任务名',
    }).then(answer => {
        list.push({taskName: answer.taskName, done: false})
        db.write(list)
    })
}

function printTasks(list) {
    inquirer
        .prompt(
            {
                type: 'list',
                name: 'index',
                message: '请选择你要操作的任务',
                choices: [{name: '退出', value: '-1'}, ...list.map((task, index) => {
                    return {
                        name: `${task.done ? '[✔]' : '[✘]'}${index + 1} - ${task.taskName}`,
                        value: index
                    }
                }), {name: '+创建任务', value: '-2'}]
            }
        )
        .then((answer) => {
            const index = parseInt(answer.index)
            if (index >= 0) {
                askForAction(list, index)
            } else if (index === -2) {
                askForCreateTask(list)
            }
        });
}

module.exports.showAll = async () => {
    //读取之前的任务
    const list = await db.read()
    //打印之前的任务
    printTasks(list)
}
