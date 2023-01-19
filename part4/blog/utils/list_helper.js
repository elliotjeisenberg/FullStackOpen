const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
     return blogs.reduce((accumulator, blog) => {
        return accumulator + blog.likes
     },0)
};

const favoriteBlog = (blogs) => {
    const favBlog = blogs[Object.keys(blogs).sort((a,b) => blogs[b].likes - blogs[a].likes)[0]]
    
    return {
        title: favBlog['title'],
        author: favBlog['author'],
        likes: favBlog['likes']
    }
};

const mostBlogs = (blogs) => {
     const blogsPerAuthor = {}
     blogs.forEach((blog) => {
        blogsPerAuthor[blog.author] = blogsPerAuthor[blog.author] + 1 || 1
     })
     const authorWithMostBlogs = Object.keys(blogsPerAuthor).sort((a,b) => blogsPerAuthor[b] - blogsPerAuthor[a])[0]
     return {
        author: authorWithMostBlogs,
        blogs: blogsPerAuthor[authorWithMostBlogs]
     }
};

const mostLikes = (blogs) => {
     const likesPerAuthor = {}
     blogs.forEach((blog) => {
        likesPerAuthor[blog.author] = likesPerAuthor[blog.author] + blog.likes || blog.likes 
     })
     const authorWithMostLikes = Object.keys(likesPerAuthor).sort((a,b) => likesPerAuthor[b] - likesPerAuthor[a])[0]
     return {
        author: authorWithMostLikes,
        likes: likesPerAuthor[authorWithMostLikes]
     }
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}