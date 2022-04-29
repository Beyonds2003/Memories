import React from 'react'
import {Grid, CircularProgress}  from "@material-ui/core"
import {useSelector} from "react-redux"
import Post from './Post/Post'
import {useDispatch} from "react-router-dom"
import "./style.css"


function Posts({userId, setUserId}) {
    
    let select = useSelector((state) => state.posts)
    let data = select
    const load = useSelector((state) => state.load)
    

    React.useEffect(() => {
      data = select
    }, [select])


    
    return (
      <div style={{width: "100%"}}>
     {data.length === 0 ||  load ? 
     <CircularProgress /> :
     <Grid container alignItems='stretch' spacing={3} direction="row" id="pad">
         {data.map(post => 
         <Grid item xs={12} sm={12} md={6} lg={3}  key={post._id}>
          <Post  post={post} userId={userId} setUserId={setUserId}/>
         </Grid>
         )}
     </Grid>
     }
      </div>
    )
}

export default Posts
