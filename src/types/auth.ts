export interface InviteToken {
  id: string;
  email: string;
  role: "admin" | "faculty" | "trainer" | "student";
  token: string;
  status: "pending" | "accepted" | "expired";
  createdAt: string;
  expiresAt: string;
}

export interface AuthUser {
  id: string;
  email: string;
  role: "admin" | "faculty" | "trainer" | "student";
  name: string;
  avatar?: string;
  lastLogin?: string;
  status: "active" | "inactive" | "pending";
}

export interface AuthSession {
  token: string;
  expiresAt: string;
  user: AuthUser;
}
