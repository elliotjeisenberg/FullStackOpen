const listhelper = require('../utils/listhelper')

test('dummy returns one', () => {
    const blogs = []
    const results = listhelper.dummy(blogs)
    expect(results).toBe(1)
})

const listWithOneBlog = [
    {
        title: 'Blog title',
        author: 'Elliot Eisenberg',
        url: 'www.google.com',
        likes: 3
    }
]

const listWithMultipleBlogs = [
    {
        title: 'Blog title',
        author: 'Elliot',
        url: 'www.google.com',
        likes: 5
    },
    {
        title: 'Blog title',
        author: 'Elliot',
        url: 'www.google.com',
        likes: 7
    },
    {
        title: 'Blog title',
        author: 'Oliver',
        url: 'www.google.com',
        likes: 11
    }
]

describe('total likes is zero', () => {

    test('of empty list', () => {
        const blogs = []
        const results = listhelper.totalLikes(blogs)
        expect(results).toBe(0)
    })
    test('when list has only one blog equals the likes of that blog', () => {
        const results = listhelper.totalLikes(listWithOneBlog)
        expect(results).toBe(3)
    })
    test('of multiple blogs', () => {
        const results = listhelper.totalLikes(listWithMultipleBlogs)
        expect(results).toBe(23)
    })
})

describe('favorite blog', () => {
    test('favorite blog of no blog equals 0', () => {
        const blogs = []
        const results = listhelper.favoriteBlog(blogs)
        expect(results).toBe(0)
    })
    test('favorite blog of single blog is that blog', () => {
        const results = listhelper.favoriteBlog(listWithOneBlog)
        expect(results).toEqual(listWithOneBlog[0])
    })
    test('favorite blog of multiple is calculated correctly', () => {
        const results = listhelper.favoriteBlog(listWithMultipleBlogs)
        expect(results).toEqual(listWithMultipleBlogs[2])
    })
})

describe('aggregate blog functions', () => {
    test('most likes of multiple is calculated correctly', () => {
        const results = listhelper.mostLikes(listWithMultipleBlogs)
        expect(results).toEqual({ author:'Elliot', likes:12 })
    })
    test('most likes of single is likes of that post', () => {
        const results = listhelper.mostLikes(listWithOneBlog)
        expect(results).toEqual({ author: 'Elliot Eisenberg', likes:3 })
    })
})