import { Role } from './enum.model';

// JwtPayload interface defines the structure of the JWT payload.
export interface JwtPayload {
  email?: string;
  role: Role;
  name?: string;
}
