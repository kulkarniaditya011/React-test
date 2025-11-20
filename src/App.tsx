import "./App.css";
import { useFetch } from "./hooks/useFetch";

interface User {
  id: number;
  name: string;
  email: string;
}

function App() {
  const { data, loading, error } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;

  return (
    <>
      <h1>Users List</h1>
      {data?.map((user) => (
        <p key={user.id}>
          {user.id}. {user.name} — {user.email}
        </p>
      ))}
    </>
  );
}

export default App;
