import { makeStyles } from "@mui/styles";

const useStyle  = makeStyles((theme) => ({
    search:{
        position: 'relative',
         borderRadius:"25px",
         backgroundColor: "#ffff",
         marginLeft: 10,
         width: '100%', 
                 
    },
      srhwrapper:{
         padding:"3px",
         height: '85%',
         position: 'absolute',
         pointerEvents: 'none',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
        //  backgroundColor:'yellow'
      },
      searchbar:{
        color: 'inherit',
        '& .MuiInputBase-input': {
          padding:"10px",
          width: '100%', 
          paddingBlock:'0px',
          paddingBlockStart:'8px',
          paddingInlineStart:'30px',
        //   backgroundColor:"red"        
        }
      },
      orderListOne:{
        display:'flex',
        justifyContent:'space-between',
        alignItems:"center"
      },      
      orderHeadertxt:{
        '&.MuiTypography-root':{
            fontFamily:"poppins",
            fontSize:'14px',
            fontWeight:'550px'
        }
      },
      ordersubHeadertxt:{
        '&.MuiTypography-root':{
            fontFamily:"poppins",
            fontSize:'13px'
        }
      },
      orderList:{
        '&.MuiGrid-root':{
            position:'relative',
            width:'100%',
            padding:'10px',
            borderBottom:"1px solid #848884"
        }
      },
      online:{
        width:'6px',
        height:'6px',
        backgroundColor:'green',
        borderRadius:'20px',
        position:'absolute',
        left:'0px'
      }
}))

export default useStyle