
import './App.css';
import { Route, Routes } from 'react-router-dom'

import Calendar from './Pages/Calendar';
import WeeklyPage from './Pages/WeeklyPage';
import NavBar from './Components/Navbar/Navbar';
function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path='/weekly' element={<WeeklyPage />} />
      </Routes>
    </div>
  );
}

export default App;
