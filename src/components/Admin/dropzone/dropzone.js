import { Avatar, Box, Button, Grid, Icon, IconButton, Typography } from '@mui/material'
import React, { memo, useEffect, useMemo, useState } from 'react'
import useStyle from './style'
import { useDropzone } from 'react-dropzone'
import * as yup from 'yup'
import * as _ from 'lodash'
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';

const ImageAudioVideo = ({maxFiles,setDropdata,imgUrl,dropData,setImgurl}) => {
    const classes = useStyle()
    const [isEdit,setIsEdit]=useState(false)
    const [disable,setDisable] = useState(false)
    const MAX_SIZE = 60000000;
      
    const { getRootProps, getInputProps,fileRejections} = useDropzone({
      onDrop:acceptedFiles =>{
        setDropdata(acceptedFiles.map(file => Object.assign(file, {
            preview: URL.createObjectURL(file)
          })))      
      },
      maxFiles:maxFiles,
      accept: {'image/*': []},    
      maxSize:MAX_SIZE
    })
   
    const thumbs = dropData.map(file => (        
        <div key={file.name} className={classes.preview}>     
          <Avatar
            src={file.preview}
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
            variant="square"
            style={{
                width:'100px',
                height:'100px',
                borderRadius:'12px',
                objectFit:'contain',
                margin:'auto'
            }} 
            />   
        </div>
      )) 

     const onRemove  = () => {
        setDropdata([])
        setDisable(false)
        if(isEdit){
          setImgurl()
        }
     } 
     
     useEffect(()=>{
       if(imgUrl){
         setIsEdit(true)
         setDisable(true)
         console.log(imgUrl)
       }
     },[])
   

    useEffect(() => {
      if(dropData?.length >= 1){
        setDisable(true)
        if(!imgUrl){
          setIsEdit(false)
        }
      }    
      else if(isEdit){
        setDisable(true)
      }
    },[fileRejections || dropData]) 
    
    console.log('formik',imgUrl)
    
    return (
      <>
       <Grid container  className={classes.root} >
          {disable ? 
                (isEdit ? 
                  <Avatar
                  src={`http://192.168.0.132:8001/media/${imgUrl}`}
                  variant="square"
                  style={{
                   width:'100px',
                   height:'100px',
                   borderRadius:'12px',
                   objectFit:'contain',
                   margin:'auto'
                  }} />  : thumbs )
             : 
             (isEdit ? 
              <Avatar
              src={`http://192.168.0.132:8001/media/${imgUrl}`}
              variant="square"
              style={{
               width:'100px',
               height:'100px',
               borderRadius:'12px',
               objectFit:'contain',
               margin:'auto'
              }} />  
              : 
              <AccountBoxRoundedIcon style={{fontSize:'120px',color:'lightgrey',marginBlockStart:"-15px",marginInlineStart:'-15px',
               }} fontSize="large" /> 
             )
                      
         }
          <Grid>
           <Box style={{display:'flex'}}>
             <Button className={classes.uploadbtn} {...getRootProps()}>Upload</Button>
             {disable ?<Button className={classes.cancelbtn} onClick={onRemove}>Remove</Button> : null}
             <input {...getInputProps()}/>   
           </Box>
            <Typography className={classes.hinttxt}>
              File types: JPEG, PNG, JPG <br/>Maximum file size : 2MB
            </Typography>
          </Grid> 
       </Grid>
      
      </>      
    )
  }

export default memo(ImageAudioVideo)