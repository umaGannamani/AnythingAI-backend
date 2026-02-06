const db = require("../config/db");

/**
 * CREATE TASK
 * - Any logged-in user can create a task
 */
exports.createTask = (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  db.run(
    "INSERT INTO tasks (title, userId) VALUES (?, ?)",
    [title, req.user.id],
    function (err) {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.status(201).json({
        message: "Task added",
        taskId: this.lastID
      });
    }
  );
};

/**
 * GET TASKS
 * - Admin: gets all tasks
 * - User: gets only own tasks
 */
exports.getTasks = (req, res) => {
  const { role, id } = req.user;

  const query =
    role === "admin"
      ? "SELECT * FROM tasks"
      : "SELECT * FROM tasks WHERE userId = ?";

  const params = role === "admin" ? [] : [id];

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ message: err.message });
    }
    res.json(rows);
  });
};

/**
 * UPDATE TASK
 * - Admin: can update any task
 * - User: can update only own task
 */
exports.updateTask = (req, res) => {
  const { title } = req.body;
  const taskId = req.params.id;
  const { role, id: userId } = req.user;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  if (role === "admin") {
    db.run(
      "UPDATE tasks SET title = ? WHERE id = ?",
      [title, taskId],
      function (err) {
        if (err) return res.status(500).json({ message: err.message });
        if (this.changes === 0) {
          return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task updated by admin" });
      }
    );
  } else {
    db.run(
      "UPDATE tasks SET title = ? WHERE id = ? AND userId = ?",
      [title, taskId, userId],
      function (err) {
        if (err) return res.status(500).json({ message: err.message });
        if (this.changes === 0) {
          return res.status(403).json({ message: "Not allowed" });
        }
        res.json({ message: "Task updated" });
      }
    );
  }
};

/**
 * DELETE TASK
 * - Admin: can delete any task
 * - User: can delete only own task
 */
exports.deleteTask = (req, res) => {
  const taskId = req.params.id;
  const { role, id: userId } = req.user;

  if (role === "admin") {
    db.run(
      "DELETE FROM tasks WHERE id = ?",
      [taskId],
      function (err) {
        if (err) return res.status(500).json({ message: err.message });
        if (this.changes === 0) {
          return res.status(404).json({ message: "Task not found" });
        }
        res.json({ message: "Task deleted by admin" });
      }
    );
  } else {
    db.run(
      "DELETE FROM tasks WHERE id = ? AND userId = ?",
      [taskId, userId],
      function (err) {
        if (err) return res.status(500).json({ message: err.message });
        if (this.changes === 0) {
          return res.status(403).json({ message: "Not allowed" });
        }
        res.json({ message: "Task deleted" });
      }
    );
  }
};
