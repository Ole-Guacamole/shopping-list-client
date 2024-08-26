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
        console.log("Login response data:", response.data); // Log the entire response data
        storeToken(response.data.token);
        console.log(response.data.token);
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
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLoginSubmit}>
        <label>
          Email:
          <input type="email" value={email} onChange={handleEmail} required />
        </label>
        <label>
          Password:
          <input type="password" value={password} onChange={handlePassword} required />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>
      {errorMessage && <p>{errorMessage}</p>}
      <Link to="/signup">Don't have an account? Sign up</Link>
    </div>
  );
}

export default LoginPage;