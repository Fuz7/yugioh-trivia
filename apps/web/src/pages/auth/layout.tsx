import { Outlet } from "react-router";

function AuthLayout() {
  return ( 
    <main className="bg-image w-full h-screen ">
      <Outlet></Outlet>
    </main>
  );
}

export default AuthLayout;