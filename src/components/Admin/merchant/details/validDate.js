import { TextField } from '@mui/material'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { memo } from 'react'

const ValidDate = ({formik, dateValue}) => {
  const [datePickerValue, setDatePickerValue] = React.useState(null);
// console.log(dateValue+" HI");
  const onDateChange = (value) => {
    setDatePickerValue(value);
    // console.log("On Change Date :" + value.format("DD/MM/YYYY"));
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      value={datePickerValue}
                      inputFormat="DD/MM/YYYY"
                      id="valid"
                      onChange={(e) => onDateChange(e)}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          id="valid"
                          size="small"
                          error={formik.touched.valid && formik.errors.valid}
                          helperText={formik.touched.valid && formik.errors.valid}
                        />
                      )}
                    />
                  </LocalizationProvider>
  )
}

export default memo(ValidDate)