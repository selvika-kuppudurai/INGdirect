import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./login"
import PPTGeneratorPage from "./pages/Home"
import Pages from './pages';

function App() {
return (
  // <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <Router>
            <Routes>
                <Route path='/*' element={<Pages/>}/>
                <Route path="/" element={<Login/>}/>
            </Routes>
        </Router>
</body>
</html>
)
}

export default App;
