import {  Outlet, } from "react-router";
import "./App.css";

function App() {
  return ( 
    <main className="bg-image w-full h-screen ">
      <Outlet></Outlet>
    </main>
  );
}

export default App;
