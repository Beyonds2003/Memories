import React from 'react'
import {Card, CardMedia, CardContent, CardActionArea, Typography, Button, ButtonBase} from "@material-ui/core"
import "./style.css"
import {formatDistance} from "date-fns"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import {useDispatch, useSelector} from "react-redux"
import { deletePost, LikePost } from '../../action/posts';
import jwt_decode from "jwt-decode";
import { color } from '@mui/system';
import {getPostDetail} from "../../action/posts"
import { bottomNavigationClasses } from '@mui/material';
import {useNavigate} from "react-router-dom"

function Post({post, userId, setUserId}) {

    const [date, setDate] = React.useState(formatDistance(Date.parse(post.createdAt), Date.parse(new Date())))

  
    const removeAbout = date.split(" ")
    const realDate = removeAbout.splice(0, 3)
    const dispatch = useDispatch()
    const select = useSelector(state => state.posts)
    const checkUser = JSON.parse(localStorage.getItem("profile"))
    const navigate = useNavigate()

    let decodeToken=""

       try {
         decodeToken = jwt_decode(JSON.parse(localStorage.getItem("profile")).token)
       } catch (error) {
           console.log(error)
       }
    
    const [colors, setColors] = React.useState(post.likeCount.includes(`${decodeToken.id}`) || post.likeCount.includes(`${decodeToken.sub}`))
    const [likeLength, setLikeLength] = React.useState(post.likeCount.length)

    function setId(e) {
        e.stopPropagation()
        setUserId(post._id)
    }

    const LikeLogic = () => {
        if(likeLength === 0) {
            return `LIKE`
        }
        if(likeLength > 0) {
            return  `${likeLength} LIKES`
        }
    }

    function Like() {
        setColors(pres => !pres)
        setLikeLength(pres => {
            return colors ? pres - 1 : pres + 1
        })
        try {
           dispatch(LikePost(post._id))
        } catch (error) {
            console.log(error)
        }
    }

     const [logic, setLogic] = React.useState(LikeLogic)

    React.useEffect(() => {
      setLogic(LikeLogic)
    }, [likeLength])

    function delteData() {
        dispatch(deletePost(post._id))
     }
    
     const compressMessage = post.messages.length > 110 ? `${post.messages.split(" ").slice(0, 14).join(" ")}...` : post.messages
    
  async function postDetail() {
    await  dispatch(getPostDetail(post._id))
     navigate(`/posts/post/${post._id}`)
    }
    return (
        <div className='post'>
        <ButtonBase onClick={postDetail} style={{width: "100%"}}>
           <Card variant='outlined' style={{borderRadius: "15px", "height": "340px", width: "100%"}}>
               <div style={{position: "relative"}}>
                   <CardMedia image={post.selectedFile} className="image"/>
                   <div className='black'></div>
                </div>
               <div className='overlay'>
                    <div  style={{textAlign: "start"}}> 
                     <Typography variant='h6' size="high">{post.creator}</Typography> 
                     <Typography>{date} ago</Typography>
                    </div> 
                    {decodeToken.id === post.creatorId || decodeToken.sub === post.creatorId ?
                    <Button size='small' id='dot' onClick={setId}><MoreHorizIcon /></Button> : null} 
               </div>
               <div className='pad' style={{textAlign: "start"}}>
                <Typography>{post.tags.map(tag => (`# ${tag} `))}</Typography>
                <Typography variant='h5' style={{padding: "10px 0px"}}>{post.title}</Typography>
                <Typography variant='body2'>{compressMessage}</Typography>
               </div>
           </Card>
        </ButtonBase>
        <div className="butContainer">
            <Button size='small' id='but' onClick={Like} disabled={!checkUser}>{colors ? <ThumbUpAltIcon  color={!checkUser ? "disabled" : "primary"}/> : <ThumbUpOffAltIcon color={!checkUser ? "disabled" : ""} />}&nbsp; <span>{logic}</span></Button>
            {decodeToken.id === post.creatorId || decodeToken.sub === post.creatorId 
            ? <Button size='small' id='but' onClick={delteData}><DeleteIcon color='error'/> Delete</Button> : null}
        </div>
        </div>
    )
}

export default Post
