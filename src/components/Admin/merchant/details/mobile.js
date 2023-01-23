import { TextField } from '@mui/material'
import React, { memo } from 'react'

const Mobile = ({formik}) => {
  return (
    <TextField 
      fullWidth 
      name='mobile' 
      id="mobile" 
      label="Mobile No."
      inputProps={{maxLength: 10 }}
      value={formik.values.mobile}
                    onChange={formik?.handleChange}
                    error={
                      formik.touched.mobile && Boolean(formik.errors.mobile)
                    }
                    helperText={
                      formik.touched.mobile && formik.errors.mobile
                    }
      size="small"
      />
  )
}

export default memo(Mobile)