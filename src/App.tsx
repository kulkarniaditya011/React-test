import "./App.css";
import { useFetch } from "./hooks/useFetch";

// interface Client {
//   id: number;
//   firstName: string;
//   lastName: string;
//   phoneNumber: number;
//   email: string;
// }

function App() {
  const { data, loading, error } = useFetch(
    "http://localhost:8081/api/get"
  );

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: {error}</h2>;
  if (!data) return <h2>No data found.</h2>;

   return (
    <>
      <h1>Client Details</h1>
      {
        data?.data.map(item => {
          return (
            <>
                <p><strong>ID:</strong> {item?.id}</p>
                <p><strong>Name:</strong> {item?.firstName} {item?.lastName}</p>
                <p><strong>Email:</strong> {item?.email}</p>
                <p><strong>Phone:</strong> {item?.phoneNumber}</p>
            </>
          )
        })
      }

    </>
  );
}

export default App;
