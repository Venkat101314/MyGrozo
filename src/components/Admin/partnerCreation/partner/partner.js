import {
  Avatar,
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
import PartnerModal from "./modal/partnermodal";
import * as _ from "lodash";
import { toast } from "react-toastify";

const PartnerTable = () => {
  const classes = useStyle();
  const [page, setPage] = useState(10);
  const [partnerData, setPartnerData] = useState([]);
  const [open, setOpen] = useState(false);
  const [dropData, setDropdata] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [checked, setChecked] = useState(false);
  const [imageData, setImageData] = useState();
  const [imgUrl, setImgurl] = useState();
  const token = localStorage.getItem("superAdmin");

  const validation = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
      .min(8, "Password should be of minimum 8 characters length")
      .required("Password is required"),
    username: yup.string("Enter a name").required("Username is required!"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      username: "",
      id: "",
    },
    validationSchema: validation,
    // onSubmit: onCreatePartner,
  });

  const addPartner = () => {
    setOpen(true);
    setIsEdit(false);
    formik?.resetForm();
    setChecked(false);
    setImgurl();
  };

  const onClose = () => {
    setOpen(false);
    setDropdata([]);
  };

  const onUpdate = (e) => {
    setOpen(true);
    setIsEdit(true);
    formik?.setFieldValue("username", e?.row?.name);
    formik?.setFieldValue("email", e?.row?.email);
    formik?.setFieldValue("id", e?.row?.id);
    setImgurl(e?.row?.logo);
    if (e?.row?.is_active === "Deactive") {
      setChecked(false);
    } else {
      setChecked(true);
    }
    console.log("0", e);
  };

  const onUpdatePartner = () => {
    const userData = new FormData();
    userData.append("logo", imgUrl);
    if (!imgUrl) {
      userData.append("logo", dropData[0], imageData?.path);
    }
    userData.append("name", formik.values.username);
    userData.append("password", formik.values.password);
    userData.append("email", formik.values.email);
    userData.append("is_active", checked);
    // console.log(userData);
    axios
      .put(
        `${process.env.REACT_APP_BASE_URL}partner/${formik?.values?.id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
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
          getPartnerData();
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

  const onDeletePartner = (e) => {
    console.log(e);
    axios
      .delete(`${process.env.REACT_APP_BASE_URL}partner/${e?.row?.id}`, {
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
          getPartnerData();
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

  const onSavePartner = () => {
    formik?.handleSubmit();
    const formData = new FormData();
    formData.append("logo", dropData[0], imageData?.path);
    formData.append("name", formik?.values?.username);
    formData.append("password", formik?.values?.password);
    formData.append("email", formik?.values?.email);
    formData.append("is_active", checked);
    console.log(formData);
    axios
      .post(`${process.env.REACT_APP_BASE_URL}partner`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
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
          getPartnerData();
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
      field: "logo",
      headerName: "Logo",
      flex: 1,
      headerAlign: "center",
      headerClassName: "muidataGridHeader",
      cellClassName: "muidataGridCell",
      align: "center",
      renderCell: (params) => {
        return (
          <div style={{ padding: 1 }}>
            <Avatar
              variant="square"
              src={`http://192.168.0.132:8001/media/${params.value}`}
              className={classes.partnerLogo}
            />
          </div>
        );
      },
    },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      headerAlign: "center",
      headerClassName: "muidataGridHeader",
      cellClassName: "muidataGridCell",
      align: "center",
    },
    {
      field: "is_active",
      headerName: "Active",
      flex: 1,
      headerAlign: "center",
      headerClassName: "muidataGridHeader",
      cellClassName: "muidataGridCell",
      align: "center",
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

          <IconButton onClick={() => onDeletePartner(params)}>
            <DeleteRoundedIcon style={{ color: "#d11a2a" }} />
          </IconButton>
        </>
      ),
    },
  ];

  const rows = partnerData?.map((item, idx) => ({
    id: item.id,
    sno: ++idx,
    name: item?.name,
    logo: item?.logo,
    email: item?.email,
    is_active: item.is_active ? "Active" : "Deactive",
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
        console.log(res?.data?.response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useLayoutEffect(() => {
    getPartnerData();
  }, []);

  useEffect(() => {
    const updateImageSrc = _.map(dropData, (item) => setImageData(item));
    console.log("imageData", imageData);
  }, [dropData]);

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
            Partner Creation
          </Typography>
          <Button className={classes.addbtn} onClick={addPartner}>
            Add Partner
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

        <PartnerModal
          open={open}
          formik={formik}
          dropData={dropData}
          setDropdata={setDropdata}
          onClose={onClose}
          checked={checked}
          onChecked={onChecked}
          isEdit={isEdit}
          onSavePartner={onSavePartner}
          setImgurl={setImgurl}
          imgUrl={imgUrl}
          onUpdatePartner={onUpdatePartner}
        />
      </Grid>
    </div>
  );
};

export default memo(PartnerTable);
