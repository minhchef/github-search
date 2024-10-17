import UserCard from "./UserCard";

type UserListProps = {
  users: User[];
  selectedUser: string;
  handleUserClick: (user: string) => void;
};

const UserList = ({ users, selectedUser, handleUserClick } : UserListProps) => {
  return (
    <div className="w-full md:w-[50%] mt-12">
      <h1 className="font-bold text-xl mb-5">Users :</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard key={user.login} user={user} selectedUser={selectedUser} handleUserClick={handleUserClick} />
        ))}
      </div>
    </div>
  );
};

export default UserList;
