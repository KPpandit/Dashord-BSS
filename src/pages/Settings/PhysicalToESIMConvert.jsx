import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Modal,
  CircularProgress,
  IconButton,
} from "@mui/material";
import { SwapHoriz, ReportProblem, Undo } from "@mui/icons-material";
import axios from "axios";
import { toast } from "react-toastify";
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
} from 'formik-mui';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const conversionSchemas = {
  E_SIM: Yup.object().shape({
    msisdn: Yup.string()
      .matches(/^\d{10}$/, 'Must be exactly 10 digits')
      .required('Required'),
    reason: Yup.string().required('Required'),
    latestSimImsi: Yup.string().required('Required'),
    ki: Yup.string().required('Required'),
    opc: Yup.string().required('Required'),
    iccId: Yup.string().required('Required'),
  }),
  POSTPAID: Yup.object().shape({
    msisdn: Yup.string()
      .matches(/^\d{10}$/, 'Must be exactly 10 digits')
      .required('Required'),
    reason: Yup.string().required('Required'),
    customerType: Yup.string().required('Required'),
  }),
  STOLEN: Yup.object().shape({
    msisdn: Yup.string()
      .matches(/^\d{10}$/, 'Must be exactly 10 digits')
      .required('Required'),
    reason: Yup.string().required('Required'),
    latestSimImsi: Yup.string().required('Required'),
    ki: Yup.string().required('Required'),
    opc: Yup.string().required('Required'),
    iccId: Yup.string().required('Required'),
  }),
  RETURN_SIM: Yup.object().shape({
    msisdn: Yup.string()
      .matches(/^\d{10}$/, 'Must be exactly 10 digits')
      .required('Required'),
  }),
};

const API_ENDPOINTS = {
  E_SIM: "https://bssproxy01.neotel.nr/erp/api/sim/conversion",
  POSTPAID: `https://bssproxy01.neotel.nr/erp/api/sim/coversion/msisdn`,
  STOLEN: "https://bssproxy01.neotel.nr/erp/api/sim/stolen/process",
  RETURN_SIM: "http://172.17.1.28:9292/api/customer/submit/sim/msisdn",
};

