import React from "react";

const config = {
  email: "",
  firstName: "",
  id: -1,
  lastName: "",
  password: "",
  photo: ""
};

export const AppContext = React.createContext(config);
