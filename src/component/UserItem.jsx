function UserItem({ user, onViewDetails, onDelete }) {
  return (
    <div className="bg-slate-200 text-center p-3">
      <h1>{user.name}</h1>
      <p>{user.username}</p>
      <p className="text-red-500">{user.email}</p>
      <div className="my-3">
      <button
        className="px-3 py-1 bg-blue-400 hover:bg-blue-600"
        onClick={() => onViewDetails(user.id)}
      >
        View Details
      </button>
      <button
        className="px-3 py-1 bg-red-400 ml-5"
        onClick={() => onDelete(user.id)}
      >
        Delete
      </button>
      </div>
    </div>
  );
}

export default UserItem;
