import { Link, useNavigate } from "react-router-dom";
import { AuthContext, AuthContextType } from "../../context/auth.context";
import authService from "../../services/auth.service";
import { useState, useContext, ChangeEvent, FormEvent } from "react";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  
  const authContext = useContext<AuthContextType | undefined>(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is undefined. Ensure you are using AuthProvider.");
  }

  const { storeToken, authenticateUser } = authContext;

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleLoginSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic form validation
    if (!email || !password) {
      setErrorMessage("Please fill in both fields.");
      return;
    }

    const requestBody = { email, password };
    setIsLoading(true);

    authService
      .login(requestBody)
      .then((response) => {
        // console.log("Login response data:", response.data); // Log the entire response data
        storeToken(response.data.token);
        // console.log(response.data.token);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response?.data?.message || "An error occurred. Please try again.";
        setErrorMessage(errorDescription);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="LoginPage flex flex-col items-center justify-center min-h-screen space-y-4">
    <h1 className="text-2xl font-bold mb-4">Please log in:</h1>
    <form onSubmit={handleLoginSubmit} className="flex flex-col items-center space-y-4">
      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
          <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
        </svg>
        <input
          type="email"
          name="email"
          className="grow"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
        />
      </label>

      <label className="input input-bordered flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          className="h-4 w-4 opacity-70"
        >
          <path
            fillRule="evenodd"
            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
            clipRule="evenodd"
          />
        </svg>
        <input
          type="password"
          className="grow"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />
      </label>

      <button type="submit" className="btn btn-outline btn-primary" disabled={isLoading}>{isLoading ? "Logging in..." : "Login"}</button>
    </form>
    {errorMessage && <p className="error-message">{errorMessage}</p>}
      <Link to="/signup">Don't have an account? Sign up</Link>
    </div>
  );
}

export default LoginPage;