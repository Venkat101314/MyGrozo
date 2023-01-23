import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Button, Grid,
  TextField,
  Typography, Avatar, Box
} from "@mui/material";
import axios from "axios";
import { useFormik } from "formik";
import React, { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import useStyle from "./style";

const LoginScreen = () => {
  const classes  = useStyle()
  const navigate = useNavigate();  

  const onLogin = () => {  
   formik?.handleSubmit()
    axios
      .post(`${process.env.REACT_APP_BASE_URL}login`, {
        email: formik.values.email,
        password: formik.values.password,
      })
      .then((res) => {     
        console.log(res)   
        if(res?.data?.status === 1){
          if(res?.data?.role === "superadmin"){
            toast.success("Login Superadmin Successfully",{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored", 
            })
            localStorage.setItem("superAdmin",res?.data?.token)
            navigate("/admin")
           }
           else if(res?.data?.role === "admin"){
            toast.success("Login Admin Successfully",{
              position: "top-right",
              autoClose: 5000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored", 
            })
            localStorage.setItem("admin",res?.data?.token)
            navigate("/home")
           }
        }
        else {
          toast.error(res?.data?.response,{
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored", 
          })
        }
        console.log(res?.data)
      })
      .catch((err) => {       
        toast.error(err.response.data.response, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
          }) 
      });
  };

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,   
  });

  useLayoutEffect(() => {
   const token = localStorage.getItem("admin")
   const secondtoken = localStorage.getItem("superAdmin")
   if(token){
    navigate("/home")
   }
   else if(secondtoken){
    navigate("/admin")
   }   
  },[])
  return (
        <div 
         className={classes.root}
        >
      
          <Grid container 
           className={classes.main}
          >
           <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5' style={{fontFamily:'poppins'}}>
            Login
          </Typography>
          <Box component='form' noValidate sx={{paddingInline: 2}}>
            <TextField
              sx={{ mb: 1, mt:1 }}
              type='email'
              id='email'
              name='email'
              size='small'
              label='Email'
              fullWidth
              value={formik?.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <TextField
              fullWidth
              sx={{ mt: 1 }}
              type='password'
              id='password'
              name='password'
              size='small'
              label='Password'
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />

            <Button            
              fullWidth
              variant='contained'
              onClick={onLogin}
              sx={{ mt: 3, mb: 2 }}
              style={{fontFamily:'poppins'}}
            >
              Login
            </Button>
          </Box>
        </Box>
      </Grid>
    </div>
  );
};

export default LoginScreen
