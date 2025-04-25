interface User {
    uid: string;
    email: string | null;
    name?: string;
    role: "admin" | "customer";
  }
  