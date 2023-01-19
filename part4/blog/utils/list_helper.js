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

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}