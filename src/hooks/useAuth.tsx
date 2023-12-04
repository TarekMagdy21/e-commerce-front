import { useSelector } from "react-redux";
import { selectCurrentToken } from "../store/states/authSlice";
import { jwtDecode } from "jwt-decode";
const useAuth = () => {
  const token = useSelector(selectCurrentToken);
  if (token) {
    // @ts-ignore
    const decoded = jwtDecode(token);
    // @ts-ignore
    const { username, email } = decoded.UserInfo;
    return { username, email };
  }
  return { username: "", email: "" };
};
export default useAuth;
