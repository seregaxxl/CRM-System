import axiosInstance from "./axiosInstance";
import { LoginData, UserData } from "../types/authTypes";
import { useRouter } from 'vue-router';
import { useSessionStore } from "../stores/sessionStore";

const PREFIX_AUTH = '/auth'
const PREFIX_USR = '/user'
const router = useRouter()

const authModule = (() => {
  let accessToken: string | null = null;

  return {
    setAccessToken(token: string | null) {
      accessToken = token;
    },
    getAccessToken() {
      return accessToken;
    },
  };
})();

export default authModule;

axiosInstance.interceptors.request.use(config => {
  const token = authModule.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => response,
  error => {
    const status = error.response ? error.response.status : null;
    if (status === 401) {
      const sessionStore = useSessionStore()
      router.push({ name: 'Login' });
      sessionStore.failedAuthentication();
    }
    return Promise.reject(error);
  }
);

export async function signIn(loginData: LoginData) {
  try {
    const res = await axiosInstance.post(`${PREFIX_AUTH}/signin`, loginData);
    authModule.setAccessToken(res.data.accessToken);
    const sessionStore = useSessionStore()
    sessionStore.authentication()
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function signOut() {
  const token = authModule.getAccessToken();
  if (!token) {
    throw new Error('No access token available');
  }
  try {
    await axiosInstance.post(
      `${PREFIX_USR}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    sessionStorage.removeItem('refreshToken');
    authModule.setAccessToken(null);
    return true;
  } catch (error) {
    throw error;
  }
}

export async function signUp(userData: UserData) {
  try {
    const res = await axiosInstance.post(`${PREFIX_AUTH}/signup`, userData);
    return res;
  } catch (error: any) {
    throw error;
  }
}

export async function refreshAccessToken(refreshToken: string | null) {
  try {
    const res = await axiosInstance.post(`${PREFIX_AUTH}/refresh`, { refreshToken });
    authModule.setAccessToken(res.data.accessToken);
    sessionStorage['refreshToken'] = res.data.refreshToken;
    return res.data;
  } catch (error) {
    throw error;
  }
}

export async function refreshProfile() {
  try {
    const res = await axiosInstance.get(`${PREFIX_USR}/profile`);
    return res;
  } catch (error: any) {
    throw error;
  }
}



// const authModule = (() => {
//   let accessToken: string | null = null;

  
//   return {
//     async signIn(loginData: LoginData) {
//       try {
//         const res = await axiosInstance.post(`${PREFIX_AUTH}/signin`, loginData);
//         accessToken = res.data.accessToken;
//         return res.data;
//       } catch (error) {
//         throw error;
//       }
//     },
//     async signOut() {
//       if (!accessToken) {
//         throw new Error('No access token available');
//       }
//       try {
//         await axiosInstance.post(
//           `${PREFIX_USR}/logout`,
//           {},
//           {
//             headers: {
//               Authorization: `Bearer ${accessToken}`,
//             },
//           }
//         );
//         sessionStorage.removeItem('refreshToken');
//         accessToken = null; 
//         return true;
//       } catch (error) {
//         throw error;
//       }
//     },
//     async  signUp (userData: UserData) {
//         try {
//             const res = await axiosInstance.post(`${PREFIX_AUTH}/signup`, userData);
//             return res
//         } catch (error: any) {
//             throw error
//         }
//     },
//     async refreshAccessToken(refreshToken: string | null) {
//       try {
//         const res = await axiosInstance.post(`${PREFIX_AUTH}/refresh`, { refreshToken });
//         accessToken = res.data.accessToken; 
//         sessionStorage['refreshToken'] = res.data.refreshToken;
//         return res.data;
//       } catch (error) {
//         throw error;
//       }
//     },
//     async refreshProfile () {
//         try {
//             const res = await axiosInstance.get(`${PREFIX_USR}/profile`);
//             return res
//         } catch (error: any) {
//             throw error
//         }
//     },
//     getAccessToken() {
//       return accessToken; 
//     },
//   };
// })();


