import { Link } from "react-router";
import BedroomParentIcon from "@mui/icons-material/BedroomParent";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-1.5">
      <BedroomParentIcon className="text-orange-500" sx={{ fontSize: 35 }} />
      <img src="/assets/icons/logo.svg" alt="logo" className="w-[120px]" />
    </Link>
  );
};

export default Logo;
