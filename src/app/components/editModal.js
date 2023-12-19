"use client"

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function EditModal({ currentId, currentName, currentNotes }) {
  const router = useRouter();

  const [formStatus, setFormStatus] = useState(false);
  const [formResult, setFormResult] = useState(null);
  const [formdata, setFormdata] = useState({
    id: currentId,
    name: currentName,
    notes: currentNotes,
  });

  useEffect(() => {
    setFormdata({
      id: currentId,
      name: currentName,
      notes: currentNotes,
    });
  }, [currentId, currentName, currentNotes]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  const storedTaskData = localStorage.getItem('tasks');
  const TaskData = storedTaskData ? JSON.parse(storedTaskData) : [];

  const submitForm = (e) => {
    e.preventDefault();

    const index = TaskData.findIndex((item) => item.id === currentId);

    if (index !== -1) {
      const updatedItem = { ...TaskData[index], name: formdata.name, notes: formdata.notes };

      // Create a new array with the updated item
      const updatedTaskData = [...TaskData.slice(0, index), updatedItem, ...TaskData.slice(index + 1)];

      setFormStatus(true);
      setFormResult('success');

      // Update localStorage with the updated TaskData
      localStorage.setItem('tasks', JSON.stringify(updatedTaskData));
      router.refresh();

      setTimeout(() => {
        setFormStatus(false);
        setFormResult('');
      }, 3000);
    } else {
      // Handle the case where the item with the specified ID is not found
      setFormResult('failed');
    }
  };

  return (
    <>
      <div className="modal fade" id="editModal" tabIndex="-1" aria-labelledby="editModal" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Tasks
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={submitForm}>
                <div className="form-group">
                  <label>Task Name</label>
                  <input className="form-control" name="name" value={formdata.name} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <label>Task Notes</label>
                  <input className="form-control" name="notes" value={formdata.notes} onChange={handleChange} />
                </div>
                <div className="form-group">
                  <button type="submit" className="btn btn-primary d-block my-3 ms-auto">
                    {formStatus ? 'Updating...' : 'Update'}
                  </button>
                </div>
                <div className="py-1">
                  {formResult === 'success' && (
                    <div className="alert alert-success" role="alert">
                      Task Updated successfully!
                    </div>
                  )}

                  {formResult === 'failed' && (
                    <div className="alert alert-danger" role="alert">
                      Failed to update Task! Try again
                    </div>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
