import React, { useState, useEffect } from 'react';
import axiosClient from '../axios-client';

const Dashboard = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRegisteredAccounts = async () => {
    try {
      setLoading(true);

      const response = await axiosClient.get('/users');
      setUsers(response.data.data);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching registered accounts:', error);
      setError('Error fetching data. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegisteredAccounts();
  }, []);

  const numberOfIds = (users ? users.map(u => u.id).length : 0);


  return (
    <div className="container-fluid p-0">
      <h1 className="h3 mb-3">
        <strong>Analytics</strong> Dashboard
      </h1>

      <div className="row">
        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title">Registered accounts</h5>
                </div>
                <div className="col-auto">
                  <div className="stat text-primary">
                    <i className="align-middle" data-feather="truck"></i>
                  </div>
                </div>
              </div>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <div>
                  <h1 className="mt-1 mb-3">{numberOfIds}</h1>
                  <div className="mb-0">
                    <span className="text-muted">Since last week</span>
                  </div>
                </div>
              )}
              {error && <p className="text-danger">{error}</p>}
            </div>
          </div>
        </div>

        <div className="col-sm-6">
          <div className="card">
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <h5 className="card-title">Visitors</h5>
                </div>
                <div className="col-auto">
                  <div className="stat text-primary">
                    <i className="align-middle" data-feather="users"></i>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
