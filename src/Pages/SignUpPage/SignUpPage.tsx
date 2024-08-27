import { useState, ChangeEvent, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../services/auth.service";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function SignupPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePassword = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
  const handleName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value);

  const handleSignupSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requestBody = { email, password, name };

    setIsLoading(true);
    
    authService
      .signup(requestBody)
      .then((response) => {
        console.log(response);
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    
      <div className="SignupPage flex flex-col items-center justify-center min-h-screen space-y-4">
        <ToastContainer />
        <h1 className="text-2xl font-bold mb-4">Create new user</h1>
  
        <form
          onSubmit={handleSignupSubmit}
          className="flex flex-col items-center space-y-4"
        >
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70"
            >
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleName}
              className="grow"
              placeholder="Username"
            />
          </label>
  
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
  
          {/* <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleName} /> */}
  
          <button type="submit" className="btn btn-outline btn-primary" disabled={isLoading}>
          {isLoading ? "Signing up..." : "Sign up"}
          </button>
        </form>
  
        {errorMessage && <p className="error-message">{errorMessage}</p>}
  
        <p>Already have account?</p>
        <Link className="btn btn-sm btn-outline btn-neutral" to={"/login"} > Login</Link>
      </div>
  );
}

export default SignupPage;