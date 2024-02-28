import React, { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getUsers();
  }, [searchQuery]);

  const onDelete = (user) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        getUsers();
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  const getUsers = () => {
    setLoading(true);

    // If there is no search query, reset the user list
    if (!searchQuery) {
      setUsers([]);
      setLoading(false);
      return;
    }

    axiosClient.get('/users', {
      params: { search: searchQuery },
    })
    .then(({ data }) => {
      setLoading(false);
      setUsers(data.data);
    })
    .catch(() => {
      setLoading(false);
    });
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    getUsers();
  };

  return (
    <div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
            {/* Search Bar */}
            <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                <input
                type="text"
                placeholder="Search by ID, Name, or Email"
                value={searchQuery}
                onChange={handleSearchChange}
                style={{ height: '30px' }}
                />
                &nbsp;
                <button type="submit" className="btn-delete">
                Search
                </button>
            </form>
        </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        <br></br><h1>Users</h1>
        <Link to="/users/new" className="btn-delete">Add New</Link>
      </div>

      <div className="card animated fadeInDown">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Create Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading && (
            <tbody>
              <tr>
                <td colSpan="5" className="text-center">
                  Loading...
                </td>
              </tr>
            </tbody>
          )}
          {!loading && (
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.created_at}</td>
                  <td>
                    <Link className="btn-edit" to={`/users/${u.id}`}>
                      Edit
                    </Link>
                    &nbsp;
                    <button onClick={() => onDelete(u)} className="btn-delete">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}
