import { useState, useTransition, useCallback } from "react";
import { searchUsers } from "@features/api/user";

export const useSearchUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [isPending, startTransition] = useTransition();

  const search = useCallback(async (searchTerm: string) => {
    setLoading(true);
    try {
      const result = await searchUsers(searchTerm);
      startTransition(() => {
        setUsers(result.search.edges.map((edge: Edge) => edge.node));
      });
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    isPending,
    search,
  };
};
