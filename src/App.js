import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./login"
import PPTGeneratorPage from "./pages/Home"
import Pages from './pages';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={<Pages />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;