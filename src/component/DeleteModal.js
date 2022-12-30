import React from 'react'

function DeleteModal({isModal, isDelete, setIsModal, deleteActivity}) {

  return (
    <div>
    {isModal && <div className='message'>
          <div className='message-container'>
            <div className='message-text'>
              <h3 key={isDelete.id}>Apakah anda yakin menghapus <strong>"{isDelete.task}"</strong></h3>
              <div className='btn-modal'>
                <button onClick={()=> setIsModal(false) } className='btn-msg1'>batal</button>
                <button onClick={()=> deleteActivity(isDelete.id)} className='btn-msg2'>hapus</button>
              </div>
            </div>
          </div>
       </div>}
    </div>
  )
}

export default DeleteModal