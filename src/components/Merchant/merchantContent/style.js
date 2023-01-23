import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
    root:{
     '&.MuiGrid-root':{  
        width:'100%',
     }
    },
    leftContent:{
     '&.MuiGrid-root':{
        backgroundColor:'#E5E4E2',
        width:'260px',      
        height:'90vh',
        padding:'6px',
        overflowY: 'scroll',        
     }
    },
    Table:{
        '&.MuiGrid-root':{
          width:"calc(100% - 500px)",
         //   backgroundColor:'lightblue',                
        //    height:'90vh'
        }
       },
       rightContent:{
        '&.MuiGrid-root':{ 
           backgroundColor:'#E5E4E2',        
           width:'240px',            
           height:'90vh'
        }
       },
}))

export default useStyle