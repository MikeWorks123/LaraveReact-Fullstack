import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";

export default function UserLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();


  if (!token) {
    return <Navigate to="/login"/>
  }
  // else{
  //     if (user && user.role === "user") {
  //       return <Navigate to="/feed" />;
  //     } else {
  //       return <Navigate to="/login" />;
  //     }
  // }

  const onLogout = ev => {
    ev.preventDefault()

    axiosClient.post('/logout')
      .then(() => {
        setUser({})
        setToken(null)
      })
  }

  return (
    <div id="guestLayout">
      <div className="content">
        <header>
          <div className="align-line">
            Welcome &nbsp;
          </div>

          <div className="align-yes">
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  );
}
