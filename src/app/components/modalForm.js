"use client"
import { useRouter } from 'next/navigation'
import { useState } from 'react';


export default function ModalForm(){

  
  const router = useRouter();
  
  
  const [formStatus, setFormStatus] = useState(false);
  const [formdata,setFormdata] = useState({
    "name":"",
    "notes":"",
  });

  const [fomrResult,setFormresult] = useState(null);
  const [taskData,setTaskData] = useState({});


  const handleChange =(e)=>{
      const {name, value} = e.target;
      setFormdata({...formdata,[name]:value});
  }

  const storedTaskData = localStorage.getItem('tasks');
  const TaskData = storedTaskData ? JSON.parse(storedTaskData): [] ;
  
    const submitForm = async(e)=>{
          e.preventDefault();

          const newItem = { id: generateUniqueId(), name: formdata.name, notes: formdata.notes };

          // Add the new item to the TaskData array
          const updatedTaskData = [...TaskData, newItem];

          // Update the state with the new TaskData
          setTaskData(updatedTaskData);

          setFormStatus(true);
          setFormresult('success');

          // Update localStorage with the new TaskData
          localStorage.setItem('tasks', JSON.stringify(updatedTaskData));

          setTimeout(()=>{
            setFormStatus(false);
            setFormresult('');
          },3000)
          router.refresh();
      }

      const generateUniqueId = () => {
        // Implement your unique ID generation logic here
        // This can be a simple counter or use a library like uuid
        // For simplicity, using a timestamp in this example
        return new Date().getTime();
      };

    return(

        <>
            <form onSubmit={submitForm} >
                      <div className='form-group'>
                        <label>Task Name</label>
                        <input className='form-control' name="name" onChange={handleChange} value={formdata.name} />
                      </div>
                      <div className='form-group'>
                        <label>Task Notes</label>
                        <input className='form-control' name="notes" onChange={handleChange} value={formdata.notes}  />
                      </div>
                      <div className='form-group'>
                      <button type="submit" class="btn btn-primary d-block my-3 ms-auto">{formStatus == true ? 'Please Wait..' : 'Submit' }</button>
                      </div>
                      <div class="py-1">
                        {fomrResult == "success" &&(
                          <div class="alert alert-success" role="alert">
                              Task Created successfully !
                          </div>
                        )}

                        {fomrResult == "failed" &&(
                          <div class="alert alert-danger" role="alert">
                              Failed to create Task! Try again
                          </div>
                        )}

                        {fomrResult == "not-connected" &&(
                          <div class="alert alert-danger" role="alert">
                              Something Went Wrong. Please try again.
                          </div>
                        )}
                      </div>
            </form>
        </>

    )

}