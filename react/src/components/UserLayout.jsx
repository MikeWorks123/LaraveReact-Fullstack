import { Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

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

  // show user data
  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <div id="guestLayout">
      <div className="content">
        <header>
          <div className="align-line">
            <strong>Bashed.com</strong> &nbsp;
          </div>

          <div className="align-yes">
            <strong>{user.name}</strong> &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#"><strong>Logout</strong></a>
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
