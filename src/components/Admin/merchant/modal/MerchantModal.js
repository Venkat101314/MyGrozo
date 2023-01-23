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
import Username from "../details/username";
import EmailField from "../details/email";
import PassWordField from "../details/password";
import AddressField from "../details/address";
import MerchantKey from "../details/merchantkey";
import Mobile from "../details/mobile";
import PartnerList from "../details/partnerList"
import ValidDate from "../details/validDate";
import useStyle from "./style";

const MerchantModal = ({
  open,
  onClose,
  formik,
  checked,
  onChecked,
  isEdit,
  onSaveMerchant,
  onUpdateMerchant,
partnerData,
dateValue,
partnerId,
partnerListCheck
}) => {
  const classes = useStyle();
  return (
    <div>
      <Modal open={open}>
        <Box className={classes.merchantModal}>
          <Grid container className={classes.merchantModalmain}>
            <Grid item xs={12} className={classes.modalHeader}>
              <Typography className={classes.modalHeadertxt}>
                {isEdit ? "Update Merchant" : "Add Merchant"}
              </Typography>
              <IconButton onClick={onClose}>
                <CloseRoundedIcon sx={{ color: "white" }} />
              </IconButton>
            </Grid>

            <Grid item xs={12} className={classes.modalContent}>
              <Grid container columns={{xs:9}} spacing={1}>
                <Grid item xs={3} style={{ paddingBlockEnd: "15px" }}>
                  <Username formik={formik} />
                </Grid>
                <Grid item xs={3}  style={{ paddingBlockEnd: "15px" }}>
                  <EmailField formik={formik} />
                </Grid>
                <Grid item xs={3} style={{ paddingBlockEnd: "15px" }}>
                  <PassWordField formik={formik} isEdit={isEdit} />
                </Grid>
                <Grid item xs={3}  style={{ paddingBlockEnd: "15px" }}>
                  <MerchantKey formik={formik} />
                </Grid>
                <Grid item xs={3} style={{ paddingBlockEnd: "15px" }}>
                  <Mobile formik={formik} />
                </Grid>
                <Grid item xs={3} style={{ paddingBlockEnd: "15px" }}>
                  <AddressField formik={formik} />
                </Grid>
                <Grid item xs={3} style={{ paddingBlockEnd: "15px" }}>
                  <ValidDate formik={formik} dateValue={dateValue} />
                </Grid>
                <Grid item xs={12}>
                <Typography>Partner's List :</Typography>
                <PartnerList partnerListCheck={partnerListCheck} partnerData={partnerData} partnerId={partnerId}/>
          </Grid>
              </Grid>
     
            </Grid>

            <Grid item xs={12} className={classes.ModalFooter}>
              <Grid
                style={{
                  paddingInlineEnd: "10px",
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Checkbox
                   id="is_active"
                   name="is_active"
                   checked={formik.values.is_active}
                   onChange={formik.handleChange}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <Typography style={{ fontFamily: "poppins" }}>
                  Active
                </Typography>
              </Grid>
              <Grid>
                <Button className={classes.cancelbtn} onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  className={classes.savebtn}
                  onClick={isEdit ? onUpdateMerchant : onSaveMerchant}
                >
                  {isEdit ? "Update" : "Save"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default memo(MerchantModal);
