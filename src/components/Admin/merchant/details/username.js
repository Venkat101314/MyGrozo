import { TextField } from '@mui/material'
import React, { memo } from 'react'

const UserName = ({formik}) => {
  return (
    <TextField 
      fullWidth 
      name='merchant_name' 
      id="merchant_name" 
      label="UserName"
      value={formik.values.merchant_name}
                    onChange={formik?.handleChange}
                    error={
                      formik.touched.merchant_name && Boolean(formik.errors.merchant_name)
                    }
                    helperText={
                      formik.touched.merchant_name && formik.errors.merchant_name
                    }
      size="small"
      />
  )
}

export default memo(UserName)