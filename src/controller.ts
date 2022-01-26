import { Request, Response, NextFunction } from 'express';
import { API_URL, BPDTS_API_USER_ENDPOINT } from "./conf";
import { User } from "./type";

import { get } from "./service";
import { arePointsNear } from "./util";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const queryURL = `${API_URL}${BPDTS_API_USER_ENDPOINT}`;
    const users: User[] = await get(queryURL);

    const userWithinRadius = users.filter( user => {
      return arePointsNear({ latitude: +user.latitude, longitude: +user.longitude});
    });

    res.send(userWithinRadius);
  } catch (err: any) {
    console.error(err.message, err.status);
    next(err);
  }
};

/* eslint-disable @typescript-eslint/no-unused-vars */
export const notFoundErrorHandler = (req: Request, res: Response, next: NextFunction): void => {
  const err: any = new Error(`Page not found: ${req.path}`);
  err.status = 404;
  next(err);
};

export const serverErrorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
  console.error(err.message);
  res.status(err.status || 500);
  res.send(err.message);
};