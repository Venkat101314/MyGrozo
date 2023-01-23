import { Grid } from '@mui/material'
import React from 'react'
import Header from './header/header'
import MerchantContent from './merchantContent/merchantContent'

const Merchant = () => {
  return (
    <Grid container item xs={12}>
      <Grid item xs={12}><Header/></Grid>
      <Grid item xs={12} ><MerchantContent/></Grid>
    </Grid>
  )
}

export default Merchant