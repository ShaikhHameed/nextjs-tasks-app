"use client"
import { useEffect, useState } from "react";
// import MainData from "../commons/maindata";
import EditModal from "./editModal";




export default function DisplayForm(){

  const [currId,setCurrId] = useState(null);
  const [currName,setCurrName] = useState(null);
  const [currNotes,setCurrNotes] = useState(null);

  
  const [taskData,setTaskData] = useState({});

  const storedTaskData = localStorage.getItem('tasks');
  const TaskData = storedTaskData ? JSON.parse(storedTaskData): [] ;

  if (TaskData.length === 0) {
    const DefaultTask  = {};
      // { id:53,name: 'Default Task 1', notes: 'Default Notes 1' }
  
  

  TaskData.push(DefaultTask);


  localStorage.setItem('tasks', JSON.stringify(TaskData));
}

    
      const deleteTask = (itemId)=>{

        const updatedTaskData = TaskData.filter((item) => item.id !== itemId);

        // Update the state with the updated TaskData
        setTaskData(updatedTaskData);

        // Update localStorage with the updated TaskData
        localStorage.setItem('tasks', JSON.stringify(updatedTaskData));
        

       


      }



  const passCurrentData = (itemId,itemName,itemNotes)=>{

    setCurrId(itemId)
    setCurrName(itemName)
    setCurrNotes(itemNotes)

    console.log(itemId);

    const modal = new bootstrap.Modal(document.getElementById('editModal'));
    modal.show();
  }





    return (
      <>
      {/* //<EditModal  currentId={currId} currentName={currName} currentNotes={currNotes}/> */}

      {currId !== null && (
        <EditModal
          currentId={currId}
          currentName={currName}
          currentNotes={currNotes}
        />
      )}

  
      
    {TaskData.length > 0 ? (
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
            {TaskData.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.notes}</td>
                <td>
                  <button
                    className="btn btn-dark"
                    onClick={() => {
                      passCurrentData( item.id,item.name, item.notes);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() => deleteTask(item.id)}
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
    )
}

