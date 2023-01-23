import { Avatar, Box, Grid, InputBase, Typography } from "@mui/material";
import React, { useEffect, useLayoutEffect, useState } from "react";
import Logo from "../../../../assets/bigbasket.png";
import useStyle from "./style";
import SearchIcon from "@mui/icons-material/Search";
import * as _ from "lodash";
import moment from "moment";
import axios from "axios";

const LeftContent = ({ orderData, onUpdateOrder }) => {
  const classes = useStyle();
  const orderTime = orderData.map((i) => i.delivery_datetime);
  const [searchItems, setSearchItems] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const active = { backgroundColor: "#FCFFE7" };
  // const searchOrderList = orderData?.filter((item)=>{
  //   if(item.order_id===""){
  //     return item;
  //   }
  //   else if(item.order_id===searchItems){
  //     return item;
  //   }
  // });
  const filterDaata = (e) => {
    setSearchItems(e.target.value);
  };

  const onUpdate = (e) => {
    onUpdateOrder(e);
    setSelectedOrder(e.order_id);
  };
  return (
    <Grid container>
      <Grid
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBlockEnd: 5,
        }}
      >
        <Avatar src={Logo} />
        <div className={classes.search}>
          <div className={classes.srhwrapper}>
            <SearchIcon />
          </div>
          <InputBase
            placeholder='Search…'
            inputProps={{ "aria-label": "search" }}
            className={classes.searchbar}
            onChange={(e) => filterDaata(e)}
          />
        </div>
      </Grid>
      {orderData
        .filter(
          (value) => value.state !== "Delivered" && value.state !== "Dispatched"
        )
        .map((val, idx) => (
          <Grid container justifyContent='space-between'   className={classes.orderList}
          key={idx}
          id={val.order_id}
          onClick={() => onUpdate(val)}            
         style={selectedOrder==val.order_id? active: null}
        >
            <Grid item xs={7} wrap="nowrap">
              <Grid  zeroMinWidth>
                <Typography sx={{ fontSize: "14px", fontWeight: "bold",overflowWrap: 'break-word' }}>
                  {val.order_id}
                </Typography>
              </Grid>

              <Grid>
              <Typography className={classes.ordersubHeadertxt}>
                {val.state}
              </Typography>
              </Grid>
            </Grid>
            <Grid item xs={4}>
            <Typography sx={{ fontSize: "11px" }}>
                    {moment(orderTime[idx]).format("DD/MM/YYYY LT")}
                  </Typography>
            </Grid>
          </Grid>
        ))}
    </Grid>
  );
};

export default LeftContent;
