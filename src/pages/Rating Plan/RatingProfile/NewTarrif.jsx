import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Stepper,
  Step,
  StepLabel,
  Typography,
  Box,
} from "@mui/material";
import PlanDetailsForm from "./PlanDetailsForm";
import BuildInUsage from "./BuildInUsage";
import UsageCharges from "./UsageCharges";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const NewTarrif = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    tariff_type: Yup.string().required("Tariff type is required"),
    name: Yup.string().required("Name is required"),
    code: Yup.string().required("Code is required"),
    price: Yup.number()
      .required("Price is required")
      .min(0, "Price must be 0 or greater")
      .max(9999, "Price cannot exceed 4 digits"),
    validity: Yup.number()
      .required("Validity is required")
      .min(0, "Validity must be 0 or greater")
      .max(9999, "Validity cannot exceed 4 digits"),
    description: Yup.string().required("Description is required"),
  });

  const formik = useFormik({
    initialValues: {
      tariff_type: "Prepaid",
      name: "",
      code: "",
      price: "",
      validity: "",
      description: "",
      pricing_model: "",
      category_name: "",
      cug_mins: '',
      cug_sms: '',
      base_pack: {
        onn_sms_charges: "",
        onn_call_charges: "",
        ofn_sms_charges: "",
        ofn_call_charges: "",
        data_charges: "",
        roam_in_sms_tariff: "",
        roam_in_call_tariff: "",
        roam_in_data_Tariff: "",
        roam_out_sms_tariff: "",
        roam_out_call_tariff: "",
        roam_out_data_tariff: "",
      },
    },
    validationSchema,
    onSubmit: async (values) => {
      const isPrepaid = values.tariff_type === "Prepaid";
      const apiUrl = isPrepaid
        ? "https://bssproxy01.neotel.nr1/abmf-prepaid/api/prepaid/packs/create"
        : "https://bssproxy01.neotel.nr1/abmf-postpaid/api/postpaid/packs/create";

      const submittedValues = {
        ...values,
        ...(isPrepaid
          ? { pack_name: values.name, pack_code: values.code, pack_price: values.price }
          : { plan_name: values.name, plan_code: values.code, plan_price: values.price }),
      };

      try {
        const response = await axios.post(apiUrl, submittedValues, {
          headers: {
            Authorization: "Bearer +00f35991-0de0-4f5c-a432-b5d20a7ce240",
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (response.status === 200) {
          toast.success(`Tariff Plan Added Successfully for ${values.tariff_type}`, {
            autoClose: 2000, // Ensures the toast auto-closes after 2 seconds
          });

          // Delay navigation for 2 seconds to allow the toast to display
          setTimeout(() => {
            navigate("/ratingProfile");
          }, 2000);
        }

      } catch (e) {
        toast.error(e.response?.data?.message || "An error occurred", {
          autoClose: 2000,
        });
      }
    },
  });

  const handleNext = () => {
    if (!Object.keys(formik.errors).length) {
      setActiveStep(activeStep + 1);
    } else {
      formik.handleSubmit();
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <ToastContainer position="bottom-left" />
      <Stepper activeStep={activeStep} alternativeLabel>
        <Step>
          <StepLabel>Plan Details</StepLabel>
        </Step>
        <Step>
          <StepLabel>Build In Usage</StepLabel>
        </Step>
        <Step>
          <StepLabel>Out of pack charges</StepLabel>
        </Step>
      </Stepper>

      {activeStep === 0 && <PlanDetailsForm formik={formik} handleNext={handleNext} />}
      {activeStep === 1 && (
        <BuildInUsage formik={formik} handleNext={handleNext} handleBack={handleBack} />
      )}
      {activeStep === 2 && <UsageCharges formik={formik} handleBack={handleBack} />}
    </form>
  );
};

export default NewTarrif;
