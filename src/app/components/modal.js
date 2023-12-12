
import ModalLayout from "./serverModal";


export default function AddModal() {

  return (
    <>
      <button type="button" class="btn btn-primary mb-4" data-bs-toggle="modal" data-bs-target="#exampleModal">
            Add Notes 
      </button>

      <ModalLayout/>

    </>
  );
}
