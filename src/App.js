import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import QwAssistantPage from './202604/QwAssistantPage';
import CourseTabletViewPage from './202604/CourseTabletViewPage';
import CourseBackendPage from './202604/CourseBackendPage';
import './App.css';

function App() {
  return (
    <Router basename="/glskproject">
      <div className="App">
        <header className="App-header">
          <h1>GLSK Project - 202604</h1>
          <nav style={{ marginTop: '20px' }}>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ margin: '10px 0' }}>
                <Link to="/qwassistant">QwAssistant</Link>
              </li>
              <li style={{ margin: '10px 0' }}>
                <Link to="/coursetabletview">Course Tablet View</Link>
              </li>
              <li style={{ margin: '10px 0' }}>
                <Link to="/coursebackend">Course Backend</Link>
              </li>
            </ul>
          </nav>
        </header>
        
        <Routes>
          <Route path="/" element={
            <div style={{ padding: '40px', textAlign: 'center' }}>
              <h2>Welcome to GLSK Project</h2>
              <p>Select a page from the navigation above</p>
            </div>
          } />
          <Route path="/qwassistant" element={<QwAssistantPage />} />
          <Route path="/coursetabletview" element={<CourseTabletViewPage />} />
          <Route path="/coursebackend" element={<CourseBackendPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
