import axios from "axios"
import { addQuarters } from "date-fns"

const pages = JSON.parse(localStorage.getItem("num"))


axios.interceptors.request.use((req) => {
  if(localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token}`
  }
  return req
})

const getPosts = (page) => async(dispatch) => { 
  try {
  dispatch({type: "START_LOADING"})
   const {data} = await axios.get(` https://memories1919.herokuapp.com/posts?page=${page || pages}`)
  
   dispatch({type: "GET", payload: data})
   dispatch({type: "TOTAL", payload: data})
   dispatch({type: "END_LOADING"})
  } catch(error) {
      console.log(error)
  }
}

const getPostDetail = (id) => async(dispatch) => {
  try {
    const { data } = await axios.get(` https://memories1919.herokuapp.com/posts/post/${id}`)
    dispatch({type: "DETAIL", payload: data})
    return data
  } catch (error) {
    console.log(error)
  }
}

const getDataBySearch = (searchQuery, tags) => async(dispatch) => {
  try {
    dispatch({type: "START_LOADING"})
    const { data } = await axios.get(` https://memories1919.herokuapp.com/posts/search?searchQuery=${searchQuery || "none"}&tag=${tags || "none"}`)
    dispatch({type: "GET_BY_SEARCH", payload: data})
    dispatch({type: "END_LOADING"})
    return data
  } catch (error) {
    console.log(error)
  } 
}

const createPosts = (postData) => async(dispatch) => {
  try {
    const {data} = await axios.post(" https://memories1919.herokuapp.com/posts", postData)
    dispatch({type: "CREATE", payload: data})
    return data
  } catch (error) {
    console.log(error)
  }
}

const updatePost = (id, updateData) => async(dispatch) => {
   try {
    const {data} = await axios.patch(` https://memories1919.herokuapp.com/posts/${id}`, updateData)
    dispatch({type: "UPDATE", payload: data})
   } catch (error) {
     console.log(error)
   }
}

const deletePost = (id) => async (dispatch) => {
  console.log(id)
  try {
    const {data} = await axios.delete(` https://memories1919.herokuapp.com/posts/${id}`)
    console.log(data)
    dispatch({type: "DELETE", payload: data})
  } catch (error) {
    console.log(error)
  }
}

const sendUserData = (form, navigate) => async (dispatch) => {
  try {
     const { data } = await axios.post(` https://memories1919.herokuapp.com/user/signup`, form)
     dispatch({type: "SEND", data: data})
     navigate("/")
  } catch (error) {
    dispatch({type: "ERROR", payload: error.response.data})
  }
}

const checkUserData = (form, navigate) => async(dispatch) => {
  try {
    const { data } = await axios.post(' https://memories1919.herokuapp.com/user/signin', form)
    dispatch({type: "CHECK", data: data})
    navigate("/")
  } catch (error) {
    dispatch({type: "ERROR", payload: error.response.data})
  }
}

const LikePost = (id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(` https://memories1919.herokuapp.com/posts/${id}/like`, {postId: id})
    dispatch({type: "UPDATE", payload: data})
  } catch (error) {
    console.log(error)
  }
}

const postComment = (comment, id) => async (dispatch) => {
  try {
    const { data } = await axios.patch(` https://memories1919.herokuapp.com/posts/post/${id}/comment`, {comment})
    dispatch({type: "COM", payload: data})
  } catch (error) {
    
  }
}

export {getPosts, createPosts, updatePost, deletePost, sendUserData, checkUserData, postComment, LikePost, getDataBySearch, getPostDetail}