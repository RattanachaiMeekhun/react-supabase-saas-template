export type LoginResponse = {
  access_token: string;
  refresh_token: string;
  user: {
    id: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
};
