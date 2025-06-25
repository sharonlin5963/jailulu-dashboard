import { NavLink } from "react-router";
import { cn } from "~/lib/utils";
import { Logo } from "./";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import FaceIcon from "@mui/icons-material/Face";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { SvgIcon } from "@mui/material";

const NavItems = ({ handleClick }: { handleClick?: () => void }) => {
  const sidebarItems = [
    {
      icon: HomeOutlinedIcon,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: GroupOutlinedIcon,
      label: "用戶管理",
      href: "/users",
    },
    // {
    //   icon: "/assets/icons/users.svg",
    //   label: "商品管理",
    //   href: "/products",
    // },
  ];

  const user = {
    name: "Sharon",
    email: "sharon@gmail.com",
    // imageUrl: "/assets/images/david.webp",
    imageUrl: "",
  };

  return (
    <section className="flex flex-col px-6 h-full">
      <div className="pt-10">
        <Logo />
      </div>

      <div className="flex justify-between flex-col h-full">
        <nav className="flex flex-col gap-3.5 pt-9">
          {sidebarItems.map(({ icon, label, href }) => (
            <NavLink to={href} key={href}>
              {({ isActive }: { isActive: boolean }) => (
                <div
                  className={cn("group nav-item", {
                    "bg-primary-100 !text-white": isActive,
                  })}
                  onClick={handleClick}
                >
                  <SvgIcon component={icon} />
                  {label}
                </div>
              )}
            </NavLink>
          ))}
        </nav>

        <footer className="flex-center gap-2.5 pb-8">
          {user.imageUrl ? (
            <img
              className="size-10 rounded-full aspect-square"
              src={user.imageUrl}
              alt={user.name}
            />
          ) : (
            <FaceIcon className="text-gray-100" sx={{ fontSize: 40 }} />
          )}

          <article className="flex flex-col gap-[2px] max-w-[115px]">
            <h2 className="p-16-semibold text-dark-200 truncate">
              {user?.name}
            </h2>
            <p className="text-gray-100 text-xs md:text-sm font-normal truncate">
              {user?.email}
            </p>
          </article>

          <IconButton aria-label="logout" color="warning">
            <LogoutIcon />
          </IconButton>
        </footer>
      </div>
    </section>
  );
};

export default NavItems;
