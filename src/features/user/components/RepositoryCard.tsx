type RepositoryCardProps = {
  repository: Repository;
  handleRepositoryClick: (repository: Repository) => void;
};

const RepositoryCard= ({ repository, handleRepositoryClick } : RepositoryCardProps) => {
  return (
    <button className="flex justify-between cursor-pointer" onClick={() => handleRepositoryClick(repository)}>
      <div>{repository.name}</div>
      <div>{`${repository.stargazerCount} stars / ${repository.watchers.totalCount} watching`}</div>
    </button>
  );
};

export default RepositoryCard;
