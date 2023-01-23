import {
  FormControl,
  Grid,
  IconButton,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PrintIcon from "@mui/icons-material/Print";
import useStyle from "./style";
import moment from "moment";
import axios from "axios";
const AlertMsg = ({ orderInfo, productId,getOrderListdata }) => {
  const classes = useStyle();
  const ordSts = "" + orderInfo.state;
  const token = localStorage.getItem("admin");
  const [orderStatus, setOrderStatus] = useState("");

  useEffect(() => {
    checkStatus(ordSts);
   
  }, [ordSts]);

  useEffect(() => {
    ordSts ? setOrderStatus(ordSts) : setOrderStatus("");
  }, [ordSts]);

//  useEffect(()=>{updateOrderStatus()},[])

  console.log(productId);

  // const updateOrderStatus = () => {
  //   axios
  //     .put(
  //       `${process.env.REACT_APP_BASE_URL}orders`,
  //       {
  //         order_id: orderInfo.order_id,
  //         new_status: orderStatus,
  //         selected_ids: productId,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json",
  //         },
  //       }
  //     )
  //     .then((res) => {
  //       console.log(res.data.response);
  //       getOrderListdata();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  const handleChange = (event) => {
    console.log(event.target.value);
    setOrderStatus(event.target.value);
  };

  const checkStatus = (status) => {
    const alertBox = document.getElementById("alert_box");
    const orderMsg = document.getElementById("order-msg");
    if (status === "Cancel") {
      alertBox.style.backgroundColor = "#EC4637";
      orderMsg.innerHTML = "Order cancelled";
    } else if (status === "Placed") {
      alertBox.style.backgroundColor = "#9CE37D";
      orderMsg.innerHTML = "Order Placed Successfully";
    } else if (status === "Acknowledged") {
      alertBox.style.backgroundColor = "#F2DB83";
      alertBox.style.color = "black";
      orderMsg.innerHTML = "Order Acknowledged!";
    } else if (status === "Delivered") {
      alertBox.style.backgroundColor = "#B5DDA4";
      orderMsg.innerHTML = "Order Delivered Successfully";
    } else if (status === "Food Ready") {
      alertBox.style.backgroundColor = "yellow";
      orderMsg.innerHTML = "Your order is ready to deliver...";
    } else if (status === "Dispatched") {
      alertBox.style.backgroundColor = "lightgreen";
      orderMsg.innerHTML = "Order Dispatched";
    }
  };

    return (
     <div>
       <Grid container id="alert_box" className={classes.gridBoxMain}alignItems='start' justifyContent='space-between' sx={{padding:4}}>
      <Grid item xs={2}>
        <Typography>Order Id</Typography>
        <Typography>Name </Typography>
        <Typography>Phone No.</Typography>
        <Typography>Order Time</Typography>
      </Grid>
      <Grid item xs={5}>
        <Typography>: &nbsp;{orderInfo.order_id}</Typography>
        <Typography>: &nbsp;{orderInfo.customer_name} </Typography>
        <Typography>: &nbsp;{orderInfo.customer_phone_no}</Typography>
        <Typography>: &nbsp;{moment(orderInfo.delivery_datetime).format("DD/MM/YYYY LT")}</Typography>
      </Grid>
      <Grid item xs={3} sx={{marginTop:3}}>
      <Typography id="order-msg" variant="h7"></Typography>
      </Grid>
      <IconButton>
        <PrintIcon/>
      </IconButton>
      </Grid>
     </div>
  );
};

export default AlertMsg;
