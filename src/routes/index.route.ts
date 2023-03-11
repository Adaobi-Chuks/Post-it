import { Router } from 'express';
const router = Router();
import userRoute from "./user.route";
import {router as postRoute} from "./post.route";

router.use('/users', userRoute);
router.use('/posts', postRoute);

export default router;