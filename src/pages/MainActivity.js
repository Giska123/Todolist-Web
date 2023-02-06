import { useState, useEffect} from 'react'
import CardActivity from '../component/CardActivity'
import DeleteModal from '../component/DeleteModal';
import AddTodo from '../component/AddTodo';
import TodoEdit from '../component/TodoEdit'
import axios from 'axios';
import { BsSortDownAlt, BsSortUpAlt, BsSortAlphaDownAlt, BsSortAlphaUpAlt } from "react-icons/bs";
import { FiCheck } from "react-icons/fi";
import { TbArrowsSort } from "react-icons/tb";

function MainActivity() {

  const [activities, setActivities] = useState([]);
  const [formValues, setFormValues] = useState({});
  const [isTask, setIsTask] = useState([])
  const [editValues, setEditValues] = useState({});
  const [isDelete, setIsDelete] = useState([])
  const [isEditTask, setIsEditTask] = useState(false)
  const [isModal, setIsModal] = useState(false);
  const [isAddTodo, setIsAddTodo] = useState(false)
  const [sortBy, setSortBy] = useState('');
  const [isDropDown, setIsDropDown] = useState('');

  const latest = <BsSortDownAlt />;
  const oldest = <BsSortUpAlt />;
  const descending = <BsSortAlphaUpAlt  />;
  const ascending = <BsSortAlphaDownAlt />;
  const unfinished = <TbArrowsSort  />;

  const sortOptions = [
    { title: 'Latest', sortBy: 'latest', img: latest },
    { title: 'Oldest', sortBy: 'oldest', img: oldest },
    { title: 'A-Z', sortBy: 'descending', img: descending },
    { title: 'Z-A', sortBy: 'ascending', img: ascending },
    { title: 'Unfinished', sortBy: 'unfinished', img: unfinished },
  ];

  
const axiosInstance = axios.create({
  baseURL: 'https://todolist-api-two.vercel.app',
});

async function fetchDetails() {
  const { data } = await axiosInstance.get('/')
    setActivities(data)
};

  useEffect(() => {
    fetchDetails();
  },[])

  
  function handleChangeTodo(e) {
    const name = e.target.name;
    const value = e.target.value;
  
    setFormValues({...formValues, [name]:value});
  }

  function handleSubmitTodo(e) {
    e.preventDefault();

    const existingActivity = activities.find(activity => activity.task === formValues.activity);
    if (existingActivity) {
      alert("Data already exists");
      return;
    }

    const json2 = JSON.stringify({
      id: '',
      task : formValues.activity,
      date: formValues.date,
      time: formValues.time,
      priority : formValues.priority 
    });

    fetch('https://todolist-api-two.vercel.app/', {
      method: 'POST',
      body: json2,
      headers: {
        "Content-type": "application/json"
      },
    })

      .then((response) => {
          return response.json();
      })

      .then((data) => {
        setActivities([...activities, data]);
        fetchDetails();
      })
    };


  function showModal(id) {
    setIsModal(true);
    setIsDelete(id);
  }

  const deleteActivity = (id) => {
    fetch(`https://todolist-api-two.vercel.app/${id}`, {
      method: "DELETE",
      headers: {
        'Content-type': 'application/json'
      }
    })

      .then((response) => {
        fetchDetails(response)
      })
       .then (() => {
          setIsModal(false)
       } )
  };


  async function handleOnChange(e) {
    setEditValues({ 
      ...editValues,  [e.target.name] : e.target.value});
  }
  
  async function handleEdit(id) {
    setIsEditTask(true);
    setIsTask(id)
    fetchDetails()
}

async function updateActivity(id) {
  const response = await axiosInstance.get(`/${id}`);
 
  const updatedActivity = {...response.data, ...editValues};

  await axiosInstance.put(`/${id}`, updatedActivity);

  setActivities({...activities, updatedActivity});

  fetchDetails();
  setIsEditTask(false);
}

  const EditTask = () =>
  isEditTask && 
    <TodoEdit 
    isTask={isTask}
    setIsEditTask={setIsEditTask} 
    handleOnChange={handleOnChange} 
    updateActivity={updateActivity}/> 
  

  const AddNewTask = () =>
  isAddTodo && 
      <AddTodo
      setIsAddTodo={setIsAddTodo}
      handleChangeTodo={handleChangeTodo}
      handleSubmitTodo={handleSubmitTodo}/> 
  
  
  useEffect(() => {

    function handleSort() {
      const newItems = [...activities];
      switch (sortBy) {
        case 'latest':
          return newItems.sort((a, b) => b.id - a.id);
        case 'oldest':
          return newItems.sort((a, b) => a.id - b.id);
        case 'descending':
          return newItems.sort((a, b) =>
            a.task.toUpperCase() < b.task.toUpperCase() ? -1 : 1
          );
        case 'ascending':
          return newItems.sort((a, b) =>
            a.task.toUpperCase() < b.task.toUpperCase() ? 1 : -1
          );
        case 'unfinished':
          // return newItems.filter(act => !act.done);
          return newItems.sort((a, b) => !b.done - !a.done);
        default:
          return newItems;
      }
    }

    setActivities(handleSort());
    
  }, [sortBy]);


  const sortTodo = () =>
  <div className="todo__actions">
        {activities.length > 0 && (
          <div className="actions__container">
            <button
              className='sort-btn'
              onClick={() => setIsDropDown((prevState) => !prevState)}>
              <TbArrowsSort className='icon'/>
            </button>
            {isDropDown && (
              <div className="sort__options">
                <ul>
                  {sortOptions.map((option) => (
                    <li
                      onClick={() => {
                        setSortBy(option.sortBy);
                        setIsDropDown(false);
                      }}
                      key={option.title}>
                      {option.img} &nbsp;&nbsp;
                      {option.title}
                      {sortBy === option.sortBy && (
                        <FiCheck
                          alt="checked"
                          className="image__checklist"
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
  </div>

  return (
    <div>
      <div id="main">
        <div className="activity-head">
          <h1 data-cy="activity-title">Hello, </h1>

          <div className='action-detail'>
          {sortTodo()}
          <button type="button" className="btn-tambah" data-cy="activity-add-button" 
              onClick={() => {setIsAddTodo(true)}}>
              + Add</button>
          </div>
        </div>

        <div className="activity-main">
          {activities && Object.values(activities).map((item , index) => 
              <CardActivity
                key={index}
                item={item}
                id={item.id}
                task={item.task} 
                date={item.date}
                time={item.time}
                priority={item.priority}
                activities={activities}
                setActivities={setActivities}
                fetchDetails={fetchDetails}
                handleEdit={handleEdit}
                showModal={showModal}/>)
          }
        </div>

      </div>

      <DeleteModal isModal={isModal} isDelete={isDelete} setIsModal={setIsModal}  deleteActivity={deleteActivity}/>
      {AddNewTask()}
      {EditTask()}

    </div>
  );
}

export default MainActivity;