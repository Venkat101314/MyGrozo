import {
  Box,
  Button,
  Checkbox,
  Grid,
  IconButton,
  Modal,
  Typography,
} from "@mui/material";
import React, { memo } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import Username from "../details/name";
import EmailField from "../details/email";
import PassWordField from "../details/password";
import Dropzone from "../../../dropzone/dropzone";
import useStyle from "./style";

const PartnerModal = ({
  open,
  setDropdata,
  dropData,
  onClose,
  formik,
  checked,
  onChecked,
  isEdit,
  onSavePartner,
  setImgurl,
  imgUrl,
  onUpdatePartner,
}) => {
  const classes = useStyle();
  return (
    <div>
      <Modal open={open}>
        <Box className={classes.partnerModal}>
          <Grid container className={classes.partnerModalmain}>
            <Grid item xs={12} className={classes.modalHeader}>
              <Typography className={classes.modalHeadertxt}>
                {isEdit ? "Update Partner" : "Add Partner"}
              </Typography>
              <IconButton onClick={onClose}>
                <CloseRoundedIcon sx={{ color: "white" }} />
              </IconButton>
            </Grid>

            <Grid item xs={12} className={classes.modalContent}>
              <Grid item xs={6}>
                <Dropzone
                  setDropdata={setDropdata}
                  dropData={dropData}
                  setImgurl={setImgurl}
                  imgUrl={imgUrl}
                  isEdit={isEdit}
                />
              </Grid>

              <Grid item xs={6}>
                <Grid style={{ paddingBlockEnd: "15px" }}>
                  <Username formik={formik} />
                </Grid>
                <Grid style={{ paddingBlockEnd: "15px" }}>
                  <EmailField formik={formik} />
                </Grid>
                <Grid style={{ paddingBlockEnd: "15px" }}>
                  <PassWordField formik={formik} isEdit={isEdit} />
                </Grid>
                <Grid
                  style={{
                    paddingInlineEnd: "10px",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Checkbox
                    checked={checked}
                    onChange={onChecked}
                    inputProps={{ "aria-label": "controlled" }}
                  />
                  <Typography style={{ fontFamily: "poppins" }}>
                    Active
                  </Typography>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className={classes.ModalFooter}>
              <Button className={classes.cancelbtn} onClick={onClose}>
                Cancel
              </Button>
              <Button
                className={classes.savebtn}
                onClick={isEdit ? onUpdatePartner : onSavePartner}
              >
                {isEdit ? "Update" : "Save"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default memo(PartnerModal);
