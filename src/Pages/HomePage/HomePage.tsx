import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext, AuthContextType } from "../../context/auth.context";
import { ShoppingList } from "../../types";

const HomePage: React.FC = () => {
  const authContext = useContext<AuthContextType | undefined>(AuthContext);
  const [shoppingLists, setShoppingLists] = useState<ShoppingList[]>([]);
  const [sharedShoppingLists, setSharedShoppingLists] = useState<ShoppingList[]>([]);
  const [newListName, setNewListName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchShoppingLists = async () => {
      try {
        if (authContext && authContext.user) {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/users/${authContext.user.id}/shopping-lists`
          );
          setShoppingLists(response.data);
        }
      } catch (error) {
        console.error("Error fetching shopping lists:", error);
      }
    };

    const fetchSharedShoppingLists = async () => {
      try {
        if (authContext && authContext.user) {
          const response = await axios.get(
            `${import.meta.env.VITE_SERVER_URL}/users/${authContext.user.id}/shared-shopping-lists`
          );
          setSharedShoppingLists(response.data);
        }
      } catch (error) {
        console.error("Error fetching shared shopping lists:", error);
      }
    };

    if (authContext && authContext.user) {
      fetchShoppingLists();
      fetchSharedShoppingLists();
    }
  }, [authContext]);

  const handleAddList = async () => {
    if (!authContext || !authContext.user) return;

    const ownerId = authContext.user.id;
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/shopping-lists`,
        {
          name: newListName,
          ownerId,
        }
      );

      if (response.status === 201) {
        const newList = response.data;
        setShoppingLists([...shoppingLists, newList]);
        setNewListName(""); // Clear the input field
        navigate(`/shopping-list/${newList.id}`); // Navigate to the new list's page
      } else {
        console.error("Failed to create new shopping list");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!authContext || !authContext.user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="prose card p-2 w-full text-center">
      <div className="prose card bg-base-200 p-4 w-full text-center">
        <h1>Welcome to Shopping List</h1>
        <h2>My Shopping Lists</h2>
        <div>
          {shoppingLists.map((list) => (
            <p key={list.id}>
              <Link to={`/shopping-list/${list.id}`}>{list.name}</Link>
            </p>
          ))}
        </div>
        <h2>Shared Shopping Lists</h2>

        <div>
          {sharedShoppingLists.map((list) => (
            <p key={list.id}>
              <Link to={`/shopping-list/${list.id}`}>{list.name}</Link>
            </p>
          ))}
        </div>

        <div className="join w-full my-2 max-w-xs">
          <input
            className="input input-bordered input-primary w-full join-item"
            placeholder="Type name here"
            value={newListName}
            onChange={(e) => setNewListName(e.target.value)}
          />
          <button className="btn join-item btn-primary" onClick={handleAddList}>
            Create New List
          </button>
        </div>
        <p>Don't have an account?</p>
        <button className="btn btn-secondary">
          <Link to="/signup">Sign up here</Link>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
