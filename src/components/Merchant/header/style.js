import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
    container:{
      '&.MuiGrid-root':{
        display:'flex',
        justifyContent:'space-between',
        alignItems:'center'
      }
    },
    logo:{
      '&.MuiAvatar-root':{
        width:'50px',
        height:'auto'
      }
    },
    headertxt:{
     '&.MuiTypography-root':{
       fontFamily:'poppins',
       paddingInlineStart:'10px' 
     }
    },
    subTitle:{
    '&.MuiTypography-root':{
      fontFamily:'poppins',
      paddingInlineStart:'15px',
      cursor:'pointer' 
     }   
    }
}));

export default useStyle;