import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({  
    partnerModal: {    
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width:"640px",
      backgroundColor: '#ffff',     
      boxShadow: 24,   
      borderBottomLeftRadius:'12px',
      borderBottomRightRadius:'12px',
      borderTopLeftRadius:'12px',
      borderTopRightRadius:'12px',
      },
      partnerModalmain: {
        "&.MuiGrid-root": {
          position:'relative',
          // backgroundColor:'orange',
          height:'60vh',
          borderRadius:'12px',         
        },
      },
      modalHeader:{
        '&.MuiGrid-root':{
          position: 'absolute',   
          width:'100%',   
          height:'50px',   
          backgroundColor:'#1976d2',
          color:'#ffff',
          borderTopLeftRadius:'12px',
          borderTopRightRadius:'12px',
          paddingInline:'10px',         
          display:"flex",
          justifyContent:'space-between',
          alignItems:'center'
        }
      },
      modalHeadertxt: {
        "&.MuiTypography-root": {
          fontSize: "16px",
          fontFamily:"poppins",        },
      },
      ModalFooter:{
        '&.MuiGrid-root':{
          position: 'absolute',  
          bottom:'0px', 
          width:'100%',                 
          paddingInline:'10px',
          paddingBlock:'4px',
          display:"flex",
          justifyContent:'right',
          alignItems:'center',
          borderTop:'1px solid lightgrey'
        }
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
      savebtn: {
        "&.MuiButton-root": {
          borderRadius: "22px",         
          paddingBlock: "4px",
          paddingInline:'15px',
          color:'#ffff',
          fontSize:'12px',
          fontFamily:"poppins",
          backgroundColor:'#1976d2',
          marginInlineStart:'6px',
          '&:hover':{
            backgroundColor:'#1976d2',
          }
        },
      },
      modalContent:{
       '&.MuiGrid-root': {
         position:'relative',
         marginBlockStart:'50px',
        //  backgroundColor:'orange',
         padding:'10px',      
         display:'flex',        
       }
      },    
}));

export default useStyle;