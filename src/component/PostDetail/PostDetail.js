import React from 'react'
import {useDispatch, useSelector} from "react-redux"
import {CircularProgress, Paper, Container, Typography, Divider, TextField, Button, Grid} from "@material-ui/core"
import "./style.css"
import {formatDistance} from "date-fns"
import {getDataBySearch, getPostDetail, postComment} from "../../action/posts"
import {useNavigate, useParams, Link } from 'react-router-dom'


function PostDetail({data}) {
    let user
    const select = useSelector(state => state.detail)
    const [comment, setComment] = React.useState("")
    const [ok, setOk] = React.useState(false)
    const [sugg, setSugg] = React.useState([])

    const params = useParams()
    const detail = select[0]
    const dispatchs = useDispatch()
    const [com, setCom] = React.useState([])
    const [postData, setPostData] = React.useState([])
    const check = comment === ""
    const putRef = React.useRef(null)
    const navigate = useNavigate()
    let query = ""

    React.useEffect(() => {
      async function fetchData() {
         const newComment = await dispatchs(getPostDetail(params.id))
         const sugPosts = await dispatchs(getDataBySearch(query, newComment[0].tags.join(",")))
         const filterSug = sugPosts.filter(item => item._id !== params.id)
         setSugg(filterSug)
         setCom(newComment[0])
       }
       fetchData()
     }, [])
    
    try {
      user = JSON.parse(localStorage.getItem("profile")).result.name
    } catch (error) {
      console.log("")
    }


    async function handleComment() {
      await dispatchs(postComment({comment: `${user}: ${comment}`}, detail._id))
      setComment("")
      setCom(pres => {
        return {...pres, comments: [`${user}: ${comment}`, ...pres.comments]}
      })
      setOk(pres => !pres)
    }

    function handleSwitch(id) {
      navigate(`/posts/post/${id}`)
      dispatchs(getPostDetail(id))
      window.location.reload(false)
    }

   if(com.length === 0) {
     return   <Paper elevation={6} id="load" style={{marginTop: "15px"}}>
     <CircularProgress id="circle"/>
  </Paper>
   }
    return (
        <div>
            {com.lenght < 1 ? 
             <Paper elevation={6} id="load">
                <CircularProgress id="circle"/>
             </Paper> :
            <div className='postDetail'>
                 <Paper elevation={6} style={{borderRadius: "15px"}}>
                   <Container maxWidth="xl">
                     <div className='main'>
                       <div className='first'>
                        <Typography variant='h5' gutterBottom style={{fontSize: "26px"}} >{com.title}</Typography>
                        <Typography variant='body2' style={{opacity: "0.8", fontSize: "17px"}} gutterBottom>{com.tags.map(item => (`# ${item} `))}</Typography> 
                        <Typography variant='h6' style={{fontSize: "16px"}} gutterBottom>{com.messages}</Typography>
                        <Typography variant='h6' gutterBottom>Created by: {com.creator}</Typography>
                        <Typography variant='h6' style={{marginBottom: "20px", fontSize: "17px"}}>{formatDistance(Date.parse(com.createdAt), new Date())} ago</Typography>
                        <Divider />
                        <div id="main2">
                          <div className='com'>
                            {com.comments.length === 0 ?
                              <Typography variant='h6'>No comment</Typography>
                            : 
                            <>
                            {com.comments.map((com, i) => 
                              <Typography key={i} variants="h6" gutterBottom style={{display: "flex"}}>
                                <Typography style={{fontWeight: "bold"}}>
                                  {com.split(":")[0]} :
                                </Typography>&nbsp;
                                <Typography>{com.split(":")[1]}</Typography>  
                              </Typography>
                              )}
                              <div ref={putRef} />
                              </>}
                          </div>
                          {user && <div id="no22">
                            <Typography variant='h6'>Write a Comment</Typography>
                            <TextField 
                            name='comment'
                            label="Comment"
                            onChange={(e) => setComment(e.target.value)}
                            multiline
                            rows="3"
                            fullWidth
                            variant='outlined'
                            value={comment}
                            />
                            <Button fullWidth id="colors" onClick={handleComment} disabled={check}>COMMENT</Button>
                          </div>}
                        </div>
                        <Divider />
                       </div>
                       <Container maxWidth="sm" id="con">
                         <div className='imgContainer'>
                          <img src={com.selectedFile} className="img"/>
                         </div>
                       </Container>
                     </div>
                     {sugg.length > 0 && 
                     <div>
                        <Typography variant='h6' gutterBottom>You might also like:</Typography>
                        <Divider />  
                        <div>
                        <Grid container alignItems='stretch' spacing={3} direction="row">
                           {sugg.map(data => 
                            <Grid item xs={12} sm={12} md={3} lg={3} xl={6} key={data._id} style={{marginTop: "15px"}}>
                            <Typography variant='h6' gutterBottom style={{fontWeight: "bold", cursor: "pointer"}} onClick={() => handleSwitch(data._id)}>{data.title}</Typography>
                            <Typography variant='body2' gutterBottom>{data.creator}</Typography>
                            <Typography variant='body2' gutterBottom>{data.messages}</Typography>
                            <Typography variant='body2' style={{fontWeight: "bold"}} gutterBottom>LIKE: <span>{data.likeCount.length}</span></Typography>
                            <img src={data.selectedFile} id="img4"/>
                            </Grid>
                            ) }
                        </Grid>
                        </div>
                     </div>}
                   </Container>
                 </Paper>
            </div>
            }
        </div>
    )
}

export default PostDetail
