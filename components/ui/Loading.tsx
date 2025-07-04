import { Backdrop, CircularProgress } from "@mui/material";

interface LoadingProps {
  open: boolean;
}

const Loading = ({ open }: LoadingProps) => {
  return (
    <Backdrop
      sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default Loading;
