import { Outlet, redirect } from "react-router";
import { NavItems, MobileSidebar } from "../../../components";
import { getCurrentUser } from "~/firebase/auth";

export async function clientLoader() {
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return redirect("/sign-in");
  }
  return currentUser;
}

const AdminLayout = () => {
  return (
    <div className="flex flex-col lg:flex-row h-screen w-full">
      <MobileSidebar />
      <aside className="w-full max-w-[270px] hidden lg:block">
        <NavItems />
      </aside>
      <aside className="w-full h-full overflow-auto bg-light-100 pt-40 lg:pt-10">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
