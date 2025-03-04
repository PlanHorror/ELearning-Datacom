import { Role, Status } from './enum.model';

// JwtPayload interface defines the structure of the JWT payload.
export interface JwtPayload {
  email?: string;
  role: Role;
  name?: string;
}

// JwtStatusPayload interface defines the structure of the JWT status payload.
export interface JwtStatusPayload {
  email: string;
  role: Role;
  status: Status;
}
