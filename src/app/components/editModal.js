"use client"

import { useRouter } from 'next/navigation'
import { useState,useEffect } from "react"


export default function EditModal({currentId,currentName,currentNotes}){

    const router = useRouter();

    const [formStatus, setFormStatus] = useState(false);
    const [fomrResult,setFormresult] = useState(null);
    const [formdata, setFormdata] = useState({
        "id":currentId,
        "name":currentName,
        "notes":currentNotes,
    }
    );
    
    useEffect(() => {
        setFormdata({
          "id": currentId,
          "name": currentName,
          "notes": currentNotes,
        });
      }, [currentId, currentName, currentNotes]);


    
    const handleChange = (e)=>{
        const {name, value} = e.target;
        setFormdata({...formdata,[name]:value});
        console.log(formdata);
        console.log(currentId);
    }


    const storedTaskData = window.localStorage.getItem('tasks');
    const TaskData = storedTaskData ? JSON.parse(storedTaskData): [] ;


    const submitForm = async(e)=>{
        e.preventDefault();

        const index  = TaskData.findIndex((item)=>item.id == currentId);
        
        const updatedItem = { ...TaskData[index], name: formdata.name, notes: formdata.notes };

        // Create a new array with the updated item
        const updatedTaskData = [
          ...TaskData.slice(0, index),
          updatedItem,
          ...TaskData.slice(index + 1),
        ];
        
        setFormStatus(true);
        setFormresult('success');

        // Update localStorage with the updated TaskData
        localStorage.setItem('tasks', JSON.stringify(updatedTaskData));
        router.refresh();
        setTimeout(()=>{
          setFormStatus(false);
          setFormresult('');
        },3000);
        

    }
  
      return(
  
          <>
                    
                    <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModal" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Tasks</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                        <form onSubmit={submitForm}>
                                    <div className='form-group'>
                                    <label>Task Name</label>
                                    <input className='form-control' name="name" value={formdata.name} onChange={handleChange}  />
                                    </div>
                                    <div className='form-group'>
                                    <label>Task Notes</label>
                                    <input className='form-control' name="notes" value={formdata.notes} onChange={handleChange}  />
                                    </div>
                                    <div className='form-group'>
                                    <button type="submit" class="btn btn-primary d-block my-3 ms-auto">{formStatus== true ? 'Updating...' : 'Update'}</button>
                                    </div>
                                    <div class="py-1">
                                        {fomrResult == "success" &&(
                                        <div class="alert alert-success" role="alert">
                                            Task Updated successfully !
                                        </div>
                                        )}

                                        {fomrResult == "failed" &&(
                                        <div class="alert alert-danger" role="alert">
                                            Failed to update Task! Try again
                                        </div>
                                        )}

                                        {fomrResult == "not-connected" &&(
                                        <div class="alert alert-danger" role="alert">
                                            Something Went Wrong. Please try again.
                                        </div>
                                        )}
                                    </div>
                        </form>
                        </div>
                 
                        </div>
                    </div>
                    </div>


              
          </>
  
      )
  
  }