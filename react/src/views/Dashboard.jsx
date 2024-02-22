import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [registeredAccounts, setRegisteredAccounts] = useState(null);

  const fetchRegisteredAccounts = async () => {
    try {
      // Replace 'http://localhost:3000/users' with the actual endpoint to fetch registered accounts
      const response = await fetch('http://localhost:3000/users');
      const data = await response.json();
      setRegisteredAccounts(data);
    } catch (error) {
      console.error('Error fetching registered accounts:', error);
    }
  };

  // useEffect to trigger data fetching when the component mounts
  useEffect(() => {
    fetchRegisteredAccounts();
  }, []); // The empty dependency array ensures this effect runs only once on mount

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
              {registeredAccounts ? (
                <>
                  <h1 className="mt-1 mb-3">{registeredAccounts.total}</h1>
                  <div className="mb-0">
                    <span className="text-danger">
                      {' '}
                      <i className="mdi mdi-arrow-bottom-right"></i> -3.65%{' '}
                    </span>
                    <span className="text-muted">Since last week</span>
                  </div>
                </>
              ) : (
                <p>Loading registered account data...</p>
              )}
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
              <h1 className="mt-1 mb-3">14,212</h1>
              <div className="mb-0">
                <span className="text-success">
                  {' '}
                  <i className="mdi mdi-arrow-bottom-right"></i> 5.25%{' '}
                </span>
                <span className="text-muted">Since last week</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
