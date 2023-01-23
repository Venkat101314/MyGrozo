import { TextField } from '@mui/material'
import React, { memo } from 'react'

const Password = ({formik,isEdit}) => {
  return (
    <TextField 
      fullWidth 
      name='password' 
      id="password" 
      label="Password"
      type='password'
      size="small"
      value={formik.values.password}
      onChange={formik.handleChange}
      error={isEdit ? null : formik.touched.password && formik.errors.password}
      helperText={isEdit ? null : formik.touched.password && formik.errors.password }
      />
  )
}

export default memo(Password)