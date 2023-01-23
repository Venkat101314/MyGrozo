import { makeStyles } from "@mui/styles"

const useStyle = makeStyles((theme) => ({
    root:{
      display:'flex',
      justifyContent:"center",    
      backgroundImage:'linear-gradient(0.44deg, #c5d5ff, #e2f0ff 51.56%, #0072e5)',
      height:'100vh',
    },
    main:{
    '&.MuiGrid-root':{
       width:'360px',
       height:'320px',
       margin:"30px",
       boxShadow:'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)',
       borderRadius:"12px",
       backgroundColor:'#ffff',
       marginBlockStart:'10%'
     }
    }
}))

export default useStyle