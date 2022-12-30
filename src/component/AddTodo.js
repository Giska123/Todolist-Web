import { IoMdClose } from "react-icons/io";


const AddTodo = ({
  items,
  setIsAddTodo,
  handleChangeTodo,
  handleSubmitTodo
}) => {

return (

  
<div className='todo-add'>
<div className='todo-add-container'>

<IoMdClose className='close-icon' onClick={() => setIsAddTodo(false)}/>

<div className='todo-form'>
      <div className='task-input'>
        <label>task</label>
        <input
          type='text' 
          className='text-task' 
          name='activity'
          autoFocus
          onChange={(e) => handleChangeTodo(e)}/> 
      </div>

      <div className='todo-input todo-task'>
      <div className='task-input'>
        <label>date</label>
        <input
          type='date' 
          id='date'
          className='date-task' 
          name='date'
          autoFocus
          onChange={(e) => handleChangeTodo(e)}/> 
      </div>

      <div className='task-input'>
        <label>time</label>
        <input
          type='time' 
          id='time'
          className='time-task' 
          name='time'
          autoFocus
          onChange={(e) => handleChangeTodo(e)}/> 
      </div>
      
      <div className='task-input'>
      <label>priority</label>
        <select className='priority' name='priority' onChange={(e) => handleChangeTodo(e)}>
          <option value='high'>high</option>
          <option value='normal'>normal</option>
          <option value='low'>low</option>
        </select>
    </div>
    </div>
      

      <div className='todo-input'>
        <button className='btn-form' 
        onClick={(e) => handleSubmitTodo(e)}>save</button>
      </div>
</div>
</div>
</div>

)
}

export default AddTodo