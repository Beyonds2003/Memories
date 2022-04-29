export default (posts = [], action) => {
    switch (action.type) {
        case "GET":
            return action.payload.post
        case "GET_BY_SEARCH":
            return action.payload
        case "CREATE":
            return posts
        case "UPDATE":
            return posts.map(item => item._id === action.payload._id ? action.payload : item)
        case "DELETE":
            return posts.filter(item => item._id !== action.payload._id )
        default:
            return posts
    }
}

 