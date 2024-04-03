import { Link, Navigate, Outlet } from "react-router-dom";
import { useStateContext } from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect, useState} from "react";

export default function UserLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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
      {/* <aside className={isSidebarOpen ? "open" : "closed"}> */}
      <aside>
        {/* Your sidebar content here */}
        <h1 className="align-middle">
          <strong className="center-text">
            <br></br>ToolKit
          </strong>
        </h1>
        <br></br>
        <br></br>
        <Link to="/feed">Home</Link>
        <Link to="/settings">Account Settings</Link>
        <Link to="/contacts">Lets Connect</Link>
        <Link to="/about-mike">About Mike</Link>
      </aside>
      <div className="content">
        <header>
          <div className="align-line">
          {/* <button className="toggle-btn" onClick={toggleSidebar}>
            Toggle Sidebar
          </button> */}
            <strong>Get Bashed</strong> &nbsp;
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