type User = {
  login: string;
  avatarUrl: string;
  url: string;
  name: string;
};

type Edge = {
  node: User;
};

type Repository = {
  id: string;
  name: string;
  description: string;
  url: string;
  stargazerCount: number;
  watchers: {
    totalCount: number;
  };
};

type Issue = {
  id: string;
  title: string;
  createdAt: string;
  url: string;
  stargazerCount: number;
  author: {
    login: string;
  };
};
