import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  gridBoxMain: {
    "&.MuiGrid-root": {
      display: "flex",
      backgroundColor: "lightgreen",
      paddingBlock: "10px",
      marginBlockStart:'6px',
      borderTopRightRadius:'6px',
      borderTopLeftRadius:'6px'
    },
  },
  orderStatus:{
    '&.MuiTypography-root':{
        fontSize:'12px',
        fontFamily:'poppins',
    }
  },
  selectBox:{
'&.MuiSelect-select':{
    border:'none',
    fontFamily:'poppins',
}
}
}));
export default useStyle;