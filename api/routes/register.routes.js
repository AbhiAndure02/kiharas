import express from "express"
import { deleteRegister, getRegistrationData, register, updateRegister } from "../controllers/register.cntroller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.post('/register', register);
router.get('/getregister', getRegistrationData);

router.put('/registrations/:registerId', updateRegister)
router.delete('/deleteData/:registerId', deleteRegister)
export default router;