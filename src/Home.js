import React from 'react'
import Posts from "./component/Posts"
import {Container, Paper, TextField, Button} from "@material-ui/core"
import { Pagination, PaginationItem } from '@mui/material'
import ChipInput from 'material-ui-chip-input'
import { useDispatch, useSelector } from 'react-redux'
import Form from './component/Form/Form'
import { Link, useNavigate } from 'react-router-dom'
import { getDataBySearch, getPosts } from './action/posts'
import "./style.css"

function Home({change,setChange}) {
    const dispatch = useDispatch()
    const select = useSelector((state) => state.posts)
    const [userId, setUserId] = React.useState(null)
    // const [change, setChange] = React.useState(false)
    const userExit = JSON.parse(localStorage.getItem("profile"))
    const [search, setSearch] = React.useState("")
    const [tags, setTags] = React.useState([])
    const [page, setPage] = React.useState(JSON.parse(localStorage.getItem("num")) || 1)
    const navigate = useNavigate()
    const total = useSelector((state) => state.total)

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        localStorage.setItem("num", JSON.stringify(value))
        setPage(value)
        dispatch(getPosts(value))
      };

    const handleAdd = (tag) => {
        setTags([...tags, tag])
       }
  
       const handleDelete = (tag) => {
           setTags(pres => pres.filter(item => item !== tag))
       }
  
       const handleSearch = () => {
         try {
            dispatch(getDataBySearch(search, tags.join(",")))
         } catch (error) {
             console.log(error)
         }
       }
  
       React.useEffect(() => {
        navigate(`?page=${page}`)
    }, [page])


    return (
    <div style={{display: "flex", justifyContent: "space-between", marginTop: "20px"}} id="mom">
        <Posts userId={userId} setUserId={setUserId}/>
        <div>
        <Paper elevation={3} id="pagination2">
          <TextField style={{margin: "5px 0px"}} onChange={(e) => setSearch(e.target.value)} value={search} fullWidth name='searchMemories' id="outlined-basic" label="Search Memories" variant="outlined" />
          <ChipInput style={{margin: "5px 0px"}} variant='outlined' name="tags" label="Search Tags" fullWidth="true" size='medium' 
           onAdd={handleAdd}
           onDelete={handleDelete}
           value={tags}
          />
          <Button style={{margin: "5px 0px"}} onClick={handleSearch} fullWidth id="button" component={Link} to={`/posts/search?searchQuery=${search}&tag=${tags.join(",")}`}>SEARCH</Button>
        </Paper>
         <Form userId={userId} setUserId={setUserId} setChange={setChange} />
         <Paper elevation={3} id="pagination" justifyContent="center">
             <Pagination  count={total} variant="outlined" page={page}  size="medium"  onChange={handleChange} id="centerDiv"
              renderItem={(item) => (
                  <PaginationItem {...item}/>
              )}
             />
         </Paper>
        </div>
    </div>
    )
}

export default Home
