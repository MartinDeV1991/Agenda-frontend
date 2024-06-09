
import CalendarCards from "../Components/Calendar/CalendarCards";
import dummyData from "../Data/dummy-data-todo";
import './calendar.css'

const Calendar = () => {
    return (
        <div style={{ padding: '20px' }}>
            <h1>Weekly Agenda</h1>
            <CalendarCards data={dummyData} />
        </div>
    )
}

export default Calendar;