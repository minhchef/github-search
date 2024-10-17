import { useState, useCallback } from "react";
import { createIssue, getRepositoryIssues } from "@features/api/user";

export const useIssues = () => {
  const [issues, setIssues] = useState<Issue[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [addNew, setAddNew] = useState<boolean>(false);
  const [totalIssue, setTotalIssue] = useState(0);
  const [issuePage, setIssuePage] = useState(1);
  const [endIssueCursor, setEndIssueCursor] = useState<string | null>(null);

  const fetchIssues = async (
    owner: string,
    repositoryName: string,
    pageSize: number,
    after: string | null = null
  ) => {
    setIssues([]);
    setTotalIssue(0);
    setEndIssueCursor(null);  
    try {
      const result = await getRepositoryIssues(
        owner,
        repositoryName,
        pageSize,
        after
      );
      setIssues(
        result.repository.issues.edges.map((edge: Edge) => edge.node) ?? []
      );
      setTotalIssue(result.repository.issues.totalCount);
      setEndIssueCursor(result.repository.issues.pageInfo.endCursor);
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  };

  const onSubmit = useCallback(
    async (
      repositoryId: string,
      title: string,
      body: string,
      callback: () => void
    ) => {
      setErrorMessage("");
      setIsSuccess(false);
      try {
        await createIssue(repositoryId, title, body);
        setIsSuccess(true);
        callback();
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else {
          setErrorMessage("An unknown error occurred.");
        }
      } finally {
        setAddNew(false);
      }
    },
    []
  );

  return {
    issues,
    totalIssue,
    endIssueCursor,
    fetchIssues,
    issuePage,
    setIssuePage,
    addNew,
    setAddNew,
    onSubmit,
    errorMessage,
    isSuccess,
  };
};
