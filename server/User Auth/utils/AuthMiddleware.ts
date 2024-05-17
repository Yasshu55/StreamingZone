import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken'
import { constants } from "../constants";

export const authMiddleware = async (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"] as string;
  if (!authHeader) {
    return res.status(401).json({ error: "auth header missing" });
  }
  const tokenArr = authHeader.split(" ");
  if (tokenArr.length !== 2) {
    return res.status(401).json({ error: "invalid auth header" });
  }
  try {
    const payload = jwt.verify(tokenArr[1],constants.Jwtsecret);
    req.user = payload;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "invalid auth token" });
  }
};