
import { Router } from "express";
import { auth } from "../../middlewares/auth.js";
const router = Router()
import * as todoController from './todoController.js'


router.post('/addTodo', auth(), todoController.addTodo);
router.put('/statusone', auth(), todoController.statusone);
router.put('/statusAll', auth(), todoController.statusAll);
router.put('/updateOne/:todoId', auth(), todoController.updateOne);
router.put('/updateMany', auth(), todoController.updateMany);
router.delete('/deleteOne/:todoId', auth(), todoController.deleteOne);
router.delete('/deleteMany', auth(), todoController.deleteMany)
router.get('/Search', auth(), todoController.Search)
router.get('/getAllTodo' , auth() , todoController.getAllTodo)



export default router;