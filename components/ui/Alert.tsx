import { Alert, Snackbar } from "@mui/material";

interface ErrorAlertProps {
  open: boolean;
  onClose: () => void;
  message?: string;
  severity?: "error" | "success";
  anchorOrigin?: {
    vertical: "top" | "bottom";
    horizontal: "center" | "left" | "right";
  };
}

const ErrorAlert = ({
  open,
  onClose,
  message,
  severity = "error",
  anchorOrigin = { vertical: "top", horizontal: "center" },
}: ErrorAlertProps) => {
  return (
    <Snackbar
      open={open}
      anchorOrigin={anchorOrigin}
      onClose={onClose}
      autoHideDuration={4000}
    >
      <Alert severity={severity}>{message}</Alert>
    </Snackbar>
  );
};

export default ErrorAlert;
