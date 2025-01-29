import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const API_URL = "https://bssproxy01.neotel.nr/abmf-idd/idd/api/v1/tariff/create/pack";

const INITIAL_STATE = {
  packCode: "",
  packName: "",
  packType: "",
  validity: "",
  baseTariffId: "",
  discountedCallTariff: "",
  discountedSmsTariff: "",
  description: "",
  approvedBy: "",
  packPrice: "",
  isPackActive: false,
};

export default function AddInternationalTariff() {
  const [formData, setFormData] = useState(INITIAL_STATE);
  const [errors, setErrors] = useState({});

  // Helper function to ensure positive numeric values
  const handlePositiveInput = (e) => {
    const { name, value } = e.target;

    // If the value is a number and it's negative, remove the negative sign
    if (!isNaN(value) && value < 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: Math.abs(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // For numeric fields, use the handlePositiveInput function
    if (["validity", "baseTariffId", "discountedCallTariff", "discountedSmsTariff", "packPrice"].includes(name)) {
      handlePositiveInput(e);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const validate = () => {
    const requiredFields = [
      "packCode",
      "packName",
      "packType",
      "validity",
      "baseTariffId",
      "discountedCallTariff",
      "discountedSmsTariff",
      "description",
      "approvedBy",
      "packPrice",
    ];
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]?.toString().trim()) {
        newErrors[field] = `${field.replace(/([A-Z])/g, " $1")} is required`;
      }
    });

    // Validation to ensure all numeric fields are positive
    if (formData.validity && isNaN(formData.validity)) {
      newErrors.validity = "Validity must be a valid number";
    }
    if (formData.baseTariffId && isNaN(formData.baseTariffId)) {
      newErrors.baseTariffId = "Base Tariff ID must be a valid number";
    }
    if (formData.discountedCallTariff && isNaN(formData.discountedCallTariff)) {
      newErrors.discountedCallTariff = "Discounted Call Tariff must be a valid number";
    }
    if (formData.discountedSmsTariff && isNaN(formData.discountedSmsTariff)) {
      newErrors.discountedSmsTariff = "Discounted SMS Tariff must be a valid number";
    }
    if (formData.packPrice && isNaN(formData.packPrice)) {
      newErrors.packPrice = "Pack Price must be a valid number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      toast.error("Please fix the errors before submitting");
      return;
    }

    try {
      const response = await axios.post(API_URL, formData);
      if (response.status === 200) {
        toast.success("Tariff Pack added successfully!");
        setFormData(INITIAL_STATE);
        setErrors({});
      }
    } catch (error) {
      console.error("Error adding tariff pack:", error);
      toast.error("Failed to add tariff pack. Please try again.");
    }
  };

  return (
    <Paper elevation={10} style={{ padding: "30px", maxWidth: "600px", margin: "30px auto" }}>
      <Typography variant="h4" align="center" gutterBottom style={{ color: "#253A7D", fontWeight: "bold" }}>
        Add International Tariff
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {[
            { name: "packCode", label: "Pack Code" },
            { name: "packName", label: "Pack Name" },
            { name: "description", label: "Description" },
            { name: "approvedBy", label: "Approved By" },
          ].map(({ name, label }) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                fullWidth
                label={label}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                error={!!errors[name]}
                helperText={errors[name]}
                variant="outlined"
              />
            </Grid>
          ))}

          {[
            { name: "packType", label: "Pack Type", options: ["Prepaid", "Postpaid"] },
            { name: "validity", label: "Validity", type: "number" },
            { name: "baseTariffId", label: "Base Tariff ID", type: "number" },
            { name: "discountedCallTariff", label: "Discounted Call Tariff", type: "number" },
            { name: "discountedSmsTariff", label: "Discounted SMS Tariff", type: "number" },
            { name: "packPrice", label: "Pack Price", type: "number" },
          ].map(({ name, label, options, type = "text" }) => (
            <Grid item xs={12} sm={6} key={name}>
              {options ? (
                <FormControl fullWidth error={!!errors[name]}>
                  <InputLabel>{label}</InputLabel>
                  <Select
                    name={name}
                    value={formData[name]}
                    onChange={handleChange}
                    label={label}
                    variant="outlined"
                  >
                    {options.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              ) : (
                <TextField
                  fullWidth
                  label={label}
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  error={!!errors[name]}
                  helperText={errors[name]}
                  variant="outlined"
                />
              )}
            </Grid>
          ))}

          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.isPackActive}
                  onChange={handleChange}
                  name="isPackActive"
                  color="primary"
                />
              }
              label="Is Pack Active"
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" fullWidth style={{ backgroundColor: "#253A7D", color: "#fff" }}>
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>

      <ToastContainer position="bottom-left" />
    </Paper>
  );
}
