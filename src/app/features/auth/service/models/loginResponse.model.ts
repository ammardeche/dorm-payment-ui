export interface LoginResponse {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
    roles: string[];
  };
}
