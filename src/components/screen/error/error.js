import { Avatar, Box, Button, Grid, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import Wrong from '../../../assets/warning.png'
import useStyle from './style'

const RouteError = () => {
  const classes = useStyle()
  const navigate = useNavigate()
  const onRetry = () => {
    const token = localStorage.getItem("admin")
    const secondtoken = localStorage.getItem("superAdmin")
    if(token){
     navigate("/home")
    }
    else if(secondtoken){
     navigate("/admin")
    }   
  } 

  return (
    <div className={classes.root}>
      <Grid style={{textAlign:'center'}} >
        <Avatar src={Wrong} variant ="square" className={classes.errLogo}/>
        <Box>
         <Typography variant='h6' style={{fontFamily:"poppins"}}>Something Went Wrong</  Typography>        
        </Box>
        <Button className={classes.errbtn} onClick={onRetry}>
          Retry
        </Button>       
      </Grid>
    </div>
  )
}

export default RouteError