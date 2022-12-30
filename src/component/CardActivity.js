import axios from 'axios';
import { HiOutlineTrash } from "react-icons/hi";
import { MdOutlineModeEditOutline} from "react-icons/md";

function CardActivity({item, id, task, date, time, priority, activities, setActivities, fetchDetails, handleEdit, showModal}) {

    async function updateCheck() {
      const response = await axios.get(`http://localhost:8001/activity/${id}`);
      const item = response.data;
      const updatedCheck = { ...item, done: !item.done };
      await axios.put(`http://localhost:8001/activity/${id}`, updatedCheck);
      setActivities(
        activities.map(el => (el.id === id ? updatedCheck : el))
      );
      fetchDetails();
    }

  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  function getDayName(date = new Date(), locale = 'en-US') {
    return date.toLocaleDateString(locale, {weekday: 'long'});
  }
  const current = new Date(item.date);
  const dateNow = `${getDayName(new Date(item.date))}, ${current.getDate()} ${monthNames[current.getMonth()]}`;

  

  return (
          <div className="card-activity" data-cy="activity-item"
            key={id}
            style={{ textDecoration: item.done ? "line-through" : null  }}>

                <div className='card-wrap'>
                  <input className='check' type="checkbox" onClick={() => updateCheck(id)} defaultChecked={item.done} />
                </div>
                
                <div className="card-body">
                  <p className="card-title" data-cy="activity-item-title">{task}</p>
                </div>

                <div className="card-footer">
                <p>{item.date === "" || item.date === undefined ? 'no date' : dateNow}</p>

                    <div className='edit-btn'>
                    <MdOutlineModeEditOutline className='edit-icon' 
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit({id, task, date, time, priority}) }}/>
                    </div>
                    <div className="delete-btn" data-cy="activity-item-delete-button" > 
                      <HiOutlineTrash 
                      onClick={(e) => {
                        e.stopPropagation();
                        showModal({id, task})}}/> 
                    </div>
                </div>
          </div>
  )
}

export default CardActivity