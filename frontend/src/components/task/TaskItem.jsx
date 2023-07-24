import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import moment from 'moment';
import classes from './TaskItem.module.scss';
import {URL} from '../../context/Url'

function TaskItem({ task, deleteTask }) {
  const [isCompleted, setIsCompleted] = useState(task.completed);
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description); // Step 1: Add editedDescription state

  const handleCheckboxClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(`${URL}/api/tasks/${task._id}`, {
        completed: !isCompleted,
      });
      setIsCompleted(!isCompleted);
      toast.success('Task updated successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = async () => {
    try {
      setIsLoading(true);
      await axios.put(`${URL}/api/tasks/${task._id}`, {
        title: editedTitle,
        description: editedDescription, // Step 2: Include editedDescription in the request
        completed: isCompleted,
      });
      setIsEditing(false);
      toast.success('Task updated successfully');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <tr className={classes.task_item}>
      <td className={classes.task_name}>
        <div className={classes.checkbox} onChange={handleCheckboxClick} role="checkbox" aria-checked>
          <input type="checkbox" checked={isCompleted} disabled={isLoading} readOnly tabIndex={-1} />
        </div>

        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            disabled={isLoading}
            className={classes.task_name__input}
          />
        ) : (
          <p>{task.title}</p>
        )}
      </td>
      <td>
        {isEditing ? ( // Render the input field for description when editing
          <input
            type="text"
            value={editedDescription}
            onChange={(e) => setEditedDescription(e.target.value)}
            disabled={isLoading}
            className={classes.task_name__input}

            
           />
        ) : (
          <p>{task.description}</p>
        )}
      </td>
      <td>{isCompleted ? 'Complete' : 'Incomplete'}</td>
      <td className={classes.task_date}>{moment(task.createdAt).format('MMM Do YY')}</td>
      <td>
        {isEditing ? (
          <button type="button" className={classes.saveBtn} onClick={handleSaveClick} disabled={isLoading}>
            Save
          </button>
        ) : (
          <button type="button" className={classes.editBtn} onClick={handleEditClick} disabled={isLoading}>
            Edit
          </button>
        )}
      </td>
      <td>
        <button type="button" className={classes.deleteBtn} onClick={() => deleteTask(task._id)}>
          Delete
        </button>
      </td>
    </tr>
  );
}

export default TaskItem;
