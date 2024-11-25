import UserItem from "./UserItem";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const getData = async ({ queryKey }) => {
  const page = queryKey[1];
  const response = await axios.get(`http://localhost:5000/Users?_page=${page}&_per_page=6`);
  return response.data.data; // Adjust based on your API response structure
};

function Users({ onUserSelect }) {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);

  // Fetch Users
  const { data: users, isFetching, error } = useQuery({
    queryKey: ["users", page],
    queryFn: getData,
    keepPreviousData: true,
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (userId) => axios.delete(`http://localhost:5000/Users/${userId}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["users", page]);
    },
  });

  const handleDelete = (userId) => {
    deleteMutation.mutate(userId);
  };

  if (isFetching) return <div>Data is Loading...</div>;
  if (error) return <div>Something went wrong: {error?.message}</div>;

  // Placeholder total pages; replace this with API response if available
  const totalPages = 5;

  return (
    <div className="col-span-6 border-2 p-4">
      <h1 className="text-xl font-semibold mb-4">All Users</h1>
      <div className="grid grid-cols-2 gap-4">
        {users &&
          users.map((user) => (
            <UserItem
              key={user.id}
              user={user}
              onViewDetails={onUserSelect}
              onDelete={handleDelete}
            />
          ))}
      </div>
      {/* Pagination */}
      <div className="mt-4 flex justify-between items-center">
        {/* Previous Button */}
        <button
          className={`px-3 py-1 ${page === 1 ? "hidden" : "bg-blue-400 hover:bg-blue-600 rounded"} `}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>

        {/* <span className="text-gray-600">Page: {page}</span> */}

        {/* Next Button */}
        <button
          className={`px-3 py-1 ${page === totalPages ? "hidden" : "bg-blue-400 hover:bg-blue-600 rounded ml-auto"} `}
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Users;
