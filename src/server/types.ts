import { type Request } from "express";
import { type SpotStructure } from "../types";

export interface AuthRequest extends Request {
  authId: string;
}

export interface AuthRequestWithSpot
  extends Request<
    Record<string, unknown>,
    Record<string, unknown>,
    SpotStructure
  > {
  authId: string;
}

export interface AuthRequestWithSpotToggle
  extends Request<Record<string, unknown>, Record<string, unknown>, string> {
  authId: string;
}
