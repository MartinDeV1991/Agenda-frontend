
import './App.css';
import { Route, Routes } from 'react-router-dom'

import Calendar from './Pages/CalendarPage/Calendar';
import WeeklyPage from './Pages/WeeklyPage/WeeklyPage';
import ToDo from './Pages/TodoPage/ToDo';
import NavBar from './Components/Navbar/Navbar';
import FinancePage from './Pages/FinancePage/FinancePage';
import SignUpPage from './Pages/SignUpPage/SignUpPage';
import LogInPage from './Pages/LogInPage/LogInPage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path='/weekly' element={<WeeklyPage />} />
        <Route path='/todo' element={<ToDo />} />
        <Route path='finance' element={<FinancePage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/login' element={<LogInPage />} />
      </Routes>
    </div>
  );
}

export default App;
