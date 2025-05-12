import axios from 'axios';

const generateNewToken = async () => {
    const refreshToken: object = {
      refreshToken: localStorage.getItem("refreshToken"),
    };
    try {
      const response = await axios.post(
        "http://localhost:8081/api/auth/public/refreshtoken",
        refreshToken
      );
      const data = await response.data;
      localStorage.setItem("accessToken", data.accessToken);
    } catch {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("email")
      window.location.reload()
    }
  };

  export const verifyAccessToken = async (token: string) => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/verifytoken",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      console.log(data);
    } catch (err) {
      await generateNewToken();
      window.location.reload()
    }
  };

// export const logout = async () => {
//     const email = localStorage.getItem("email");
//     const token:any = localStorage.getItem("accessToken");
//     try {
//         verifyAccessToken(token)
//       const response = await axios.get(
//         `http://localhost:8081/api/auth/private/logout/${email}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.data;
//       console.log("logout: ", data);

//       localStorage.removeItem("accessToken");
//       localStorage.removeItem("refreshToken");
//       localStorage.removeItem("email");
//       if (window.location.pathname === "/") window.location.reload();
//       else window.location.href = "/";
//     } catch (err) {
//       console.log("error: ", err);
//     }
//   };
export const logout = async () => {
  const email = localStorage.getItem("email");
  const token:any = localStorage.getItem("accessToken");
  const refreshToken = localStorage.getItem('refreshToken')
  // try {
      // verifyAccessToken(token)
    const response = await axios.post(
      `http://localhost:8081/api/auth/public/logout`,
      {refreshToken}
    );
    const data = await response.data;
    console.log("logout: ", data);

    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("email");
    localStorage.removeItem("userId");

    if (window.location.pathname === "/") window.location.reload();
    else window.location.href = "/";
  // } catch (err) {
  //   console.log("error: ", err);
  // }
};
