import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import Projects from './pages/Projects';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <BrowserRouter>
      <div style={{ display: 'flex' }}>
        <Sidebar drawerOpen={drawerOpen} setDrawerOpen={setDrawerOpen} />

        <div
          style={{
            flexGrow: 1,
            padding: '20px',
            marginLeft: drawerOpen ? 260 : 72,
            transition: 'margin-left 0.3s',
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects /> } />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
