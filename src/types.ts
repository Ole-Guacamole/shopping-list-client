// types.ts
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: string;
    // Add other properties as needed
  }

  export interface ShoppingList {
    id: string;
    name: string;
    ownerId: string;
    createdAt: string;
  }