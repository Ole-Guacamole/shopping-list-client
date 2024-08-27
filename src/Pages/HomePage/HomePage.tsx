import { Link } from "react-router-dom";




const HomePage = () => {
  return (
    <div>
      <h1>Welcome to the Home Page</h1>

      <h2>My Shopping Lists</h2>

      <h2>Shared Shopping Lists</h2>

      <h2>Create new Shopping List</h2>

      <p>
        Don't have an account? 
      </p>
      <button className="inline-block cursor-pointer rounded-md bg-gray-800 px-4 py-3 text-center text-sm font-semibold uppercase text-white transition duration-200 ease-in-out hover:bg-gray-900">
      <Link to="/signup">Sign up here</Link>
      </button>
    </div>
  );
};

export default HomePage;
