import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }
  // if(user.role !=='admin'){
  //   return <Navigate to="/feed"/>
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
    <div id="defaultLayout">
      <aside>
      <span class="align-middle">
        <strong class="center-text"><br></br>ToolKit</strong>
      </span><br></br><br></br>
        <Link to="/admin-dashboard-authenticated">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/data-statistics">Data Statistics</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/comments-list">Comments</Link>
        <Link to="/suggestions">Suggestions</Link>
      </aside>
      <div className="content">
        <header>
          <div className="align-line"><strong>
            Administrator </strong> &nbsp; Dashboard
          </div>

          <div className="align-yes">
            <strong>{user.name}</strong> &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#"><strong>Logout</strong></a>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  )
}