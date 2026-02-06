const router = require("express").Router();
const auth = require("../middleware/authMiddleware");
const {
  createTask,
  getTasks,
  deleteTask,
  updateTask
} = require("../controllers/taskController");

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

router.use(auth);

/**
 * @swagger
 * /tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created
 */
router.post("/", createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get tasks (admin gets all, user gets own)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get("/", getTasks);

/**
 * @swagger
 * /tasks/{id}:
 *   put:
 *     summary: Update task (admin any task, user own task)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             properties:
 *               title:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task updated
 */
router.put("/:id", updateTask);

/**
 * @swagger
 * /tasks/{id}:
 *   delete:
 *     summary: Delete task (admin any task, user own task)
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Task deleted
 */
router.delete("/:id", deleteTask);

module.exports = router;
