import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom'

import Calendar from './Pages/Calendar';
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Calendar />} />
      </Routes>
    </div>
  );
}

export default App;
