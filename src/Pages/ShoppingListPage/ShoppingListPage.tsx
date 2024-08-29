import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";
import { User } from "../../types";

interface Item {
  id: string;
  name: string;
  quantity?: string; // Optional field
  shoppingListId: string;
}

interface ShoppingListData {
  id: string;
  name: string;
  items: Item[];
}

const ShoppingListPage: React.FC = () => {
  const { shoppingListId } = useParams<{ shoppingListId: string }>();
  const [shoppingList, setShoppingList] = useState<ShoppingListData | null>(
    null
  );
  const [newItem, setNewItem] = useState(""); // State for new item input
  const [users, setUsers] = useState<User[]>([]); // State for users
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null); // State for selected user
  const [selectedUnshareUserId, setSelectedUnshareUserId] = useState<
    string | null
  >(null); // State for selected user to unshare
  const [sharedUsers, setSharedUsers] = useState<User[]>([]); // State for shared users
  const authContext = useContext(AuthContext); // Get AuthContext
  const currentUser = authContext?.user; // Get current user from AuthContext
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      console.error("Current user is not defined");
      return;
    }

    const fetchShoppingList = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/shopping-lists/${shoppingListId}`
        );
        setShoppingList(response.data);
      } catch (error) {
        console.error("Error fetching shopping list:", error);
      }
    };

    const fetchUsersAndSharedUsers = async () => {
      try {
        const [usersResponse, sharedUsersResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_SERVER_URL}/users`),
          axios.get(
            `${
              import.meta.env.VITE_SERVER_URL
            }/shopping-lists/${shoppingListId}/shared-users`
          ),
        ]);

        const allUsers = usersResponse.data;
        const sharedUsers = sharedUsersResponse.data;

        // Filter out the current user and shared users
        const filteredUsers = allUsers.filter(
          (user: User) =>
            user.id !== currentUser.id &&
            !sharedUsers.some((sharedUser: User) => sharedUser.id === user.id)
        );

        setUsers(filteredUsers);
        setSharedUsers(sharedUsers);
      } catch (error) {
        console.error("Error fetching users or shared users:", error);
      }
    };

    fetchShoppingList();
    fetchUsersAndSharedUsers();
  }, [shoppingListId, currentUser]);

  const handleAddItem = async () => {
    if (!newItem.trim()) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/items`,
        {
          name: newItem,
          shoppingListId: shoppingListId,
        }
      );

      const addedItem = response.data;

      // Update the shopping list with the new item
      setShoppingList((prevList) => {
        if (!prevList) return null;
        return {
          ...prevList,
          items: [...prevList.items, addedItem],
        };
      });

      setNewItem(""); // Clear the input field
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const handleDeleteItem = async (itemId: string) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/items/${itemId}`);

      // Update the shopping list by removing the deleted item
      setShoppingList((prevList) => {
        if (!prevList) return null;
        return {
          ...prevList,
          items: prevList.items.filter((item) => item.id !== itemId),
        };
      });
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  const handleShareShoppingList = async () => {
    if (!selectedUserId) return;

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/user-shopping-list-links`,
        {
          userId: selectedUserId,
          shoppingListId,
        }
      );
      console.log("Shopping list shared successfully:", response.data);

      // Refetch users and shared users after sharing the shopping list
      fetchUsersAndSharedUsers();
    } catch (error) {
      console.error("Error sharing shopping list:", error);
    }
  };

  const handleUnshareShoppingList = async () => {
    if (!selectedUnshareUserId) return;
  
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/user-shopping-list-links/${selectedUnshareUserId}/${shoppingListId}`
      );
      console.log("Shopping list unshared successfully");
  
      // Refetch users and shared users after unsharing the shopping list
      fetchUsersAndSharedUsers();
    } catch (error) {
      console.error("Error unsharing shopping list:", error);
    }
  };

  const handleDeleteList = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this list?");
    if (!confirmed) return;
  
    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/shopping-lists/${shoppingListId}`
      );
      navigate('/'); // Navigate back to the home page after deletion
    } catch (error) {
      console.error("Error deleting shopping list:", error);
    }
  };

  const fetchUsersAndSharedUsers = async () => {
    if (!currentUser) return; // Add type guard here

    try {
      const [usersResponse, sharedUsersResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_SERVER_URL}/users`),
        axios.get(
          `${
            import.meta.env.VITE_SERVER_URL
          }/shopping-lists/${shoppingListId}/shared-users`
        ),
      ]);

      const allUsers = usersResponse.data;
      const sharedUsers = sharedUsersResponse.data;

      // Filter out the current user and shared users
      const filteredUsers = allUsers.filter(
        (user: User) =>
          user.id !== currentUser.id &&
          !sharedUsers.some((sharedUser: User) => sharedUser.id === user.id)
      );

      setUsers(filteredUsers);
      setSharedUsers(sharedUsers);
    } catch (error) {
      console.error("Error fetching users or shared users:", error);
    }
  };

  if (!shoppingList) {
    return <div>Loading...</div>;
  }

  return (
    <div className="px-4 pb-4">
    <div className="card prose py-4 px-5 m- w-full bg-base-200">
      <h2 className="w-full text-center">{shoppingList.name}</h2>
      <div>
        {shoppingList.items.map((item) => (
          <div
            key={item.id}
            className="my-2 join place-items-center w-full text-left"
          >
            <div className="input input-bordered input-neutral w-full join-item flex items-center justify-start">
              {item.name}{" "}
              {/* {item.quantity && `- Quantity: ${item.quantity}`} */}
            </div>
            <button
              className="btn join-item btn-neutral"
              onClick={() => handleDeleteItem(item.id)}
            >
              DELETE ITEM
            </button>
          </div>
        ))}
      </div>
      <div className="join w-full my-2">
        <input
          className="input input-bordered input-primary w-full join-item"
          placeholder="Type here"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
        <button
          className="btn join-item btn-primary"
          onClick={handleAddItem}
        >
          ADD ITEM
        </button>
      </div>

      <div className="join w-full my-2 max-w-xs">
        <button
          className="btn join-item btn-neutral btn-sm"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
        <button
          className="btn join-item btn-error btn-sm"
          onClick={handleDeleteList}
        >
          Delete List
        </button>
      </div>

      <div className="flex w-full flex-col">
        <div className="divider">Sharing Options</div>
      </div>
      <div className="join w-full my-2">
        <select
          className="select select-bordered select-secondary w-full join-item"
          onChange={(e) => setSelectedUserId(e.target.value)}
        >
          <option disabled selected>
            Choose User
          </option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          className="btn join-item btn-secondary"
          onClick={handleShareShoppingList}
        >
          SHARE LIST
        </button>
      </div>

      <div className="join w-full my-2">
        <select
          className="select select-bordered select-secondary w-full join-item"
          onChange={(e) => setSelectedUnshareUserId(e.target.value)}
        >
          <option disabled selected>
            Choose User to Unshare
          </option>
          {sharedUsers.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>
        <button
          className="btn join-item btn-secondary"
          onClick={handleUnshareShoppingList}
        >
          UNSHARE LIST
        </button>
      </div>

      <div className="mt-4">
        <h3>Shared with:</h3>
        <div>
          {sharedUsers.map((user) => (
            <label key={user.id}>{user.name}</label>
          ))}
        </div>
      </div>
    </div>
    </div>
  );
};

export default ShoppingListPage;
