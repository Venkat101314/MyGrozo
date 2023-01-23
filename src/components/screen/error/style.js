import { makeStyles } from "@mui/styles"

const useStyle  = makeStyles((theme) => ({
    root:{
    display:'flex',
      justifyContent:'center',
      alignItem:'center',
      textAlign:'center',
      paddingBlockStart:'18%',
    },
    errLogo:{
      '&.MuiAvatar-root':{
         width:'100px',
         height:'90px',
         margin:'auto'
      }
    },
    errbtn:{
      '&.MuiButton-root':{
        borderRadius:'25px',
        paddingBlock:'3px',
        paddingInline:'15px',
        backgroundColor:'black',
        color:'#ffff',
        fontFamily:'poppins',
        '&:hover':{
            backgroundColor:'black', 
            
        }
      }        
    }
}))

export default useStyle