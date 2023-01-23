import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme)=>({
    root:{
        '&.MuiGrid-root':{
          width:'95%',
          padding:'5px',
          paddingInline:'10px',
          margin:'auto',        
        }
      },
      statusBadge:{
        '&.MuiBadge-root':{
          marginRight:5,
          marginLeft:'10px',
        }
        },
      headertxt:{
        '&.MuiTypography-root':{
          fontFamily:'poppins',      
          fontSize:'18px',
          fontWeight:'550' 
        }
       },
       addbtn:{
        '&.MuiButton-root':{
           backgroundColor:"#1976d2",
           borderRadius:'25px',
           color:'#ffff',
           paddingInline:'10px',
           fontFamily:"poppins",
           '&:hover':{
              backgroundColor:"#1976d2",
           }
        }
      },
      tablemain:{
       '&.MuiGrid-root':{ 
          height:'80Vh', 
          paddingBlockStart:'10px',
          alignItems:'center',
        }   
      },
      dataGridtbl:{
        textAlign:'center',
        '&.MuiDataGrid-root .MuiDataGrid-cell:focus-within': {
          outline: 'none' ,
          textAlign:'center',
          fontFamily:'poppins'
        }
      }
}));

export default useStyle;