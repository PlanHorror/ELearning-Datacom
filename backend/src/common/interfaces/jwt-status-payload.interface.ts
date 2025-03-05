import { Role, Status } from 'src/common/enums';

// JwtStatusPayload interface defines the structure of the JWT status payload.
export interface JwtStatusPayload {
  email: string;
  role: Role;
  status: Status;
}
