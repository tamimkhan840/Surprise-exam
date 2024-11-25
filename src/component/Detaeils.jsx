/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/rules-of-hooks */
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const getUserDetails = async (id) => {
  const response = await axios.get(`http://localhost:5000/Users/${id}`);
  return response.data;
};

function Details({ userId }) {
  if (!userId) {
    return <div className="col-span-3 text-red-400 text-center border-2 pt-5">No User View Details</div>;
  }

  const { data:user, error, isFetching } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserDetails(userId),
  });

  if (isFetching) return <div>Data is Loading...</div>;
  if (error) return <div>Something went wrong: {error.message}</div>;

  return (
    <div className="col-span-3 text-center border-2">
      <h2 className="my-4">User Details</h2>
      <div className="bg-slate-100 p-3">
        <hr />
        <h1>{user.name}</h1>
        <p>{user.username}</p>
        <p className="text-red-500">{user.email}</p>
        <hr />
      </div>
    </div>
  );
}

export default Details;
