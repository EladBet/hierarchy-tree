import React, { useState } from "react";
import { encode, fetchData, url } from "./utils";

function Login({ login }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isLoginLoading, setIsLoginLoading] = useState(false);

  const onSubmit = async () => {
    setIsLoginLoading(true);

    try {
      const code = encode(email, password);
      setIsLoginLoading(true);
      const response = await fetchData(`${url}/secrets/${code}.json`);
      if (response) {
        const users = await fetchData(`${url}/users.json`);
        const userIndex = users.findIndex((user) => user.id === response);

        const userInfo = await fetchData(`${url}/users/${userIndex}.json`);

        login(userInfo);
      } else {
        setError("Error Signing in");
      }
    } catch (error) {
      setError("Error Signing in");
    } finally {
      setIsLoginLoading(false);
    }
  };

  return (
    <div className="login border shadow p-3">
      <h4 className="w-50 m-0 pl-2 my-4">Please login</h4>
      <form
        onSubmit={(e) => {
          onSubmit();
          e.preventDefault();
        }}
      >
        <div className="border p-3">
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Email Address:</label>
            <div className="col-sm-8">
              <input
                placeholder="Email"
                className="form-control mb-3"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col-sm-4 col-form-label">Password:</label>
            <div className="col-sm-8">
              <input
                placeholder="Password"
                type="password"
                className="form-control"
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="mb-3">
              <span className="text-danger">{error}</span>
            </div>
          )}
          <div className="d-flex justify-content-end py-2">
            <button
              disabled={!email || !password || isLoginLoading}
              type="submit"
              className="btn btn-primary"
            >
              {isLoginLoading && (
                <span className="spinner-border spinner-border-sm" />
              )}
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
