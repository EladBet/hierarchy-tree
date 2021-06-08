import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import Login from "./Login";
import { AppContext } from "./context";
import { setUserInfo, getUserInfo } from "./auth-service";
import App from "./App";

function Root() {
  const data = getUserInfo();
  const [user, setUser] = useState(data);

  function login(user) {
    setUserInfo(user);
    setUser(user);
  }

  return user && user.id !== -1 ? (
    <AppContext.Provider value={user}>
      <App />
    </AppContext.Provider>
  ) : (
    <Login login={login} />
  );
}

ReactDOM.render(<Root />, document.getElementById("root"));
