import { TextField } from '@mui/material'
import React, { memo } from 'react'

const UserName = ({formik}) => {
  return (
    <TextField 
      fullWidth 
      name='username' 
      id="username" 
      label="UserName"
      value={formik.values.username}
                    onChange={formik?.handleChange}
                    error={
                      formik.touched.username && Boolean(formik.errors.username)
                    }
                    helperText={
                      formik.touched.username && formik.errors.username
                    }
      size="small"
      />
  )
}

export default memo(UserName)