import { useContext } from "react";
import { AppContext } from "./context";
import { setUserInfo } from "./auth-service";

export default function TopBar() {
  const user = useContext(AppContext);

  function logout() {
    setUserInfo(null);
    location.reload();
  }
  return (
    <div className="d-flex justify-content-end p-2">
      <div className="px-2">
        {user.firstName} {user.lastName}
      </div>
      (
      <span className="logout" onClick={logout}>
        logout
      </span>
      )
    </div>
  );
}
