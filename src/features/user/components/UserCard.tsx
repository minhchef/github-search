type UserCardProps = {
  user: User;
  selectedUser: string;
  handleUserClick: (user: string) => void;
};

const UserCard = ({ user, selectedUser, handleUserClick } : UserCardProps) => {
  return (
    <div
      onClick={() => handleUserClick(user.login)}
      className={`flex flex-col gap-2 items-center justify-center cursor-pointer ${
        selectedUser === user.login ? "bg-blue-100 text-blue-500" : ""
      }`}
    >
      <div className="w-[80px] h-[80px] shadow-md">
        <img src={user.avatarUrl} alt={user.login} className="w-full h-full object-cover" />
      </div>
      <h2 className="font-bold text-center">{user.login}</h2>
    </div>
  );
};

export default UserCard;
