import { Typography, Grid, Checkbox } from "@mui/material";
import React, { memo } from "react";
import { useState } from "react";
import useStyle from "./style";

const PartnerList = ({ partnerListCheck, partnerData, partnerId }) => {
const classes = useStyle();
  return (
    
    <Grid container className={classes.partnerListContainer} spacing={2} id="partnerInfo">
      {partnerData.map((val, idx) => {
        return (
          <Grid item xs={3}style={{display:'flex'}} alignItems='center' key={idx}>
            <input 
            type='checkbox' 
            id={val.id} 
            name="partnerList" 
            value={val.id}
          checked={partnerId[idx]}
          onChange={partnerListCheck}
             />
            &nbsp;
            <Typography for={idx}>{val.name}</Typography>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default memo(PartnerList);
