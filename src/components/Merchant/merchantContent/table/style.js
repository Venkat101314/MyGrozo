import { makeStyles } from "@mui/styles";

const useStyle = makeStyles((theme) => ({
  selectBox:{
    '&.MuiTableCell-root':{
      fontFamily:'poppins',
       paddingBlock:'10px',
       width:"fit-content"
    }
  },
    tblHead:{
      '&.MuiTableHead-root':{
         fontFamily:'poppins',
         backgroundColor:'lightgrey',
         borderRadius:'6px',

      }
    },
    tblheadercell:{
      '&.MuiTableCell-root':{
        fontFamily:'poppins',
         paddingBlock:'10px'
      }
      
    },
    tblfootercell:{
      '&.MuiTableCell-root':{
        fontFamily:'poppins',
         paddingBlock:'10px',
         fontWeight:'bolder',
         fontSize:'14px'
      }
    },
    accordionRoot:{
      '&.MuiAccordion-root ':{
        width: 'fit-content',
        padding: '0px 0px',
        backgroundColor:'none',
      },
      '&.MuiPaper-root':{
        backgroundColor:'none',
        padding: '0px 0px',
      }
    },
    accordionSummary:{
      '&.MuiAccordionSummary-root':{
        padding: '0px 0px',
        margin:'0px , 0px'
      },
      '&.MuiPaper-root':{
        backgroundColor:'none',
        padding: '0px 0px',
      }
    },
    accordionTxt:{
      '&.MuiTypography-root':{
        fontSize:'12px',
        alignItems:'center',
      }
    },
    accordionDetails:{
      '&.MuiAccordionDetails-root':{

        padding: '0px 0px',
      },
    
    },
    expandIcon:{
      '&.MuiIcon-root':{
        marginTop: 2,
        
      }
     }
}))

export default useStyle