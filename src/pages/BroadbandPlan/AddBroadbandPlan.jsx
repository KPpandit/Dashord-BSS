import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Box,
  Typography,
  Snackbar,
  Alert,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";

export default function AddBroadbandPlan() {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const formik = useFormik({
    initialValues: {
      plan_name: "",
      plan_code: "",
      max_download_band_width: "",
      max_upload_band_width: "",
      min_download_bandwidth: "",
      min_upload_bandwidth: "",
      fup_policy: {
        is_fup_enabled: false,
        fup_data_tariff: "",
        step_down_download_bandwidth: "",
        step_down_upload_bandwidth: "",
      },
      total_data_limit: "",
      validity: "",
      is_carry_forward: false,
      plan_status: "",
      plan_created_by: "",
      plan_approved_by: "",
    },
    validationSchema: Yup.object({
      plan_name: Yup.string().required("Plan Name is required"),
      plan_code: Yup.string().required("Plan Code is required"),
      max_download_band_width: Yup.number()
        .required("Max Download Bandwidth is required")
        .positive("Value must be positive"),
      max_upload_band_width: Yup.number()
        .required("Max Upload Bandwidth is required")
        .positive("Value must be positive"),
      min_download_bandwidth: Yup.number()
        .required("Min Download Bandwidth is required")
        .positive("Value must be positive"),
      min_upload_bandwidth: Yup.number()
        .required("Min Upload Bandwidth is required")
        .positive("Value must be positive"),
      "fup_policy.is_fup_enabled": Yup.boolean(),
      "fup_policy.fup_data_tariff": Yup.number()
        .nullable()
        .positive("Value must be positive"),
      "fup_policy.step_down_download_bandwidth": Yup.number()
        .nullable()
        .positive("Value must be positive"),
      "fup_policy.step_down_upload_bandwidth": Yup.number()
        .nullable()
        .positive("Value must be positive"),
      total_data_limit: Yup.number()
        .required("Total Data Limit is required")
        .positive("Value must be positive"),
      validity: Yup.number()
        .required("Validity is required")
        .positive("Value must be positive"),
      plan_created_by: Yup.string().required("Created By is required"),
      plan_approved_by: Yup.string().required("Approved By is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          "https://bssproxy01.neotel.nr/abmf-ftth/api/broadband/plan/create",
          values
        );
        setSnackbarMessage("Broadband Plan Created Successfully!");
        setSnackbarSeverity("success");
        setOpenSnackbar(true);
      } catch (error) {
        setSnackbarMessage("Error: Failed to Create Plan");
        setSnackbarSeverity("error");
        setOpenSnackbar(true);
      }
    },
  });

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" sx={{ textAlign: "center", marginBottom: 3 }}>
        Add Broadband Plan
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={2}>
          {/* Plan Name */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Plan Name"
              name="plan_name"
              value={formik.values.plan_name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.plan_name && Boolean(formik.errors.plan_name)}
              helperText={formik.touched.plan_name && formik.errors.plan_name}
            />
          </Grid>
          {/* Plan Code */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Plan Code"
              name="plan_code"
              value={formik.values.plan_code}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.plan_code && Boolean(formik.errors.plan_code)}
              helperText={formik.touched.plan_code && formik.errors.plan_code}
            />
          </Grid>
          {/* Max and Min Bandwidth */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Max Download Bandwidth (Mbps)"
              name="max_download_band_width"
              type="number"
              value={formik.values.max_download_band_width}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.max_download_band_width &&
                Boolean(formik.errors.max_download_band_width)
              }
              helperText={
                formik.touched.max_download_band_width &&
                formik.errors.max_download_band_width
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Max Upload Bandwidth (Mbps)"
              name="max_upload_band_width"
              type="number"
              value={formik.values.max_upload_band_width}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.max_upload_band_width &&
                Boolean(formik.errors.max_upload_band_width)
              }
              helperText={
                formik.touched.max_upload_band_width &&
                formik.errors.max_upload_band_width
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Min Download Bandwidth (Mbps)"
              name="min_download_bandwidth"
              type="number"
              value={formik.values.min_download_bandwidth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.min_download_bandwidth &&
                Boolean(formik.errors.min_download_bandwidth)
              }
              helperText={
                formik.touched.min_download_bandwidth &&
                formik.errors.min_download_bandwidth
              }
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Min Upload Bandwidth (Mbps)"
              name="min_upload_bandwidth"
              type="number"
              value={formik.values.min_upload_bandwidth}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={
                formik.touched.min_upload_bandwidth &&
                Boolean(formik.errors.min_upload_bandwidth)
              }
              helperText={
                formik.touched.min_upload_bandwidth &&
                formik.errors.min_upload_bandwidth
              }
            />
          </Grid>
          {/* FUP Policy */}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formik.values.fup_policy.is_fup_enabled}
                  onChange={(event) =>
                    formik.setFieldValue(
                      "fup_policy.is_fup_enabled",
                      event.target.checked
                    )
                  }
                />
              }
              label="Enable FUP Policy"
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="FUP Data Tariff (GB)"
              name="fup_policy.fup_data_tariff"
              type="number"
              value={formik.values.fup_policy.fup_data_tariff}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Step Down Download Bandwidth (Mbps)"
              name="fup_policy.step_down_download_bandwidth"
              type="number"
              value={formik.values.fup_policy.step_down_download_bandwidth}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Step Down Upload Bandwidth (Mbps)"
              name="fup_policy.step_down_upload_bandwidth"
              type="number"
              value={formik.values.fup_policy.step_down_upload_bandwidth}
              onChange={formik.handleChange}
            />
          </Grid>
          {/* Total Data Limit and Validity */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Total Data Limit (GB)"
              name="total_data_limit"
              type="number"
              value={formik.values.total_data_limit}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Validity (Days)"
              name="validity"
              type="number"
              value={formik.values.validity}
              onChange={formik.handleChange}
            />
          </Grid>
          {/* Created By and Approved By */}
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Plan Created By"
              name="plan_created_by"
              value={formik.values.plan_created_by}
              onChange={formik.handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Plan Approved By"
              name="plan_approved_by"
              value={formik.values.plan_approved_by}
              onChange={formik.handleChange}
            />
          </Grid>
          {/* Submit Button */}
          <Grid item xs={12}>
            <Button fullWidth variant="contained" type="submit">
              Create Plan
            </Button>
          </Grid>
        </Grid>
      </form>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
