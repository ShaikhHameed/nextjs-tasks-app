import Image from 'next/image'
import styles from './page.module.css'
import AddModal from './components/modal'
import DisplayForm from './components/displayForm'

export const metadata = {
  title:'Home'
}



export default function Home() {




  return (
    <>
      
      <div className='container-fluid py-5'>

        <div className='container'>
          
        <AddModal/>

        <DisplayForm/>
         

        </div>

      </div>


    </>
  )
}
