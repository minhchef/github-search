import { useState, useCallback } from "react";
import { getUserRepos } from "@features/api/user";

export const useRepositories = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [totalRepositories, setTotalRepositories] = useState(0);
  const [reposPage, setReposPage] = useState(1);
  const [endReposCursor, setEndReposCursor] = useState<string | null>(null);

  const fetchRepositories = useCallback(
    async (owner: string, pageSize: number, after: string | null = null) => {
      setRepositories([]);
      setTotalRepositories(0);
      setEndReposCursor(null);  
      try {
        const result = await getUserRepos(owner, pageSize, after, "STARGAZERS");
        setRepositories(result.user.repositories.edges.map((edge: Edge) => edge.node));
        setTotalRepositories(result.user.repositories.totalCount);
        setEndReposCursor(result.user.repositories.pageInfo.endCursor);
      } catch (error) {
        console.error("Error fetching repositories:", error);
      }
    },
    []
  );

  return {
    repositories,
    totalRepositories,
    endReposCursor,
    fetchRepositories,
    setReposPage,
    reposPage
  };
};
