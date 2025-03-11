import axios from 'axios';

export const logout = async () => {
    const email = localStorage.getItem("email");
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get(
        `http://localhost:8081/api/auth/private/logout/${email}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      console.log("logout: ", data);

      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email");
      if (window.location.pathname === "/") window.location.reload();
      else window.location.href = "/";
    } catch (err) {
      console.log("error: ", err);
    }
  };
