// Auth types and interfaces
export interface AuthState {
  isAuthenticated: boolean | null;
  user: {
    email: string;
  } | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignUpPayload = {
  email: string;
  password: string;
};

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

export type SignUpResponse = {
  access_token?: string;
  refresh_token?: string;
  user: {
    email: string;
    created_at?: string;
    updated_at?: string;
  };
};

export type CheckAuthResponse = {
  user: {
    email: string;
  };
  access_token?: string;
};
