import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Home from './pages/Home.jsx';
import ProfileDetail from './pages/ProfileDetail.jsx';
import Admin from './pages/Admin.jsx';

function App() {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile/:id" element={<ProfileDetail />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </Router>
    );
}

export default App;

// This code sets up a React application with routing using react-router-dom.
// It defines three routes: the home page, a profile details page, and an admin page.