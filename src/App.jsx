
import Log from './Log'
import Dash from './Dash';
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

function App() {


  return (
    <>
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Log />} />

        <Route path="/dashboard" element={<Dash />} />

      </Routes>

    </BrowserRouter>
     
    </>
  )
}

export default App;
