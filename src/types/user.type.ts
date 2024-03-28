import { FAILED, IDLE, LOADING, SUCCEEDED } from "../state/status";
import { User } from "./auth.type";

export type RequestStatus =
  | typeof IDLE
  | typeof LOADING
  | typeof SUCCEEDED
  | typeof FAILED;

export interface UsersState {
  entities: User[];
  status: RequestStatus;
  error: string | null | undefined;
}