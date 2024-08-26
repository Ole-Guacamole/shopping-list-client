// auth.service.ts
import axios, { AxiosInstance, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { User } from '../types'; // Import User interface

interface LoginRequestBody {
  email: string;
  password: string;
}

interface SignupRequestBody {
  email: string;
  password: string;
  username: string;
}

class AuthService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: import.meta.env.VITE_SERVER_URL || "http://localhost:5005",
    });

    this.api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
      const storedToken = localStorage.getItem("authToken");

      if (storedToken) {
        config.headers.set('Authorization', `Bearer ${storedToken}`);
      }

      return config;
    });
  }

  login = (requestBody: LoginRequestBody): Promise<AxiosResponse> => {
    return this.api.post("/auth/login", requestBody);
  };

  signup = (requestBody: SignupRequestBody): Promise<AxiosResponse> => {
    return this.api.post("/auth/signup", requestBody);
  };

  verify = (): Promise<AxiosResponse<User>> => { // Use User interface
    return this.api.get("/auth/verify");
  };
}

const authService = new AuthService();

export default authService;