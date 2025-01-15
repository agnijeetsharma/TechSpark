import { Router } from "express";
import {
  SendConnectionRequest,
  acceptConnectionRequests,
  getAllConnection,
  AllsentRequest,
  AllreceivedRequest,
} from "../controllers/match.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/connection-request").post(verifyJWT, SendConnectionRequest);
router.route("/connection").get(verifyJWT, getAllConnection);
router.route("/pending-sentrequest").get(verifyJWT, AllsentRequest);
router.route("/pending-receivedrequest").get(verifyJWT, AllreceivedRequest);
router.route("/accept-request").post(verifyJWT, acceptConnectionRequests);

export default router;
