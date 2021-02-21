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
module.exports.showAll = async () => {
    const list = await db.read()
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
                //选中一个任务
                inquirer
                    .prompt({
                        type: 'list',
                        name: 'action',
                        message: '请选择你要执行的操作',
                        choices: [
                            {name: '退出', value: 'quit'},
                            {name: '已完成', value: 'finished'},
                            {name: '未完成', value: 'unfinished'},
                            {name: '改标题', value: 'editTaskName'},
                            {name: '删除', value: 'delete'},
                        ]
                    }).then(answer2 => {
                    switch (answer2.action) {
                        case 'finished':
                            list[index].done = true
                            db.write(list)
                            break;
                        case 'unfinished':
                            list[index].done = false
                            db.write(list)
                            break;
                        case 'editTaskName':
                            inquirer.prompt({
                                type: 'input',
                                name: 'taskName',
                                message: '新的任务名',
                                default: list[index].taskName
                            }).then(answer3 => {
                                list[index].taskName = answer3.taskName
                                db.write(list)
                            })
                            break;
                        case 'delete':
                            list.splice(index, 1)
                            db.write(list)
                            break;
                    }
                })
            } else if (index === -1) {
                //退出
            } else if (index === -2) {
                //创建任务
                inquirer.prompt({
                    type: 'input',
                    name: 'taskName',
                    message: '输入任务名',
                }).then(answer => {
                    list.push({taskName: answer.taskName, done: false})
                    db.write(list)
                })
            }
        });

}
