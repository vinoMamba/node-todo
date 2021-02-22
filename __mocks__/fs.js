const fs = jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

const mocks = {}
fs.setMock = (path, error, data) => {
    mocks[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
    if (callback === undefined) {
        callback = options
    }
    if (path in mocks) {
        callback(...mocks[path])
    } else {
        _fs.readFile(path, options, callback)
    }
}
module.exports = fs
