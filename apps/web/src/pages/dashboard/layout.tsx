import { Navigate, Outlet } from "react-router";
import { CircleUserRound } from "lucide-react";
import UserMenu from "../../ui/UserMenu";
import useAuth from "../../hooks/auth";
import type { PropsWithChildren } from "react";
import PageLoader from "../../ui/Pageloader";

function ProtectedRoute({ children }: PropsWithChildren) {
  const { user, isFetchingUser } = useAuth();
  if (isFetchingUser) return <PageLoader></PageLoader>;
  if (!user) return <Navigate to="/login" replace />;
  console.log(user);
  return children;
}

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
export { ProtectedRoute };
export default AppLayout;
