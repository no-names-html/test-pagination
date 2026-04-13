export interface userType {
  age: number;
  createdAt: string;
  email: string;
  id: number;
  name: string;
  role: "manager" | "user" | "admin";
}
