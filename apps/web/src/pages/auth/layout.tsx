import type { PropsWithChildren } from "react";
import { Navigate, Outlet } from "react-router";
import useAuth from "../../hooks/auth";
import PageLoader from "../../ui/Pageloader";
function PublicRoute({ children }: PropsWithChildren) {
  const { user, isFetchingUser } = useAuth();
  if (isFetchingUser) return <PageLoader />
  if (user && !isFetchingUser) return <Navigate to="/dashboard" replace />;
  return children;
}
function AuthLayout() {
  return (
    <main className="bg-image w-full h-screen ">
      <Outlet></Outlet>
    </main>
  );
}
export { PublicRoute };
export default AuthLayout;
