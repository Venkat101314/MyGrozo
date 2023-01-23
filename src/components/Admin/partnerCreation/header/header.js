import { AppBar, Avatar, Grid, IconButton, Menu, MenuItem, Toolbar, Typography } from '@mui/material'
import React from 'react'
import useStyle from './style'
import Logo from '../../../../assets/logo.png'
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { useNavigate, Link } from 'react-router-dom';

const PartnerHeader = () => {
 const classes = useStyle()  
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl)

  const oncallLgt  = (event) => {
     setAnchorEl(event.currentTarget)
  } 
  const handleClose = () => {
    setAnchorEl(null);
  }

  const OnLogout  = () => {
    localStorage.removeItem("superAdmin")
    const secondtoken = localStorage.getItem("superAdmin")
    if(!secondtoken){
        navigate("/")
    }
 } 

  return (
    <div>
      <AppBar position='relative'>
        <Toolbar disableGutters style={{paddingInline:'10px'}}>
          <Grid container className={classes.container}>
            <Grid style={{display:'flex',alignItems:'center'}}>
              <Avatar src={Logo} variant="square" className={classes.logo}/>
              <Typography variant='h6' className={classes.headertxt}>Pazhamudhir Nilayam</Typography>
            </Grid>

            <Grid style={{display:'flex',alignItems:'center'}}>
             <Typography className={classes.subTitle}><Link to='/admin' style={{textDecoration:'none', color:'white'}}>Partner Creation</Link></Typography>
             <Typography className={classes.subTitle}><Link to='/merchant' style={{textDecoration:'none',color:'white'}}>Merchant Creation</Link></Typography>
             <IconButton onClick={oncallLgt}>
               <AccountCircleRoundedIcon style={{color:'#ffff',fontSize:'40px'}}/>
             </IconButton>
             <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                 'aria-labelledby': 'basic-button',
               }}
             >        
             <MenuItem onClick={OnLogout}>Logout</MenuItem>
          </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>  
    </div>
  )
}

export default PartnerHeader