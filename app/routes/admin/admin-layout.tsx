import { Outlet } from "react-router";

const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      MBSidebar
      <aside className="w-full max-w-[270px] hidden lg:block">sidebar</aside>
      <aside className="w-full h-full bg-light-200 pt-12 lg:pt-10">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
