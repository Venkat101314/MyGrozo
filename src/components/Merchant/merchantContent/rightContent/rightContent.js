import { Accordion, AccordionDetails, AccordionSummary, Avatar, Grid, Typography } from '@mui/material'
import React from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import useStyle from './style'

const RightContent = () => {
 const classes = useStyle()
  return (
    <Grid container> 
      <Grid style={{margin:'5px'}}>
      <Accordion className={classes.grobux}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon className={classes.expandIcon} />}
        >
          <Avatar src={'https://www.mygrozo.com/uploads/xlogo.png.pagespeed.ic.cOKuDm6vc7.webp'}  variant="square" className={classes.rightLogo}/>
        </AccordionSummary>
        <AccordionDetails>
       
            <Grid container rowSpacing={1} alignItems='center'>
              <Grid item xs={12} className={classes.accRows}>
                <Typography className={classes.rightHeadertxt}>New Order</Typography>
                <Typography className={classes.rightSubHeadertxt}>20</Typography>
              </Grid>  

              <Grid item xs={12} className={classes.accRows}>
                <Typography className={classes.rightHeadertxt}>Process Order</Typography>
                <Typography className={classes.rightSubHeadertxt}>3</Typography>
              </Grid>             

              <Grid item xs={12} className={classes.accRows}>
                <Typography className={classes.rightHeadertxt}>Dispatched</Typography>
                <Typography className={classes.rightSubHeadertxt}>13</Typography>
              </Grid>

              <Grid item xs={12} className={classes.accRows}>
                <Typography className={classes.rightHeadertxt}>Incomplete</Typography>
                <Typography className={classes.rightSubHeadertxt}>3</Typography>
              </Grid>
          

              <Grid item xs={12} className={classes.accRows}>
                <Typography className={classes.rightHeadertxt}>Cancelled Order</Typography>
                <Typography className={classes.rightSubHeadertxt}>2</Typography>
              </Grid>
              
            </Grid>
        </AccordionDetails>
      </Accordion>
      </Grid>
    </Grid>
  )
}

export default RightContent