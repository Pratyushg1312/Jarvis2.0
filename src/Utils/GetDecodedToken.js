import { jwtDecode } from "jwt-decode";

const GetDecodedToken = () => {
  const token = sessionStorage.getItem("token");
  if (token) {
    try {
      return jwtDecode(token);
    } catch (error) {
      console.error("Invalid token:", error);
      return null;
    }
  }
  return null;
};

export default GetDecodedToken;
