import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const Layout = () => {
  return (
    <>
      <div className="sm:flex flex-none">
        <div>
          <Sidebar />
        </div>
        <div className="sm:flex-1">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Layout;
