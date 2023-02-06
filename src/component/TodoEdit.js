import { IoMdClose } from "react-icons/io";


const TodoEdit = ({
  items,
  isTask,
  setIsEditTask,
  handleOnChange,
  updateActivity
}) => {

return (

  
<div className='todo-add'>
<div className='todo-add-container'>

<IoMdClose className='close-icon' onClick={() => setIsEditTask(false)}/>

<div className='todo-form'>
      <div className='task-input'>
        <label>task</label>
        <input
          type='text' 
          className='text-task' 
          name='task'
          defaultValue={isTask.task}
          autoFocus
          onChange={(e) => handleOnChange(e)}/> 
      </div>

      <div className='todo-input todo-task'>
      <div className='task-input'>
        <label>date</label>
        <input
          type='date' 
          id='date'
          className='date-task' 
          name='date'
          defaultValue={isTask.date}
          onChange={(e) => handleOnChange(e)}/> 
      </div>

      <div className='task-input'>
        <label>time</label>
        <input
          type='time' 
          id='time'
          className='time-task' 
          name='time'
          defaultValue={isTask.time}
          onChange={(e) => handleOnChange(e)}/> 
      </div>
      
      <div className='task-input'>
      <label>priority</label>
        <select className='priority' name='priority' onChange={(e) => handleOnChange(e)} defaultValue={isTask.priority}>
          <option defaultValue='high'>high</option>
          <option defaultValue='normal'>normal</option>
          <option defaultValue='low'>low</option>
        </select>
    </div>
    </div>
      

      <div className='todo-input'>
        <button className='btn-form' onClick={() => updateActivity(isTask.id)}>save</button>
      </div>
</div>
</div>
</div>

)
}

export default TodoEdit