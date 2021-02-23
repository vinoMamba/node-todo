const fs = jest.genMockFromModule('fs')
const _fs = jest.requireActual('fs')

Object.assign(fs, _fs)

const readMocks = {}
fs.setReadMock = (path, error, data) => {
    readMocks[path] = [error, data]
}

fs.readFile = (path, options, callback) => {
    if (callback === undefined) {
        callback = options
    }
    if (path in readMocks) {
        callback(...readMocks[path])
    } else {
        _fs.readFile(path, options, callback)
    }
}

const writeMocks = {}
fs.setWriteMock = (path, fn) => {
    writeMocks[path] = fn
}
fs.writeFile = (path, data, options, callback) => {
    if (path in writeMocks) {
        writeMocks[path](path, data, options, callback)
    } else {
        _fs.writeFile(path, data, options, callback)
    }
}

module.exports = fs
