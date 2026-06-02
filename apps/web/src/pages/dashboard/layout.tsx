import { Outlet } from "react-router";
import { CircleUserRound } from "lucide-react";
import UserMenu from "../../ui/UserMenu";
function AppLayout() {
  return (
    <main className="bg-image w-full h-screen overflow-clip flex flex-col ">
      <nav className="w-full min-h-16 bg-navbar flex justify-end  px-10 items-center">
        <UserMenu />
      </nav>

      <Outlet></Outlet>
    </main>
  );
}

export default AppLayout;
