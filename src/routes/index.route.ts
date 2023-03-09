import { Router } from 'express';
const router = Router();
import userRoute from "./user.route";
import postRoute from "./post.route";
import commentRoute from "./comment.route";

router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/comments', commentRoute);

export default router;