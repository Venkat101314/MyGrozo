import {
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React, { useEffect } from "react";
import { useState } from "react";
import useStyle from "./style";

const MerchantTable = ({ orderId, updatedOrder }) => {
  const classes = useStyle();
  const [showAddon, setShowAddon] = useState(false);
  const token = localStorage.getItem("admin");
  const [orderItems, setOrderItems] = useState([]);
  const order_id = orderId;
  const [orderAmt, setOrderAmt] = useState({ orderTotal: "", payableAmt: "" });
  const [isCheckedAll, setIsCheckedAll] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [itemId, setItemId] = useState([]);

  useEffect(() => {
    getOrderDetails();
  }, [order_id]);

  const rupee = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
  });
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

  const handleProductId = (e) => {
    setItemId(itemId[e.target.checked] ? false : true);
    const checkedCbs = document.querySelectorAll(
      '#itemCheck input[type="checkbox"]:checked'
    );
    var checkedIds = [];
    for (var i = 0; i < checkedCbs.length; i++)
      checkedIds.push(checkedCbs[i].value);

    console.log("Selected Id:" + checkedIds);
    updatedOrder(checkedIds);
  };
  const selectAll = (e) => {
    isCheckedAll ? setIsCheckedAll(false) : setIsCheckedAll(true);
  };
const [buttonName, setButtonName]= useState('Acknowledged')
  return (
    <Grid container>
      <Grid item xs={12} style={{ marginInline: "10px" }}>
        <TableContainer>
          <Table>
            {/*             
          <div style={{width:'100%',height:'50vh', overflowY:'scroll'}}> */}
            <TableHead className={classes.tblHead}>
              <TableRow style={{ borderRaduis: "10px" }}>
                <TableCell className={classes.tblheadercell}>
                  <input
                    type='checkbox'
                    name='selectAll'
                    id='selectAll'
                    onChange={(e) => selectAll(e)}
                    checked={isCheckedAll}
                  />
                  Items
                </TableCell>
                <TableCell className={classes.tblheadercell}>Qty</TableCell>
                <TableCell className={classes.tblheadercell} align='right'>
                  Price
                </TableCell>
                <TableCell className={classes.tblheadercell} align='right'>
                  Amount
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody >
              {order_id
                ? Object.values(orderItems).map((val, idx) => (
                    <TableRow
                      key={idx}
                      id='itemCheck'
                      style={{ height: "40px" }}
                    >
                      <TableCell>
                        <input
                          type='checkbox'
                          id={val.master_product_id}
                          value={val.master_product_id}
                          checked={itemId[idx]}
                          onChange={(e) =>
                            // setItemId(itemId[e.target.checked] ? false : true)
                            handleProductId(e)
                          }
                        />
                        &nbsp;
                        {val.product_name} ({val.variations})<br></br>
                        <Typography className={classes.accordionTxt}>
                          Addons
                        </Typography>
                          {/* {val.addons.map((step, i) => {
                            return <div key={i}>{step.addon_name}</div>;
                          })} */}
                      </TableCell>
                      <TableCell>
                        {val.quantity}

                        {/* <Grid container direction='column'>
                          {val.addons.map((step, i) => {
                            return <div key={i}>{step.addon_quantity}</div>;
                          })}
                        </Grid> */}
                      </TableCell>
                      <TableCell align='right'>
                        {parseFloat(val.price).toFixed(2)}

                          <Typography></Typography>
                          {/* {val.addons.map((step, i) => {
                            return (
                              <div key={i}>
                                {parseFloat(step.addon_price).toFixed(2)}
                              </div>
                            );
                          })} */}
                      </TableCell>
                      <TableCell align='right'>
                        {parseFloat(val.price).toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))
                : null}
            
            </TableBody>
            {/* </div> */}
            <TableFooter>
              <TableRow style={{ borderRaduis: "10px" }}>
                <TableCell
                  className={classes.tblfootercell}
                  colSpan={1}
                ></TableCell>
                <TableCell className={classes.tblfootercell}>
                  Sub Total
                </TableCell>
                <TableCell className={classes.tblfootercell}></TableCell>
                <TableCell className={classes.tblfootercell} align='right'>
                  {orderId ? parseFloat(orderAmt.orderTotal).toFixed(2) : null}
                </TableCell>
              </TableRow>

              <TableRow style={{ borderRaduis: "10px" }}>
                <TableCell
                  className={classes.tblfootercell}
                  colSpan={1}
                ></TableCell>
                <TableCell className={classes.tblfootercell}>
                  Net Total
                </TableCell>
                <TableCell className={classes.tblfootercell}></TableCell>
                <TableCell className={classes.tblfootercell} align='right'>
                  {orderId ? parseFloat(orderAmt.payableAmt).toFixed(2) : null}
                </TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default MerchantTable;
