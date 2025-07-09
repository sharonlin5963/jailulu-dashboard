import { NavLink, useLoaderData, useNavigate } from "react-router";
import { cn } from "~/lib/utils";
import { Logo } from "./";
import { IconButton } from "@mui/material";
import {
  Logout,
  Face,
  HomeOutlined,
  GroupOutlined,
  CategoryOutlined,
} from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { auth } from "~/firebase/config";
import { signOut } from "firebase/auth";
import { useState } from "react";

const NavItems = ({ handleClick }: { handleClick?: () => void }) => {
  const sidebarItems = [
    {
      icon: HomeOutlined,
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: GroupOutlined,
      label: "用戶管理",
      href: "/all-users",
    },
    {
      icon: CategoryOutlined,
      label: "商品管理",
      href: "/products",
    },
  ];

  const user = useLoaderData();
  const navigator = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

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
            <Face className="text-gray-100" sx={{ fontSize: 40 }} />
          )}

          <article className="flex flex-col gap-[2px] max-w-[115px]">
            <h2 className="p-16-semibold text-dark-200 truncate">
              {user?.name || user?.email}
            </h2>
            <p className="text-gray-100 text-xs md:text-sm font-normal truncate">
              {user?.email}
            </p>
          </article>

          <IconButton
            aria-label="logout"
            color="warning"
            onClick={handleLogout}
            loading={isLoading}
          >
            <Logout />
          </IconButton>
        </footer>
      </div>
    </section>
  );
};

export default NavItems;
