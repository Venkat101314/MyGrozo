import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme)=>({

    partnerListContainer:{
        '&.MuiGrid-root':{
            maxHeight:'20vh',
            scrollBehaviour:'smooth',
            overflowY :'scroll'
        }
    }

}));

export default useStyle;