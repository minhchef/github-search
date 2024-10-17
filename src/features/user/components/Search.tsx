import React, { useState } from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useSearchUsers } from "@features/hooks/useSearchUsers";
import { useRepositories } from "@features/hooks/useRepositories";
import { useIssues } from "@features/hooks/useIssues";
import UserList from "./UserList";
import RepositoryList from "./RepositoryList";
import IssueList from "./IssueList";
import AddIssue from "./AddIssue";
import ErrorMessage from "./ErrorMessage";
import SuccessMessage from "./SuccessMessage";

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRepository, setSelectedRepository] =
    useState<Repository | null>(null);

  const { users, loading, isPending, search } = useSearchUsers();
  const {
    repositories,
    fetchRepositories,
    totalRepositories,
    endReposCursor,
    setReposPage,
    reposPage,
  } = useRepositories();

  const {
    issues,
    fetchIssues,
    totalIssue,
    endIssueCursor,
    issuePage,
    setIssuePage,
    setAddNew,
    addNew,
    onSubmit,
    errorMessage,
    isSuccess,
  } = useIssues();

  const handleSearch = () => {
    search(searchTerm);
    setSelectedRepository(null);
  };

  const handleUserClick = (userLogin: string) => {
    setSelectedRepository(null);
    setSelectedUser(userLogin);
    fetchRepositories(userLogin, 5, endReposCursor);
  };

  const handleRepositoryClick = (repository: Repository) => {
    setSelectedRepository(repository);
    fetchIssues(selectedUser, repository.name, 5, endIssueCursor);
  };

  const handleIssuePageChange = (page: number) => {
    setIssuePage(page);
    if (selectedRepository) {
      fetchIssues(
        selectedUser,
        selectedRepository.name,
        5,
        page === 1 ? null : endIssueCursor
      );
    }
  };

  const handleReposPageChange = (page: number) => {
    setReposPage(page);
    fetchRepositories(selectedUser, 5, page === 1 ? null : endReposCursor);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="p-4 md:p-10 w-full flex flex-col items-center justify-center">
      <div className="flex flex-col md:flex-row gap-3 mb-4 w-full md:w-auto">
        <Input
          size="small"
          placeholder="Search"
          prefix={<SearchOutlined />}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyPress}
          className="w-full md:w-auto"
        />
        <button
          onClick={handleSearch}
          disabled={loading || isPending}
          className="p-2 bg-blue-500 text-white rounded w-full md:w-auto"
        >
          {loading || isPending ? "Searching..." : "Search"}
        </button>
      </div>

      <UserList
        users={users}
        selectedUser={selectedUser}
        handleUserClick={handleUserClick}
      />
      {selectedRepository ? (
        <>
          <IssueList
            issues={issues}
            handlePageIssueChange={(page) => handleIssuePageChange(page)}
            totalIssue={totalIssue}
            pageSize={5}
            currentIssuePage={issuePage}
            onBack={() => setSelectedRepository(null)}
            onNew={() => setAddNew(true)}
          />
          {errorMessage && <ErrorMessage message={errorMessage} />}
          {isSuccess && <SuccessMessage />}
        </>
      ) : (
        <RepositoryList
          repositories={repositories}
          handleRepositoryClick={handleRepositoryClick}
          totalRepos={totalRepositories}
          pageSize={5}
          currentReposPage={reposPage}
          handlePageReposChange={(page) => handleReposPageChange(page)}
        />
      )}

      <AddIssue
        isOpen={addNew}
        onSubmit={(data) =>
          selectedRepository?.id &&
          onSubmit(selectedRepository.id, data.title, data.description, () =>
            fetchIssues(selectedUser, selectedRepository.name, 5, null)
          )
        }
      />
    </div>
  );
};

export default UserSearch;
