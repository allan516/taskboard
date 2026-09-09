// type User = {
//   id: number;
//   name: string;
//   email: string;
//   emailVerified: boolean;
//   createdAt: string;
//   updatedAt: string;
// };

// export type { User };

type User = {
  id: number;
  name: string;
  email: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;

  role?: 'USER' | 'ADMIN';
  status?: 'ACTIVE' | 'BLOCKED';

  _count?: {
    tasks: number;
  };
};

export type { User };
