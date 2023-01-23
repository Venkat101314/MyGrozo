import { TextField } from '@mui/material'
import React, { memo } from 'react'

const Email = ({formik}) => {
  return (
    <TextField 
      fullWidth 
      name='email' 
      id="email" 
      label="Email"
      size="small"
      value={formik.values.email}
      onChange={formik.handleChange}
      error={formik.touched.email && formik.errors.email}
      helperText={formik.touched.email && formik.errors.email}
      />
  )
}

export default memo(Email)