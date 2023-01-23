import { TextField } from '@mui/material'
import React, { memo } from 'react'

const Address = ({formik}) => {
  return (
    <TextField 
      fullWidth 
      name='address' 
      id="address" 
      label="Address"
      value={formik.values.address}
                    onChange={formik?.handleChange}
                    error={
                      formik.touched.address && Boolean(formik.errors.address)
                    }
                    helperText={
                      formik.touched.address && formik.errors.address
                    }
      size="small"
      />
  )
}

export default memo(Address)