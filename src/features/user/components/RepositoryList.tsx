import React from "react";
import RepositoryCard from "./RepositoryCard";
import { Pagination } from "antd";

type RepositoryListProps = {
  repositories: Repository[];
  handleRepositoryClick: (repository: Repository) => void;
  totalRepos: number;
  pageSize: number;
  currentReposPage: number;
  handlePageReposChange: (page: number) => void;
};

const RepositoryList = ({
  repositories,
  handleRepositoryClick,
  totalRepos,
  pageSize,
  currentReposPage,
  handlePageReposChange,
} : RepositoryListProps) => {
  return (
    <div className="w-full md:w-[50%] mt-12">
      <h1 className="font-bold text-xl mb-5">Repositories :</h1>
      <div className="flex flex-col gap-3">
        {repositories.length > 0
          ? repositories.map((repository) => (
              <RepositoryCard
                key={repository.id}
                repository={repository}
                handleRepositoryClick={handleRepositoryClick}
              />
            ))
          : "No repository found"}
      </div>
      {totalRepos > pageSize && (
        <Pagination
          current={currentReposPage}
          pageSize={pageSize}
          total={totalRepos}
          onChange={handlePageReposChange}
          className="mt-4"
        />
      )}
    </div>
  );
};

export default RepositoryList;
