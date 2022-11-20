import React, { useState } from 'react'
import Typography from "@mui/material/typography"
import Button from "@mui/material/button"
import { Container } from '@mui/system'
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded'
import { makeStyles } from '@mui/styles'
import { TextField } from '@mui/material'
import { FormControl,FormLabel,FormControlLabel,RadioGroup,Radio } from '@mui/material'
import {useHistory} from 'react-router-dom'

const useStyles = makeStyles({
  btn: {
    borderRadius:10,
    display:'block',
    '&&':{
      margin:15
    }
  },
  mg:{
    '&&':{
      margin:15
    }
  }
})

export default function Create() {

  const [title,setTitle] = useState("")
  const [titleError,setTitleError] = useState(false)
  const [details,setDetails] = useState("")
  const [detailsError,setDetailsError] = useState(false)
  const [category,setCategory] = useState("");
  const [categoryError,setCategoryError] = useState(false)
  const classes = useStyles()
  const history = useHistory()


  const handleSubmit = (e)=>{
    e.preventDefault()

    if(title == ""){
      setTitleError(true)
    }

    if(details == ""){
      setDetailsError(true)
    }

    if(category == ""){
      setCategoryError(true)
    }

    if(title && details && category){
      fetch("http://localhost:8000/notes",{
      method:"POST",
      headers:{"Content-type":"application/json"},
      body: JSON.stringify({title,details,category})
    })
      .then(()=>history.push('/'))
    }
  }
  return (
    <Container>
      <Typography
      className={classes.mg}
      variant="h4"
      color="secondary"
      align="center"
      >Add New Note</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
        className={classes.btn}
        onChange={(e)=>setTitle(e.target.value)}
        label="Title" 
        variant="outlined"
        color="secondary"
        fullWidth
        autoComplete="off"
        required
        error={titleError}
        />
        <TextField
        className={classes.btn}
        onChange={(e)=>setDetails(e.target.value)}
        label="Description" 
        variant="outlined"
        color="secondary"
        fullWidth
        multiline
        rows={3}
        autoComplete="off"
        required
        error={detailsError}
        />
        <FormControl className={classes.btn} required >
          <FormLabel>Category</FormLabel>
          <RadioGroup value={category} onChange={(e)=>setCategory(e.target.value)}>
            <FormControlLabel value="reminders" control={<Radio/>} label="Reminders"/>
            <FormControlLabel value="todos" control={<Radio/>} label="Todos"/>
            <FormControlLabel value="work" control={<Radio/>} label="Work"/>
            <FormControlLabel value="money" control={<Radio/>} label="Money"/>
          </RadioGroup>
        </FormControl><br/>
        <Button 
        className={classes.btn}
        type="submit"
        variant="contained"
        color="secondary"
        endIcon={<KeyboardArrowRightRoundedIcon/>}
        >
          Submit
        </Button>
      </form>
    </Container>
  )
}