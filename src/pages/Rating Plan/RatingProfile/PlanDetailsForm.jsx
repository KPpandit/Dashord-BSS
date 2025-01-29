import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
} from "@mui/material";
import axios from "axios";

const PlanDetailsForm = ({ formik, handleNext }) => {
  const [categories, setCategories] = useState([]); // State to store category options
  const [loading, setLoading] = useState(false); // State for loading status

  // Fetch categories from the API
  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://172.17.1.11:9696/api/category/detail/get/all"
        );
        const categoryNames = response.data.map((category) => category.name);
        setCategories(categoryNames);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // Helper function to render text field
  const renderTextField = (name, label, isNumeric = false, maxLength) => (
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label={label}
        name={name}
        value={formik.values[name]}
        onChange={(e) => {
          const value = e.target.value;
          if (isNumeric) {
            // Allow only numeric characters and truncate to maxLength
            if (/^\d*$/.test(value) && value.length <= maxLength) {
              formik.setFieldValue(name, value);
            }
          } else {
            formik.handleChange(e); // For non-numeric fields
          }
        }}
        onBlur={formik.handleBlur}
        error={formik.touched[name] && Boolean(formik.errors[name])}
        helperText={formik.touched[name] && formik.errors[name]}
        inputProps={{
          inputMode: isNumeric ? "numeric" : "text", // Numeric input for numbers
        }}
      />
    </Grid>
  );

  // Helper function to render select field
  const renderSelectField = (name, label, options) => (
    <Grid item xs={12} sm={6}>
      <FormControl
        fullWidth
        error={formik.touched[name] && Boolean(formik.errors[name])}
      >
        <InputLabel>{label}</InputLabel>
        <Select
          name={name}
          label={name}
          value={formik.values[name]}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        >
          {options.map((option, index) => (
            <MenuItem key={index} value={option}>
              {option}
            </MenuItem>
          ))}
        </Select>
        {formik.touched[name] && formik.errors[name] && (
          <FormHelperText>{formik.errors[name]}</FormHelperText>
        )}
      </FormControl>
    </Grid>
  );

  return (
    <>
      <Typography
        variant="h6"
        sx={{ padding: 2, color: "#253A7D" }}
        gutterBottom
      >
        Plan Details
      </Typography>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {/* Tariff Type Dropdown */}
        {renderSelectField("tariff_type", "Tariff Type", ["Prepaid", "Postpaid"])}

        {renderTextField("name", "Plan Name")}
        {renderTextField("code", "Plan Code")}
        {/* Category Name Dropdown */}
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            error={formik.touched.category_name && Boolean(formik.errors.category_name)}
          >
            <InputLabel>Category Name</InputLabel>
            <Select
              name="category_name"
              value={formik.values.category_name}
              label={"Category Name"}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              disabled={loading || categories.length === 0}
            >
              {categories.map((category, index) => (
                <MenuItem key={index} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.category_name && formik.errors.category_name && (
              <FormHelperText>{formik.errors.category_name}</FormHelperText>
            )}
          </FormControl>
        </Grid>
        {renderTextField("description", "Description")}
        {renderSelectField("pricing_model", "Pricing Model", [
          "Fixed",
          "Differential",
          "Tiered",
        ])}
        {renderTextField("price", "Price in AUD", true, 4)}
        {renderTextField("validity", "Validity", true, 4)}
      </Grid>
      <Grid container spacing={2} style={{ marginTop: "20px", paddingLeft: 20 }}>
        <Grid item>
          <Button
            variant="contained"
            color="primary"
            sx={{ backgroundColor: "#253A7D" }}
            onClick={() => {
              if (formik.isValid) {
                handleNext();
              }
            }}
            disabled={!formik.dirty || !formik.isValid || loading} // Button disabled unless the form is dirty and valid
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

export default PlanDetailsForm;
