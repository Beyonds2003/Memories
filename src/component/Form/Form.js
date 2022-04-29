import React from 'react'
import "./style.css"
import {Button, TextField, Paper, Typography} from "@material-ui/core"
import {useDispatch} from "react-redux"
import { createPosts, getPosts, updatePost } from '../../action/posts'
import FileBase from "react-file-base64"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

function Form({userId, setUserId, setChange}) {

    const dispatch = useDispatch()
    const select = useSelector(state => state.posts)
    const findUserById = select.find(item => item._id === userId)
    const localData = JSON.parse(localStorage.getItem("profile"))
    const navigate = useNavigate()

   
    const [text, setText] = React.useState({
        "name": "",
        "title": "",
        "messages": "",
        "tags": "",
        "selectedFile": ""
    })

    function type(event) {
        setText(pres => {
            return {...pres, [event.target.name]: event.target.value}
        })
    }

    function type1(e) {
        setText(pres => {
            return {...pres, tags: e.target.value.split(",")}
        })
    }

    function choose({base64}) {
        setText(pres => {
            return {...pres, selectedFile: base64}
        })
    }

    const handleSubmit = async (e) => {
       e.preventDefault()
       if(userId) {
           return dispatch(updatePost(userId, text))
       }
      const data = await dispatch(createPosts({...text, creator: localData.result.name, createdAt: new Date()}))
       setChange(pres => !pres)
       navigate(`/posts/post/${data[0]._id}`)
       clear()
    }

    React.useEffect(() => {
     if(userId) {
      setText(pres => {
          return {...pres, creator: findUserById.creator, title: findUserById.title, messages: findUserById.messages, tags: findUserById.tags, selectedFile: findUserById.selectedFile}
      })
     } 
    }, [userId])

    function clear() {
      setUserId(null)
      setText(pres => {
          return {...pres, creator: "", title: "", messages: "", tags: "", selectedFile: ""}
      })
    }

    React.useEffect(() => {
     clear()
    }, [navigate])
    return (
        <>
            {localData ?
            <div className='form'>
            <div className='head'>{userId? "Editing": "Creating"} a Memory</div>
             <form autoComplete='off' noValidate>
                <div id="title"><TextField id="outlined-basic" name="title" value={text.title} label="Title" variant="outlined" onChange={type} fullWidth/></div>
                <div id="messages"><TextField id="outlined-basic" name="messages" value={text.messages} label="Message" variant="outlined" onChange={type} fullWidth /></div>
                <div id='tags'><TextField id="outlined-basic" name="tags" label="Tags" value={text.tags} variant="outlined" onChange={type1} fullWidth/></div>
                <div className='file'><FileBase type="file" multiple={false} value={text.selectedFile} onDone={choose} /></div>
                <div id="tags2"><Button id='button1' onClick={handleSubmit}>Submit</Button></div>
                <div id="tags2"><Button id='button2' onClick={clear}>Clear</Button></div>
             </form>
             </div> :
              <div>
            <Paper elevation={3}>
               <Typography align="center" className='noti'>
                   Please Sign In to create your own memories and like other's memories
               </Typography>
             </Paper>
              </div>
              }
        </>
    )
}

export default Form
