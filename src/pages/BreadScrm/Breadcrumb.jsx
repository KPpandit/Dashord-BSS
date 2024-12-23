import React from "react";
import { Breadcrumbs, Link, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

const Breadcrumb = ({ onRootMarginChange }) => {
  const location = useLocation();
  const navigate = useNavigate();

  // Define a mapping for route paths to display names
  const routeNameMap = {
    "/customer": "Subscriber Management",
    "/customer/newCustomer": "New Customer",
    "/agent": "Partner Management",
    "/simManagement": "SIM/e-SIM Management",
    "/devicemanagement": "Device Management",
    "/category": "Category",
    "/ratingProfile": "Tariff Creation",
    "/prepaidActivatedPlan": "Prepaid Approved Plans",
    "/subscriber":"Subsriber ",
    "/subscriber/newSubscriber":"New Subscriber",
    "/subscriber/newSubscriber/addSubscriberDetails":"Add Subscriber Details"
  };

  // Split the pathname into parts for breadcrumb navigation
  const pathnames = location.pathname.split("/").filter((x) => x);

  // Determine if the breadcrumb is visible
  const isRootPath = pathnames.length <= 1;

  // Notify the parent to adjust margin based on visibility
  React.useEffect(() => {
    if (onRootMarginChange) {
      onRootMarginChange(isRootPath ? "2px" : "8px");
    }
  }, [isRootPath, onRootMarginChange]);

  // If on the root path, do not display breadcrumb, just adjust margin
  if (isRootPath) return null;

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{
        margin: "8px 0", // Breadcrumb-specific margin
        padding: "4px 16px", // Alignment
        backgroundColor: "#f9f9f9", // Optional: background
        borderRadius: "4px", // Optional: rounded corners
      }}
    >
      {pathnames.map((value, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography
            key={routeTo}
            sx={{
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            {routeNameMap[routeTo] || value}
          </Typography>
        ) : (
          <Link
            key={routeTo}
            onClick={() => navigate(routeTo)}
            sx={{
              cursor: "pointer",
              color: "inherit",
              fontSize: "14px",
              textDecoration: "none",
            }}
          >
            {routeNameMap[routeTo] || value}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
