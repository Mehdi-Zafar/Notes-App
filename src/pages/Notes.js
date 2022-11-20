import React, { useEffect, useState } from 'react'
import Typography from "@mui/material/typography"
import { makeStyles } from '@mui/styles'
import Grid from '@mui/material/Grid'
import NoteCard from "../components/NoteCard"
import {useHistory} from 'react-router-dom'
import Masonry from 'react-masonry-css'

const useStyles = makeStyles({
  mg:{
    '&&':{
      margin:15
    }
  },
  btn:{
    justifyContent:"center"
  },
})


export default function Notes() {

  const [notes,setNotes] = useState([])
  const classes = useStyles()
  const history = useHistory()
  

  useEffect(()=>{
    fetch('http://localhost:8000/notes')
      .then(res=>res.json())
      .then(data=>setNotes(data))
  },[])

  const handleDelete = async(id)=>{
    await fetch('http://localhost:8000/notes/'+id,{
      method:"DELETE"
    }) 
    const newNotes = notes.filter(note=>note.id != id)
    setNotes(newNotes)       
  }

  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <div className={classes.mg}>
       <Typography 
      className={classes.mg}
      variant="h4"
      color="secondary"
      align="center"
      >
        Notes page
      </Typography>
      <Masonry
      breakpointCols={breakpoints}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column">
          {notes && notes.map((note)=>(
          <div item key={note.id} xs={12} sm={6} md={4} >
            <NoteCard
            note={note}
            handleDelete={handleDelete}
            />
          </div>
        ))}
      </Masonry>
    </div>
  )
}