const ConversionForm = ({ type, onClose }) => {
  const tokenValue = localStorage.getItem("token");
  const initialValues = {
    msisdn: '',
    reason: '',
    latestSimImsi: '',
    ki: '',
    opc: '',
    iccId: '',
    customerType: '',
  };

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    try {
      let config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenValue}`,
        },
      };

      let response;
      switch (type) {
        case 'E_SIM':
          response = await axios.put(API_ENDPOINTS.E_SIM, values, config);
          break;
        case 'POSTPAID':
          response = await axios.put(
            `${API_ENDPOINTS.POSTPAID}/${values.msisdn}/customertype/${values.customerType}/reason/${values.reason}`,
            {},
            config
          );
          break;
        case 'STOLEN':
          response = await axios.put(API_ENDPOINTS.STOLEN, values, config);
          break;
        case 'RETURN_SIM':
          response = await axios.post(
            `${API_ENDPOINTS.RETURN_SIM}/${values.msisdn}`,
            {},
            config
          );
          break;
        default:
          throw new Error('Invalid conversion type');
      }

      if (response.status === 200) {
        toast.success("Processed successfully");
        onClose();
      }
    } catch (err) {
      setErrors({ submit: 'Failed to process request. Please try again.' });
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={conversionSchemas[type]}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting, errors }) => (
        <Form>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
            {type.replace(/_/g, ' ')}
          </Typography>

          <Field
            component={TextField}
            name="msisdn"
            label="MSISDN"
            fullWidth
            sx={{ mb: 2 }}
            inputProps={{ maxLength: 10 }}
            onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}
          />

          {type !== 'RETURN_SIM' && (
            <Field
              component={TextField}
              name="reason"
              label="Reason"
              fullWidth
              sx={{ mb: 2 }}
            />
          )}

          {(type === 'E_SIM' || type === 'STOLEN') && (
            <>
              <Field
                component={TextField}
                name="latestSimImsi"
                label="Latest SIM IMSI"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Field
                component={TextField}
                name="ki"
                label="KI"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Field
                component={TextField}
                name="opc"
                label="OPC"
                fullWidth
                sx={{ mb: 2 }}
              />
              <Field
                component={TextField}
                name="iccId"
                label="ICCID"
                fullWidth
                sx={{ mb: 2 }}
              />
            </>
          )}

          {type === 'POSTPAID' && (
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Customer Type</InputLabel>
              <Field
                component={Select}
                name="customerType"
                label="Customer Type"
              >
                <MenuItem value="PrePaid">Prepaid</MenuItem>
                <MenuItem value="PostPaid">Postpaid</MenuItem>
              </Field>
            </FormControl>
          )}

          {errors.submit && (
            <Typography color="error" sx={{ mb: 2 }}>
              {errors.submit}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            fullWidth
            sx={{
              background: "linear-gradient(135deg, #6a11cb, #2575fc)",
              color: "#fff",
              fontWeight: "bold",
              '&:hover': {
                background: "linear-gradient(135deg, #2575fc, #6a11cb)",
              },
            }}
          >
            {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

const PhysicalToESIMConvert = () => {
  const [openModal, setOpenModal] = useState(false);
  const [conversionType, setConversionType] = useState(null);

  const handleOpenModal = (type) => {
    setConversionType(type);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setConversionType(null);
  };

  return (
    <Box sx={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      minHeight: "100vh",
      padding: 2,
      paddingTop: 15,
      background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
    }}>
      <Typography variant="h4" sx={{ mb: 4, color: "#333", fontWeight: "bold" }}>
        SIM Conversion
      </Typography>

      <Box sx={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
        {['E_SIM', 'POSTPAID', 'STOLEN', 'RETURN_SIM'].map((type) => (
          <Card key={type} sx={{
            width: 300,
            textAlign: "center",
            boxShadow: 3,
            borderRadius: 2,
            transition: "transform 0.3s",
            "&:hover": { transform: "scale(1.05)" },
            background: `linear-gradient(135deg, ${getCardColor(type)})`,
            color: "#fff",
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: "bold" }}>
                {getCardLabel(type)}
                <IconButton 
                  color="inherit" 
                  onClick={() => handleOpenModal(type)}
                  sx={{ fontSize: "3rem" }}
                >
                  {getCardIcon(type)}
                </IconButton>
                {type !== 'RETURN_SIM' && getCardSuffix(type)}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          background: "linear-gradient(135deg, #ffffff, #f5f5f5)",
        }}>
          {conversionType && <ConversionForm type={conversionType} onClose={handleCloseModal} />}
        </Box>
      </Modal>
      <ToastContainer position="bottom-left" />
    </Box>
  );
};

// Helper functions
const getCardColor = (type) => {
  const colors = {
    E_SIM: '#6a11cb, #2575fc',
    POSTPAID: '#ff7e5f, #feb47b',
    STOLEN: '#ff416c, #ff4b2b',
    RETURN_SIM: '#4CAF50, #81C784'
  };
  return colors[type];
};

const getCardLabel = (type) => {
  const labels = {
    E_SIM: 'Physical ',
    POSTPAID: 'Prepaid ',
    STOLEN: 'SIM ',
    RETURN_SIM: 'Return '
  };
  return labels[type];
};

const getCardSuffix = (type) => {
  const suffixes = {
    E_SIM: 'eSIM',
    POSTPAID: 'Postpaid',
    STOLEN: 'Stolen'
  };
  return suffixes[type];
};

const getCardIcon = (type) => {
  const icons = {
    E_SIM: <SwapHoriz fontSize="inherit" />,
    POSTPAID: <SwapHoriz fontSize="inherit" />,
    STOLEN: <ReportProblem fontSize="inherit" />,
    RETURN_SIM: <Undo fontSize="inherit" />
  };
  return icons[type];
};

export default PhysicalToESIMConvert;