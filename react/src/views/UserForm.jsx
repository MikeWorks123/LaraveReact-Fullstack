import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../axios-client.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function UserForm() {
  const navigate = useNavigate();
  let { id } = useParams();
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setNotification } = useStateContext();
  const [showPassword, setShowPassword] = useState(false);

  if (id) {
    useEffect(() => {
      setLoading(true);
      axiosClient
        .get(`/users/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setUser(data);
        })
        .catch(() => {
          setLoading(false);
        });
    }, []);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (user.id) {
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(() => {
          setNotification("User was successfully updated");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosClient
        .post("/users", user)
        .then(() => {
          setNotification("User was successfully created");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {user.id && <h1>Update User: {user.name}</h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              value={user.name}
              onChange={(ev) => setUser({ ...user, name: ev.target.value })}
              placeholder="Name"
            />
            <input
              value={user.email}
              onChange={(ev) => setUser({ ...user, email: ev.target.value })}
              placeholder="Email"
            />
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={user.password}
                onChange={(ev) =>
                  setUser({ ...user, password: ev.target.value })
                }
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "flex",
                  top: "50%",
                  right: "10px",
                  transform: "translateY(-50%)",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              value={user.password_confirmation}
              onChange={(ev) =>
                setUser({
                  ...user,
                  password_confirmation: ev.target.value,
                })
              }
              placeholder="Password Confirmation"
            />
            <button className="btn">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
