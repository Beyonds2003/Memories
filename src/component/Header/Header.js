import React from 'react'
import "./style.css"
import {Avatar, Button, Typography} from "@material-ui/core"
import {useSelector, useDispatch} from "react-redux"
import { bgcolor } from '@mui/system'
import { purple } from '@material-ui/core/colors'
import {Link, Routes, Route, useNavigate} from "react-router-dom"
import { getPosts } from '../../action/posts'

function Header({setChange}) {
    const [auth, setAuth] = React.useState(JSON.parse(localStorage.getItem("profile")))
    const [img1, setImg1] = React.useState("https://i.ibb.co/cvkcJFm/memories-Text.png")
    const [img2, setImg2] = React.useState("https://i.ibb.co/NyJqJWK/memories-Logo.png")

    const userData = auth?.result
    const user = auth
    const select = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logout = () => {
      dispatch({type: "LOGOUT"})
      navigate("/auth")
    }

    React.useEffect(() => {
       setAuth(JSON.parse(localStorage.getItem("profile")))
       dispatch(getPosts())
    }, [navigate])
 
    return (
        <div>
            <div className='header'>
              <div className='he'>
                <Link to={`/?page=${JSON.parse(localStorage.getItem("num"))}`}><img src={img1} className='memoriesText' onClick={() => setChange(pres => !pres)}/></Link>
                <img src={img2} className='memoriesLogo'/>
              </div>
              {!user ? 
               <div className='signIncontainer'>
                   <Link to="/auth"><Button id='signIn'>SIGN IN</Button></Link>
               </div> :
               <div className='signIncontainer'>
                 <Avatar id='avatar'>{userData.name.split("")[0]}</Avatar>
                 <Typography variant='h6' id="name">{userData.name}</Typography>
                 <Button id='logout' onClick={logout}>LOGOUT</Button>
               </div>
              }
            </div>
        </div>
    )
}

export default Header
