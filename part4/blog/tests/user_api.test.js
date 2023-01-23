const bcryptjs = require('bcryptjs')
const User = require('../build/user')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')

const api = supertest(app)

describe('when there is initially one user in db', () => {
    beforeEach( async () => {
        await User.deleteMany({})

        const passwordHash = await bcryptjs.hash('sekret', 10)
        const user = new User({ username: 'root', password: passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username:'ellioteisenberg',
            name:'Elliot Eisenberg',
            password:'sekretpassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username:'root',
            name:'super user',
            password:'supersecretpassword'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })

    test('creation fails with invalid username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'ab',
            name: 'Short Username',
            password: 'goodpassword'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)


        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
        expect(result.body.error).toContain('username must be more than three characters')
    })

    test('creation fails with invalid password', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'goodusername',
            name: 'Short Username',
            password: 'bp'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
        expect(result.body.error).toContain('password must be more than three characters')
    })

    afterAll(() => {
        mongoose.connection.close()
    })
})