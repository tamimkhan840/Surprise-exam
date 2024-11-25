import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

function CreateUsers() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (variables) => {
      return axios.post("http://localhost:4000/Users", variables);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newData = Object.fromEntries(formData);

    mutation.mutate({
      ...newData,
      id: crypto.randomUUID(),
    });
    e.target.reset();
  };

  return (
    <div className="col-span-3 border-2 p-3">
      <h1 className="text-center text-3xl font-semibold mb-3">Create A New User</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="my-5">
          <label
            htmlFor="name"
            className="block mb-2 text-sm text-center font-semibold  text-gray-900"
          >
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border-2 p-2 w-full rounded-lg"
            placeholder="Your Name"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm text-center font-semibold  text-gray-900"
          >
            Your Email
          </label>
          <input
            type="text"
            id="email"
            name="email"
            className="border-2 p-2 w-full rounded-lg"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="profession"
            className="block mb-2 text-sm text-center font-semibold  text-gray-900"
          >
            Your Profession
          </label>
          <input
            type="text"
            id="profession"
            name="profession"
            className="border-2 p-2 w-full rounded-lg"
            placeholder="Your Profession"
          />
        </div>
        <button className="bg-blue-400 hover:bg-blue-600 px-3 rounded-md py-1" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default CreateUsers;
