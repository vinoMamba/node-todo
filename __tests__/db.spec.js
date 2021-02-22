const db = require('../db')

const fs = require('fs')
jest.mock('fs')

describe('db', () => {
    it('can read', async () => {
        const data = [{taskName: 'hi', done: true}]
        fs.setMock('/xxx', null, JSON.stringify(data))
        const list = await db.read('/xxx')
        expect(list).toStrictEqual(data)
    });
})
