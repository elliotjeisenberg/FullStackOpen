const dummy = blogs => {
    return 1
}

const totalLikes = blogs => {
    const likes = blogs.reduce((accumulator, blog) => {
        return accumulator + blog.likes
    },0)
    return likes
}

const favoriteBlog = blogs => {
    if (blogs.length === 0 ) { return 0 }
    const favoriteBlog = blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog, blogs[0])
    return favoriteBlog
}

const mostBlogs = blogs => {
    //build a key value pair of blogs per author
    let postsPerAuthor = {}
    blogs.forEach( (post) => {
        const author = post.author
        if (postsPerAuthor[author] === undefined) {
            postsPerAuthor[author] = 1
        } else {
            postsPerAuthor[author] = postsPerAuthor[author] + 1
        }
    })

    //find the key value pair with the most blog posts
    const authorWithMostPosts = Object.keys(postsPerAuthor).reduce((authorWithMost, authorIterator) => {
        if (postsPerAuthor[authorIterator] > postsPerAuthor[authorWithMost] || authorWithMost === '') {
            return authorIterator
        } else {
            return authorWithMost
        }
    }, '')

    //return in the requested format
    return {
        author:authorWithMostPosts,
        blogs:postsPerAuthor[authorWithMostPosts]
    }
}

const mostLikes = blogs => {
    const likesPerAuthor = blogs.reduce((prev, curr) => {
        console.log(prev)
        prev[curr.author] = (prev[curr.author] || 0) + curr.likes
        return prev
    },{})
    console.log(Object.keys(likesPerAuthor).sort((a,b) => likesPerAuthor[a] - likesPerAuthor[b]))
    const authorWithMostLikes = (Object.keys(likesPerAuthor).sort((a,b) => likesPerAuthor[a] + likesPerAuthor[b])[0])

    return { author: authorWithMostLikes, likes: likesPerAuthor[authorWithMostLikes] }
}

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes }