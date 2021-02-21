const program = require('commander')
const api = require('./index')
program
    .option('-x, --xxx', 'what a xxx')
program
    .command('add')
    .description('add a task')
    .action((...args) => {
        const taskName = (args[args.length - 1].args).join(' ')
        api.add(taskName).then(() => {
            console.log('添加成功')
        }, () => {
            console.log('添加失败')
        })
    })
program
    .command('clear')
    .description('clear all tasks')
    .action(() => {
        api.clear().then(() => {
            console.log('清除成功')
        }, () => {
            console.log('清除失败')
        })
    })
program
    .command('showAll')
    .description('show all tasks')
    .action(() => {
        void api.showAll()
    })

if (process.argv.length === 2) {
    void api.showAll()
}
program.parse(process.argv)


