
import './App.css';
import { Route, Routes } from 'react-router-dom'

import Calendar from './Pages/Calendar';
import WeeklyPage from './Pages/WeeklyPage';
import ToDo from './Pages/ToDo';
import NavBar from './Components/Navbar/Navbar';
import FinancePage from './Pages/FinancePage';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path='/weekly' element={<WeeklyPage />} />
        <Route path='/todo' element={<ToDo />} />
        <Route path='finance' element={<FinancePage />} />
      </Routes>
    </div>
  );
}

export default App;
