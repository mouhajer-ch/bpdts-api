import { Router } from 'express';
import { getUsers } from "./controller";
import { API_ENDPOINT } from "./conf";

const router = Router();

router.get(API_ENDPOINT, getUsers);

export default router;