import { TextField } from '@mui/material'
import React, { memo } from 'react'

const MerchantKey = ({formik}) => {
  return (
    <TextField 
      fullWidth 
      name='merchant_key' 
      id="merchant_key" 
      label="Merchant Key"
      value={formik.values.merchant_key}
                    onChange={formik?.handleChange}
                    error={
                      formik.touched.merchant_key && Boolean(formik.errors.merchant_key)
                    }
                    helperText={
                      formik.touched.merchant_key && formik.errors.merchant_key
                    }
      size="small"
      />
  )
}

export default memo(MerchantKey)