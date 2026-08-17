
import Login from './Log'
import Dash from './Dash';
import './App.css'
import { Routes, Route, HashRouter } from 'react-router-dom';

function App() {


  return (
    <>
    <HashRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/dashboard" element={<Dash />} />

      </Routes>

    </HashRouter>
     
    </>
  )
}

export default App;
