// Inside your React component
import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function GuestLayout() {
  const { user, token } = useStateContext();

  if (token) {
    if (user && user.role === "admin") {
      return <Navigate to="/admin-dashboard-authenticated" />;
    } else {
      return <Navigate to="/feed" />;
    }
  }

  return (
    <div id="guestLayout">
      <div className="content">
        <header>
          <div className="align-line">
            Welcome &nbsp;
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
      </div>
    </div>
  );
}
