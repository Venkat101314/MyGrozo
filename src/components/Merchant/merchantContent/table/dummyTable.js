import {
  Box,
  Grid,
  Button,
  Table,
  TableCell,
  TableFooter,
  Typography,
} from "@mui/material";
import React from "react";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";

const DummyTable = ({ orderInfo, getOrderListdata }) => {
  const token = localStorage.getItem("admin");
  const [orderItems, setOrderItems] = useState([]);
  const [orderAmt, setOrderAmt] = useState({ orderTotal: "", payableAmt: "" });
  const order_id = orderInfo.id;
  const [checkedValue, setIsCheckedValue] = useState([]);
  const [btnName, setBtnName] = useState();

  const ordSts = "" + orderInfo.state;
  console.log(ordSts);
  const addons = Object.values(orderItems).map((val, idx) => val.addons);


  useEffect(() => {
    checkOrderState(ordSts);
  }, [ordSts]);

  useEffect(()=>{updateOrderStatus()},[])

  const getSelectedRow = (ids) => {
    const selectedRowsData = ids.map((id) => rows.find((row) => row.id === id));
    console.log(selectedRowsData.map((i) => i.product_id));
    setIsCheckedValue(selectedRowsData.map((i) => i.product_id));
  };

  const checkOrderState = (orderState) => {
    if (orderState === "Acknowledged") {
      setBtnName("Food Ready");
    } else if (orderState === "Food Ready") {
      setBtnName("Dispatched");
    } else if (orderState === "Dispatched") {
      setBtnName("Delivered");
    } else {
      setBtnName("Acknowledged");
    }
  };
  const handleClick = (e) => {
    
      if(btnName === "Acknowledged" && checkedValue.length === 0){
         alert("Field cant empty")} else { updateOrderStatus(); setBtnName('Food Ready') }
   if(btnName==='Food Ready' ){
    updateOrderStatus()
    setBtnName('Dispatched')
   }
   else if(btnName==='Dispatched')
   {
    updateOrderStatus()
    setBtnName('Delivered')
   }
   else if(btnName==='Delivered')
   {
    updateOrderStatus()
    alert('Delivered Successfully!')
   }
  };

  const updateOrderStatus = () => {
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}orders`,
        {
          order_id: orderInfo.order_id,
          new_status: btnName,
          selected_ids: checkedValue,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data.response);
        getOrderListdata();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      field: "item",
      headerName: "Item",
      width: 70,
      sortable: false,
      flex: 1,
      align: "left",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Grid>
            <Grid container>
              {params.row.item + "(" + params.row.variations + ")"}
            </Grid>
            <Grid container>
              <Grid item xs>
                {params.row.item}
              </Grid>
            </Grid>
          </Grid>
        );
      },
    },
    {
      field: "qty",
      headerName: "Quantity",
      width: 130,
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Grid>
            <Grid>{params.row.qty}</Grid>
            <Grid>{params.row.qty}</Grid>
            <Grid>{params.row.qty}</Grid>
          </Grid>
        );
      },
    },
    {
      field: "price",
      headerName: "Price",
      width: 130,
      sortable: false,
      flex: 1,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => {
        return (
          <Grid>
            <Grid>{params.row.price}</Grid>
            <Grid>{params.row.price}</Grid>
            <Grid>{params.row.price}</Grid>
          </Grid>
        );
      },
    },

    {
      field: "amount",
      headerName: "Amount",
      description: "This column has a value getter and is not sortable.",
      sortable: false,
      width: 160,
      flex: 1,
      align: "center",
      sortable: false,
      headerAlign: "center",
      valueGetter: (params) => `${params.row.qty * params.row.price}`,
    },
  ];

  const rows = Object.values(orderItems).map((val, idx) => ({
    id: idx,
    item: val.product_name,
    qty: val.quantity,
    price: val.price,
    product_id: val.master_product_id,
    variations: val.variations,
    // addons: val.addons
  }));

  const getOrderDetails = () => {
    axios
      .post(
        `${process.env.REACT_APP_BASE_URL}orderdetails`,
        {
          order_id: order_id,
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
        setOrderItems(res.data.response);
        setOrderAmt((prev) => ({
          ...prev,
          orderTotal: res.data.order_total,
          payableAmt: res.data.payable_amount,
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getOrderDetails();
  }, [order_id]);

  return (
    <div>
      <div style={{ height: 250, width: "100%" }}>
        <DataGrid
          rows={order_id ? rows : ""}
          getRowHeight={() => "auto"}
          getRowId={(rows) => rows.id}
          columns={columns}
          checkboxSelection
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          hideFooter
          hideFooterPagination
          hideFooterSelectedRowCount
          disableSelectionOnClick
          onSelectionModelChange={(ids) => getSelectedRow(ids)}
        />
      </div>
      <Box
        sx={{
          height: "25vh",
          width: "98%",
          margin: "auto",
        }}
      >
        <Grid container justifyContent='space-around' sx={{ height: "16vh" }}>
          <Grid item xs={5}></Grid>
          <Grid item xs={2} textAlign='left'>
            Sub Total
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2} textAlign='right'>
            {orderAmt.orderTotal}
          </Grid>
          <Grid item xs></Grid>

          <Grid item xs={5}></Grid>
          <Grid item xs={2} textAlign='left'>
            Delivery charges
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2} textAlign='right'>
            50
          </Grid>
          <Grid item xs></Grid>
          <Grid item xs={5}></Grid>
          <Grid item xs={2} textAlign='left'>
            Net Total
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={2} textAlign='right'>
            {`${orderAmt.orderTotal + 50}`}
          </Grid>
          <Grid item xs></Grid>
        </Grid>
        <Grid container justifyContent='end'>
          <Button variant='contained' sx={{ marginInline: 1 }}>
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={(e) => handleClick(e)}
            id={btnName}
            sx={{ marginInline: 1 }}
          >
            {btnName}
          </Button>
        </Grid>
      </Box>
    </div>
  );
};

export default DummyTable;
