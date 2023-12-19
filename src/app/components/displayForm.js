// Import bootstrap here if not already done
// import 'bootstrap/dist/css/bootstrap.min.css';
"use client";
import { useEffect, useState } from 'react';
import EditModal from './editModal';

export default function DisplayForm() {
  const [currId, setCurrId] = useState(null);
  const [currName, setCurrName] = useState(null);
  const [currNotes, setCurrNotes] = useState(null);
  const [taskData, setTaskData] = useState({});

  useEffect(() => {
    // Move localStorage operations into useEffect to ensure it runs only in the client
    const storedTaskData = localStorage.getItem('tasks');
    const TaskData = storedTaskData ? JSON.parse(storedTaskData) : [];

    if (TaskData.length === 0) {
      // const DefaultTask = {id:'53',name:'Write Code', notes:'Write codes for Tasks App.'};
      // TaskData.push(DefaultTask);
      localStorage.setItem('tasks', []);
    }

    setTaskData(TaskData);
  }, []); // Run this effect only once on component mount

  const deleteTask = (itemId) => {
    const updatedTaskData = taskData.filter((item) => item.id !== itemId);
    setTaskData(updatedTaskData);
    localStorage.setItem('tasks', JSON.stringify(updatedTaskData));
  };

  const passCurrentData = (itemId, itemName, itemNotes) => {
    setCurrId(itemId);
    setCurrName(itemName);
    setCurrNotes(itemNotes);

    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  };

  return (
    <>
      {currId !== null && (
        <EditModal
          currentId={currId}
          currentName={currName}
          currentNotes={currNotes}
        />
      )}

      {taskData.length > 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Notes</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {taskData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.notes}</td>
                <td>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      passCurrentData(item.id, item.name, item.notes);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTask
                      (item.id)}
                      >
                      Delete
                      </button>
                      </td>
                      </tr>
                      ))}
                      </tbody>
                      </table>
                      ) : (
                      <p className="text-center fw-semibold my-5 fs-4">No tasks available</p>
                      )}
                      </>
                      );
}