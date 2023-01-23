import { Grid } from "@mui/material";
import React from "react";
import { useEffect, useLayoutEffect, useState } from "react";
import LeftContent from "./leftContent/leftContent";
import RightContent from "./rightContent/rightContent";
import useStyle from "./style";
import Table from "./table/dummyTable";
import axios from "axios";
import * as _ from "lodash";
import AlertMsg from "../alert/AlertMsg";

const MerchantContent = () => {
  const classes = useStyle();
  const [partnerId, setPartnerId] = useState({});
  const token = localStorage.getItem("admin");
  const [orderData, setOrderData] = useState([]);
  const [orderInfo, setOrderInfo] = useState([]);
  const [orderId, setOrderId] = useState();
  const [productId, setProductId] = useState("");

  const orderedTime = orderData.map((i) => i.delivery_datetime);

  //  useLayoutEffect(()=>{
  //  const partners = localStorage.getItem("partners")
  //  const updatePartners = JSON.parse(partners)
  //   if(updatePartners?.length <= 1){
  //        _.map(updatePartners,(item) => {
  //            console.log(item)
  //            setPartnerId({...item?.id})
  //        })
  //     }
  //  },[])

  useEffect(() => {
    if (partnerId) {
      getOrderListdata();
    }
  }, []);

  // OrderData
  const getOrderListdata = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}orders`,
        {
          partner_id: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        setOrderData(res.data.response);
        // orderApi
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onUpdateOrder = (e) => {
    setOrderInfo(e);
    getOrderListdata();
  };
  
// selected Product
  const updatedOrder = (e) => {
    console.log(e);
    setProductId(e);
    getOrderListdata();
  };

  return (
    <Grid container className={classes.root}>
      <Grid className={classes.leftContent}>
        <LeftContent orderData={orderData} onUpdateOrder={onUpdateOrder} />
      </Grid>

      <Grid className={classes.Table}>
        <AlertMsg orderInfo={orderInfo} productId={productId} getOrderListdata={getOrderListdata}/>
        <Table  orderInfo={orderInfo} getOrderListdata={getOrderListdata()}  />
      </Grid>

      <Grid className={classes.rightContent}>
        <RightContent />
      </Grid>
    </Grid>
  );
};

export default MerchantContent;
