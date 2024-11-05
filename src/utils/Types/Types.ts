export interface AuthContextType {
  setAuth: (
    authToken: string | null,
    uniqueId: string | null,
    name: string | null
  ) => void;
  removeAuth: () => void;
  token: string | null;
  uniqueId: string | null;
  name: string | null;
}

export interface ErrorResponse {
  code: string;
  message: string;
  detailedMessage: string;
  helpUrl: string;
  details: null;
}

export interface Birthday {
  NOME: string;
  DTNASCIMENTO: number;
}

export interface TableBirthdayProps {
  data: { NOME: string; DTNASCIMENTO: number }[];
}

export interface Post {
  id: number;
  title: string;
  subtitle: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
  authorName: string;
  coverImageUrl: string;
}

export interface CreatePostData {
  title: string;
  subtitle: string;
  content: string;
  authorId: string;
  authorName: string;
  coverImage?: File | null;
}

export interface EditPostData {
  title?: string;
  subtitle?: string;
  content?: string;
  coverImage?: File | null;
}
