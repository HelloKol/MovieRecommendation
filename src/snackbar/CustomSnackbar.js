import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert ref={ref} variant="filled" {...props} />;
});

export default function CustomSnackbar(props) {
  const [open, setOpen] = React.useState(true);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>
      <Snackbar open={open} autoHideDuration={1500} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={props.status}
          sx={{ width: "100%" }}
        >
          {props.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
