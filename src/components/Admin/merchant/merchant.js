import {
  Avatar,
  Badge,
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import React, { memo, useEffect, useLayoutEffect, useState } from "react";
import useStyle from "./style";
import ModeEditRoundedIcon from "@mui/icons-material/ModeEditRounded";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { useFormik } from "formik";
import * as yup from "yup";
import MerchantModal from "./modal/MerchantModal";
import * as _ from "lodash";
import { toast } from "react-toastify";

const PartnerTable = () => {
  const classes = useStyle();
  const [page, setPage] = useState(10);
  const [partnerData, setPartnerData] = useState([]);
  const [merchantData, setMerchantData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dropData, setDropdata] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [checked, setChecked] = useState(false);
  const token = localStorage.getItem("superAdmin");
  const [partnerId, setPartnerId] = useState([]);
  const [dateValue, setDateValue] = useState(null);

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const userEmail = merchantData.map((i) => i.email);
  const userKey = merchantData.map((i) => i.merchant_key);
  const validity_Date = document.querySelector("#valid ");
  const PartnerDetails = partnerData.map((i) => i.id);

  const validation = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required")
      .notOneOf(userEmail, "Email Already Exists!"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    username: yup.string("Enter a name").required("Username is required!"),
    merchant_key: yup
      .string("Enter key")
      .required("Merchant Key is required!")
      .notOneOf(userKey, "Unique Merchant key is required!"),
    mobile: yup
      .string()
      .required("Mobile Number is required")
      .matches(phoneRegExp, "Phone number is not valid")
      .min(10, "too short")
      .max(10, "too long"),
    merchant_name: yup
      .string("Enter a Merchant name")
      .required("Merchant Name is required!"),
    address: yup.string("Enter the address").required("Address is required!"),
  });

  const formik = useFormik({
    initialValues: {
      merchant_name: "",
      email: "",
      password: "",
      username: "",
      merchant_key: "",
      address: "",
      mobile: "",
      id: "",
      valid: "",
      is_active: false,
    },
    validationSchema: validation,
    // onSubmit: onCreatePartner,
  });

  const addMerchant = () => {
    setOpen(true);
    setIsEdit(false);
    formik?.resetForm();
    setChecked(false);
    setPartnerId([false]);
  };

  const onClose = () => {
    setOpen(false);
    setDropdata([]);
  };

  const onUpdate = (e) => {
    setOpen(true);
    setIsEdit(true);
    formik?.setFieldValue("merchant_name", e?.row?.name);
    formik?.setFieldValue("email", e?.row?.email);
    formik?.setFieldValue("id", e?.row?.id);
    formik?.setFieldValue("mobile", e?.row?.mobile);
    formik?.setFieldValue("address", e?.row?.address);
    formik?.setFieldValue("merchant_key", e?.row?.merchant_key);
    formik?.setFieldValue("merchant_name", e?.row?.merchant_name);
    setDateValue(e?.row?.valid);
    formik.setFieldValue("is_active", e.row.is_active ? true : false);
    const mydata = JSON.parse(e.row.partner_id);
    const checkPartnerId = (merchant, partnerDetails) => {
      const result = partnerDetails.map((el) => {
        return merchant.includes(el);
      });
      setPartnerId(result);
      return result;
    };
    checkPartnerId(mydata, PartnerDetails);
  };

  const onUpdateMerchant = () => {
    const checkedCbs = document.querySelectorAll(
      '#partnerInfo input[type="checkbox"]:checked'
    );
    var checkedIds = [];
    for (var i = 0; i < checkedCbs.length; i++)
      checkedIds.push(checkedCbs[i].id);
      
    const userData = {
      user_name: formik.values.merchant_name,
      password: formik.values.password,
      email: formik.values.email,
      merchant_key: formik.values.merchantkey,
      mobile: formik.values.mobile,
      address: formik.values.address,
      valid_upto: validity_Date.value,
      is_active: formik.values.is_active,
      partners: checkedIds,
    };
    // console.log(userData);
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}merchant/${formik?.values?.id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res?.data?.status === 1) {
          toast.success(res?.data?.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          getMerchantData();
          setOpen(false);
        } else {
          toast.error(res?.data?.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.response, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const onDeleteMerchant = (e) => {
    console.log(e);
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}merchant/${e?.row?.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        if (res?.data?.status === 1) {
          toast.success(res?.data?.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          getMerchantData();
          setOpen(false);
        } else {
          toast.error(res?.data?.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onSaveMerchant = () => {
    const checkedCbs = document.querySelectorAll(
      '#partnerInfo input[type="checkbox"]:checked'
    );
    var checkedIds = [];
    for (var i = 0; i < checkedCbs.length; i++)
      checkedIds.push(checkedCbs[i].id);

    formik?.handleSubmit();
    const userData = {
      user_name: formik.values.merchant_name,
      password: formik.values.password,
      email: formik.values.email,
      merchant_key: formik.values.merchant_key,
      mobile: formik.values.mobile,
      address: formik.values.address,
      valid_upto: validity_Date.value,
      is_active: formik.values.is_active,
      partners: checkedIds,
    };
    console.log(userData);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}merchant`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res?.data?.status === 1) {
          toast.success(res?.data?.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
          getMerchantData();
          setOpen(false);
        } else {
          toast.error(res?.data?.response, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.response, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      });
  };

  const partnerListCheck = (e) => {
    setPartnerId(partnerId[e.target.checked] ? false : true);
  };

  const onChecked = (event) => {
    setChecked(event.target.checked);
  };

  const columns = [
    {
      field: "sno",
      headerName: "SI.no",
      width: 120,
      headerAlign: "center",
      headerClassName: "muidataGridHeader",
      cellClassName: "muidataGridCell",
      align: "center",
    },
    {
      field: "merchant_name",
      headerName: "Merchant Name",
      flex: 1,
      editable: false,
      headerAlign: "center",
      align: "left",
      headerClassName: "muidataGridHeader",
      cellClassName: "muidataGridCell",
      sortable: false,
      renderCell: (params) => {
        return (
          <>
            <Badge
              className={classes.statusBadge}
              anchorOrigin={{ vertical: "top", horizontal: "left" }}
              color={params.row.is_active ? "success" : "error"}
              variant="dot"
            ></Badge>
            {params.row.merchant_name}
          </>
        );
      },
    },

    {
      field: "address",
      headerName: "Address",
      flex: 1,
      editable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "muidataGridHeader",
      cellClassName: "muidataGridCell",
      sortable: false,
    },
    {
      field: "mobile",
      headerName: "Mobile",
      flex: 0.6,
      editable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "muidataGridHeader",
      cellClassName: "muidataGridCell",
      sortable: false,
    },
    {
      field: "email",
      headerName: "Email",
      type: "email",
      flex: 1,
      editable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "muidataGridHeader",
      cellClassName: "muidataGridCell",
      sortable: false,
    },
    {
      field: "valid",
      headerName: "Validity",
      flex: 0.5,
      editable: false,
      headerAlign: "center",
      align: "center",
      headerClassName: "muidataGridHeader",
      cellClassName: "muidataGridCell",
      sortable: true,
    },
    {
      field: "action",
      headerName: "Action",
      width: 120,
      headerAlign: "center",
      headerClassName: "muidataGridHeader",
      cellClassName: "muidataGridCell",
      align: "center",
      renderCell: (params) => (
        <>
          <IconButton onClick={() => onUpdate(params)}>
            <ModeEditRoundedIcon style={{ color: "#1976d2" }} />
          </IconButton>

          <IconButton onClick={() => onDeleteMerchant(params)}>
            <DeleteRoundedIcon style={{ color: "#d11a2a" }} />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = merchantData?.map((item, idx) => ({
    id: item.id,
    sno: ++idx,
    merchant_name: item?.user_name,
    address: item?.address,
    mobile: item?.mobile,
    email: item?.email,
    valid: item?.valid_upto,
    merchant_key: item?.merchant_key,
    partner_id: item?.partner_id,
    is_active: item.is_active,
  }));

  const getPartnerData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}partner`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setPartnerData(res?.data?.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getMerchantData = () => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}merchant`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setMerchantData(res?.data?.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useLayoutEffect(() => {
    getPartnerData();
  }, []);
  useLayoutEffect(() => {
    getMerchantData();
  }, []);

  return (
    <div>
      <Grid container className={classes.root}>
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography className={classes.headertxt}>
            Merchant Creation
          </Typography>
          <Button className={classes.addbtn} onClick={addMerchant}>
            Add Merchant
          </Button>
        </Grid>

        <Grid
          item
          xs={12}
          className={classes.tablemain}
          sx={{
            "& .muidataGridHeader": {
              backgroundColor: "#1976d2",
              color: "#ffff",
              fontFamily: "poppins",
            },
            "& .muidataGridCell": {
              fontFamily: "poppins",
            },
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={page}
            onPageSizeChange={(newPageSize) => setPage(newPageSize)}
            rowsPerPageOptions={[10, 15, 20]}
            pagination
            className={classes.dataGridtbl}
          />
        </Grid>

        <MerchantModal
          open={open}
          formik={formik}
          dropData={dropData}
          setDropdata={setDropdata}
          onClose={onClose}
          checked={checked}
          onChecked={onChecked}
          isEdit={isEdit}
          partnerData={partnerData}
          partnerId={partnerId}
          onSaveMerchant={onSaveMerchant}
          partnerListCheck={partnerListCheck}
          onUpdateMerchant={onUpdateMerchant}
          dateValue={dateValue}
        />
      </Grid>
    </div>
  );
};

export default memo(PartnerTable);
