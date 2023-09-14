import { type Request } from "express";
import { type SpotStructure } from "../../types";

export interface AuthRequest
  extends Request<
    Record<string, unknown>,
    Record<string, unknown>,
    SpotStructure
  > {
  authId: string;
}
