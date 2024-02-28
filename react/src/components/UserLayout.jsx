import {Navigate, Outlet} from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";

export default function UserLayout() {
  const { user, token } = useStateContext();

  if (token) {
    return <Navigate to="/" />;
  }

  return (
    <div id="userLayout">
      <Outlet />
    </div>
  );
}