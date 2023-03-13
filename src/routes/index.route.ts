import { Router } from 'express';
const router = Router();
import userRoute from "./user.route";
import {router as tagRoute} from "./tag.route";
import {router as postRoute} from "./post.route";

router.use('/users', userRoute);
router.use('/posts', postRoute);
router.use('/tags', tagRoute);

//redirects users to API documentation when they navigate to "/docs"
router.use("/docs", (req, res) => {
    res.redirect("https://documenter.getpostman.com/view/22416364/2s93JtS4MC");
})

export default router;