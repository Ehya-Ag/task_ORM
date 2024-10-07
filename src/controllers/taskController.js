import { Task } from "../models/task.js";
import { sequelize } from "../config/db.js";

const initializeDatabase = async () => {
  try {
    await sequelize.sync();
    console.log('Task table created successfully!');
  } catch (error) {
    console.error('Unable to create table: ', error);
  }
};

const createTask = async (req, res) => {
  try {
    const { title, start_date, end_date } = req.body;

    const task = await Task.create({
      title,
      start_date,
      end_date,
    });

    console.log('New task created:', task);
    res.status(201).json(task);
  } catch (error) {
    console.error('Failed to create a new task:', error);
    res.status(500).json({ error: 'Failed to create a new task' });
  }
};

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    console.error('Failed to retrieve tasks:', error);
    res.status(500).json({ error: 'Failed to retrieve tasks' });
  }
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, start_date, end_date } = req.body;

  try {
    const task = await Task.findByPk(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    task.title = title || task.title;
    task.start_date = start_date || task.start_date;
    task.end_date = end_date || task.end_date;

    await task.save();
    res.status(200).json(task);
  } catch (error) {
    console.error('Failed to update the task:', error);
    res.status(500).json({ error: 'Failed to update the task' });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }
    await task.destroy();
    res.status(204).send();
  } catch (error) {
    console.error('Failed to delete the task:', error);
    res.status(500).json({ error: 'Failed to delete the task' });
  }
};

initializeDatabase();

export { createTask, getAllTasks, updateTask, deleteTask };
