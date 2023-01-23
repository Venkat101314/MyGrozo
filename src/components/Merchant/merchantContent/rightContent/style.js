import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) =>({
    accRows:{
      '&.MuiGrid-root':{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
      }
    },
    rightLogo:{
        '&.MuiAvatar-root':{
            width:'50px',
            height:"auto"
        }
    },
    rightHeadertxt:{
      '&.MuiTypography-root':{
        fontFamily:'poppins',
        fontSize:'16px'
      }
    },
    rightSubHeadertxt:{
        '&.MuiTypography-root':{
          fontFamily:'poppins',
          fontSize:'15px'
        }
      }
}))

export default useStyle