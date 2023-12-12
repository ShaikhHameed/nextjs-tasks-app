"use client"
import { useState } from 'react';


export default function ModalForm(){

  
  
  
  const [formStatus, setFormStatus] = useState(false);
  const [formdata,setFormdata] = useState({
    "name":"",
    "notes":"",
  });

  const [fomrResult,setFormresult] = useState(null);

  const handleChange =(e)=>{
      const {name, value} = e.target;
      setFormdata({...formdata,[name]:value});
  }
  
    const submitForm = async(e)=>{
          e.preventDefault();

          setFormStatus(true);

          const requestData = JSON.stringify(formdata)

          console.log();
          
          try{
            const fetchdata = await fetch('/api/hello',{
              method:"POST",
              body: requestData,
            });
  
            const response = await fetchdata.json();
            if(response.status===200){
              setFormStatus(false);
              setFormresult("success");
              setTimeout(()=>{
                setFormresult(null);
              },2000);
            }
            else{
              setFormStatus(false);
              setFormresult("failed");
              setTimeout(()=>{
                setFormresult(null);
              },2000);
            }
          }
          catch(err){
            setFormStatus(false);
            setFormresult("not-connected");
            setTimeout(()=>{
              setFormresult(null);
            },2000);
            console.log(err);
          }


      }

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