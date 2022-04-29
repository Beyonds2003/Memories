import { Avatar, Button, Container, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from '@material-ui/core'
import React from 'react'
import { Link, useNavigate } from "react-router-dom"
import "./style.css"
import LockIcon from '@mui/icons-material/Lock';
import GoogleLogin from "react-google-login"
import GoogleIcon from '@mui/icons-material/Google';
import {useDispatch, useSelector} from "react-redux"
import { sendUserData, checkUserData } from '../../action/posts';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

function Auth() {
   const [switchs, setSwitchs] = React.useState(false)
   const dispatch = useDispatch()
   const navigate = useNavigate()
   const [show, setShow] = React.useState(false)
   const [show1, setShow1] = React.useState(false)
   const [show2, setShow2] = React.useState(false)
   const errorMsg = useSelector(state => state.error)


   const [form, setForm] = React.useState({
     "firstname": "",
     "lastname": "",
     "email": "",
     "password": "",
     "repeatPassword": ""
   })

   function formData(e) {
     setForm(pres => {
       return {...pres, [e.target.name]: e.target.value}
     })
   }

   function signUp(e) {
     e.preventDefault()
    try {
      dispatch(sendUserData(form, navigate))
    } catch(error) {
      console.log(error)
    }
   }

   function signIn(e) {
     e.preventDefault()
     try {
      dispatch(checkUserData(form, navigate))
     } catch(error) {
       console.log(error)
     }
   }

   const googleSuccess = async (res) => {
     const result = res?.profileObj
     const token = res?.tokenId
     dispatch({type: "AUTH", data: {result, token}})
     navigate("/")
   }

   const googleFailure = (error) => {
     console.log(error)
   }

   const checkValid = errorMsg === {} ? false : true
   const disa = form.firstname === "" || form.password === "" ||  form.email === ""

  
    return (
      <Container id="container">
          <Grid container direction='row' justifyContent='center'>
            <Grid item sm={4} xs={12} >
              <Paper elevation={3} >
                <Container direction="row" justifyContent="center">
                    <div className='center top'>
                      <div>
                       <div className='center'><Avatar id="avatar"><LockIcon id="lock"/></Avatar></div>
                       <Typography variant='h5'>Sign {switchs ? "In": "Up"}</Typography>
                      </div>
                    </div>
                    <Typography variant='body2' align='center' color='error' style={{marginTop: "5px"}}>{errorMsg.msg}</Typography>
                    {!switchs ?<div className='name'>
                      <div style={{display: "flex"}}>
                       <TextField id="outlined-basic" name="firstname" label="First Name" onChange={formData} variant='outlined' autoFocus/>
                       <TextField id="outlined-basic" name="lastname" label="Last Name" onChange={formData} variant='outlined'/>
                      </div>
                      <TextField id="outlined-basic" name="email"  label="Email Address" onChange={formData} variant='outlined' fullWidth/>
                        <TextField 
                        id="outlined-basic" name="password" 
                        label="Password" onChange={formData} 
                        variant='outlined' fullWidth
                        type={show ? "text" : "password"}
                        InputProps={{
                          endAdornment: 
                            <InputAdornment position='end'>
                              <Button onClick={() => setShow(pres => !pres)}>
                                {show ? <VisibilityOffIcon /> : <VisibilityIcon />}
                              </Button>
                            </InputAdornment>
                        }}
                        />
                        <TextField id="outlined-basic" name="repeatPassword" 
                        label="Repeat Password" onChange={formData} 
                        variant='outlined' fullWidth
                        type={show1 ? "text" : "password"}
                        InputProps={{
                          endAdornment: 
                          <InputAdornment position='end'>
                           <Button onClick={() => setShow1(pres => !pres)}>
                             {show1 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                           </Button>
                          </InputAdornment>
                        }}
                        />
                      <Button fullWidth id="singUp" disabled={disa} onClick={signUp}>SIGN UP</Button>
                      <GoogleLogin 
                       clientId='33862851458-uv9b9imv7d76nci452ld8tojnitpjckf.apps.googleusercontent.com'
                       render={(renderProps) => (
                         <Button onClick={renderProps.onClick} id="google" fullWidth><GoogleIcon id="gIcon"/> GOOGLE LOGIN</Button>
                        )}
                       buttonText="Login"
                       onSuccess={googleSuccess}
                       onFailure={googleFailure}
                      />
                      <div className='center'>
                       <Typography variant='body2' id="check">ALREADY HAVE AN ACCOUNT? <span style={{color: "blue"}} onClick={() => setSwitchs(pres => !pres)}>SIGN IN</span></Typography>
                      </div>
                    </div> : 
                     <div className='name'>
                        <TextField id="outlined-basic" name="email" onChange={formData} label="Email Address" variant='outlined' fullWidth autoFocus/>
                        <TextField id="outlined-basic" name="password" 
                        label="Password" variant='outlined' fullWidth
                        onChange={formData}
                        type={show2? "text": "password"}
                        InputProps={{
                          endAdornment: 
                          <InputAdornment position='end'>
                           <Button onClick={() => setShow2(pres => !pres)}>
                             {show2 ? <VisibilityOffIcon /> : <VisibilityIcon />}
                           </Button>
                          </InputAdornment>
                        }}
                        />
                        <div><Button fullWidth id="singUp" onClick={signIn}>SIGN IN</Button></div>
                        <GoogleLogin 
                        clientId='33862851458-uv9b9imv7d76nci452ld8tojnitpjckf.apps.googleusercontent.com'
                        render={(renderProps) => (
                          <Button onClick={renderProps.onClick} id="google" fullWidth><GoogleIcon id="gIcon"/> GOOGLE LOGIN</Button>
                          )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        />
                        <div className='center'>
                          <Typography variant='body2' id="check">DON't HAVE AN ACCOUNT? <span style={{color: "blue"}} onClick={() => setSwitchs(pres => !pres)}>SIGN UP</span></Typography>
                        </div>
                     </div>
                    }
                </Container>
              </Paper>
            </Grid>
          </Grid>
      </Container>
    )
}

export default Auth
