import {Link, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();

  if (!token) {
    return <Navigate to="/login"/>
  }

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
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/users">Users</Link>
        <Link to="/">Data Statistics</Link>
        <Link to="/">Profile</Link>
        <Link to="/">Comments</Link>
        <Link to="/">Suggestions</Link>
      </aside>
      <div className="content">
        <header>
          <div className="align-line"><strong>
            Administrator </strong> &nbsp; Dashboard
          </div>

          <div className="align-yes">
            {user.name} &nbsp; &nbsp;
            <a onClick={onLogout} className="btn-logout" href="#">Logout</a>
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