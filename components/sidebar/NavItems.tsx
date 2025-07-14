import { NavLink, useLoaderData, useNavigate } from "react-router";
import { cn } from "~/lib/utils";
import { Logo } from "..";
import { Button, IconButton } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import FaceIcon from "@mui/icons-material/Face";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { SvgIcon } from "@mui/material";
import { auth } from "~/firebase/config";
import { signOut } from "firebase/auth";
import { useState } from "react";
import EditProfileDialog from "./EditProfileDialog";

const NavItems = ({ handleClick }: { handleClick?: () => void }) => {
  const sidebarItems = [
    {
      icon: HomeOutlinedIcon,
      label: "首頁",
      href: "/",
    },
    {
      icon: GroupOutlinedIcon,
      label: "會員管理",
      href: "/all-users",
    },
    {
      icon: CategoryOutlinedIcon,
      label: "商品管理",
      href: "/products",
    },
  ];

  const user = useLoaderData();
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const handleLogout = async () => {
    try {
      setIsLoading(true);
      await signOut(auth);
      navigator("/sign-in");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
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

          <footer className="flex gap-3 pb-8">
            <Button
              variant="text"
              className="flex gap-2.5"
              onClick={() => setEditOpen(true)}
            >
              {user.photoURL ? (
                <img
                  className="size-10 rounded-full aspect-square"
                  src={user.photoURL}
                  alt={user.displayName}
                />
              ) : (
                <FaceIcon className="text-gray-100" sx={{ fontSize: 40 }} />
              )}

              <article className="text-left flex flex-col gap-1 max-w-[115px]">
                <h2 className="p-16-semibold text-dark-200 truncate">
                  {user?.displayName || user?.email}
                </h2>
                <p className="text-gray-100 text-xs md:text-sm font-normal truncate">
                  {user?.email}
                </p>
              </article>
            </Button>

            <IconButton
              aria-label="logout"
              color="warning"
              onClick={handleLogout}
              loading={isLoading}
            >
              <LogoutIcon />
            </IconButton>
          </footer>
        </div>
      </section>

      <EditProfileDialog open={editOpen} onClose={() => setEditOpen(false)} />
    </>
  );
};

export default NavItems;
