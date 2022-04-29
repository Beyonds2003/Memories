import React from 'react'
import {getPosts, getDataBySearch} from './action/posts'
import {useDispatch, useSelector} from "react-redux"
import Header from './component/Header/Header'
import Form from './component/Form/Form'
import Posts from './component/Posts'
import {BrowserRouter as Router} from "react-router-dom"
import {Link, Routes, Route, Navigate, useNavigate} from "react-router-dom"
import Auth from './component/Auth/Auth'
import {Container, Paper, TextField, Button, CircularProgress} from "@material-ui/core"
import { Pagination } from '@mui/material'
import ChipInput from 'material-ui-chip-input'
import "./style.css"
import Home from './Home'
import { set } from 'date-fns'
import PostDetail from './component/PostDetail/PostDetail'


function App() {

    const dispatch = useDispatch()
    const [change, setChange] = React.useState(false)
    const userExit = JSON.parse(localStorage.getItem("profile"))
    const detail = useSelector(state => state.posts)
    const page = JSON.parse(localStorage.getItem("num"))

    React.useEffect(() => {
        setTimeout(() => {
            dispatch(getPosts())
        }, 1000)
      }, [dispatch])


    return (
        <Container maxWidth="xl">
            <Router>
            <Header setChange={setChange}/> 
            <Routes>
                <Route exact path='/' element={<Home change={change} setChange={setChange}/>} />
                <Route path='/posts/search' element={<Home change={change} setChange={setChange}/>} /> 
                <Route path="/auth" element={userExit ? <Navigate to="/" /> : <Auth />} />
                <Route path="/posts/post/:id" element={<PostDetail data={detail}/>} />
            </Routes>
            </Router>
        </Container>
    )
}

export default App
