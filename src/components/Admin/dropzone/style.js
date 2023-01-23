import { makeStyles } from "@mui/styles"

const useStyle = makeStyles((theme) => ({
    root:{
        '&.MuiGrid-root':{
            display:'flex',           
        }
    },
    dropzone:{        
        '&.MuiGrid-root':{            
            cursor:'pointer'
         }   
    },
    uploadbtn:{
        "&.MuiButton-root": {
            borderRadius: "22px",         
            paddingBlock: "4px",
            paddingInline:'15px',
            color:'#ffff',
            fontSize:'12px',
            fontFamily:"poppins",
            backgroundColor:'#1976d2',
            marginInlineEnd:'6px',
            '&:hover':{
              backgroundColor:'#1976d2',
            }
          },            
    },
    hinttxt:{
        "&.MuiTypography-root": {
            fontSize: "14px",
            color: "gray",
            fontFamily: "poppins",
            paddingBlockStart:'10px'
          },
    },
    cancelbtn: {
        "&.MuiButton-root": {
          borderRadius: "22px",         
          paddingBlock: "4px",
          paddingInline:'15px',
          color:'black',
          fontSize:'12px',
          fontFamily:"poppins",
          backgroundColor:'#f1f1f1'
        }
      },
      preview:{        
        border:'1px dashed lightgrey',
        borderRadius:'12px',
        marginInlineEnd:'15px',
        width:'105px',
        height:'105px' ,
        padding:'1.4px',    
    } ,
    innerlisttxt:{
        '&.MuiTypography-root':{
          color:'white'
        }
    },
    
}))
export default useStyle