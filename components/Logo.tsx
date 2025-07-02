import { Link } from "react-router";
import { BedroomParent } from "@mui/icons-material";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-1.5">
      <BedroomParent className="text-orange-500" sx={{ fontSize: 35 }} />
      <img src="/assets/icons/logo.svg" alt="logo" className="w-[120px]" />
    </Link>
  );
};

export default Logo;
