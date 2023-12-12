"use client"
import { useEffect, useState } from "react";
import MainData from "../commons/maindata";
import EditModal from "./editModal";



const deleteTask = async(itemId)=>{
    
    const deleteData = await fetch(`/api/hello?id=${itemId}`,{
        method:"DELETE",
    })

}

export default function DisplayForm(){

  const [currId,setCurrId] = useState(null);
  const [currName,setCurrName] = useState(null);
  const [currNotes,setCurrNotes] = useState(null);


  


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

      <table className='table w-100 table-bordered'>

    <thead>
      <tr>
        <th>S no.</th>
        <th>Task name</th>
        <th>Notes</th>
        <th colSpan={2} className="text-center">Action</th>
      </tr>
    </thead>

    <tbody>
      {MainData.map((item,index)=>(

      
      <tr key={index}>
        <td>{index+1}</td>
        <td>{item.name}</td>
        <td>{item.notes}</td>
        <td><button className="btn btn-dark" onClick={()=>{passCurrentData(item.id,item.name,item.notes)}} >Edit</button></td>
        <td><button className='btn btn-danger' onClick={()=>deleteTask(item.id)}>Delete</button></td>
      </tr>
      ))}
    </tbody>

    <tfoot>
      <tr>
        <th>S no.</th>
        <th>Task name</th>
        <th>Notes</th>
        <th colSpan={2} className="text-center">Action</th>
      </tr>
    </tfoot>

  </table>

  </>
    )
}

