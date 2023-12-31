import axios from 'axios';
import React, { useState, useEffect } from 'react';

import toast from 'react-hot-toast';

import TaskItem from './TaskItem';
import classes from './TaskList.module.scss';
import { URL } from '../../context/Url';

function TaskList() {
  const [taskList, setTaskList] = useState([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newTask, setNewTask] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState(''); 


  const getTasks = async () => {
    try {
      const { data } = await axios.get(`${URL}/api/tasks/mytasks`);
      setTaskList(
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const addNewButtonClick = () => {
    setIsAddingNew(!isAddingNew);
  };


  const addNewTask = async (e) => {
    e.preventDefault();
    if (newTask.length <= 0) {
      toast.error('Task title is empty');
      return;
    }
    try {
      const { data } = await axios.post(`${URL}/api/tasks/`, {
        title: newTask,
        description: newTaskDescription,
      });
      toast.success('New task added');
      setIsAddingNew(false);
      setNewTask('');
      setNewTaskDescription(''); // Reset the description input
      setTaskList([{ ...data }, ...taskList]);
    } catch (err) {
      console.log(err);
    }
  };
  

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${URL}/api/tasks/${id}`);
      toast.success('Task deleted');
      setTaskList(taskList.filter((task) => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

 

  return (
    <div>
    <div className={classes.topBar}>
      <button type="button" className={classes.addNew} onClick={addNewButtonClick}>
        Add New
      </button>
    </div>
    {isAddingNew && (
      <form className={classes.addNewForm} onSubmit={addNewTask}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Task name"
        />
        <input
          type="text" // Step 2: Add an input field for the description
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          placeholder="Task description"
        />
        <button type="submit">Add</button>
      </form>
    )}
     {taskList.length > 0 ? (
        <table className={classes.taskList_table}>
          <tbody>
            {taskList.map((task) => (
              <TaskItem key={task._id} task={task} deleteTask={deleteTask} />
            ))}
          </tbody>
        </table>
      ) : (
        'No Task Found. Create a new task'
      )}
  </div>
  
  );
}

export default TaskList;