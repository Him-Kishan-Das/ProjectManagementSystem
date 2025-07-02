import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Sidebar from './components/Sidebar';
import { useState } from 'react';
import Projects from './pages/Projects';
import AuthPage from './pages/Auth';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './contexts/AuthContext';
import Admin from './pages/Admin';

function App() {
  const [drawerOpen, setDrawerOpen] = useState(true);

  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
        
        <Route path="/auth" element={<AuthPage />} />

        <Route
          path="*"
          element={
            <PrivateRoute>
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
                    <Route path="/projects" element={<Projects />} />
                    <Route path='/admin-panel' element={<Admin />} />
                  </Routes>
                </div>
              </div>
            </PrivateRoute>
          }
        />
      </Routes>
    </AuthProvider>
    </BrowserRouter>
  );
}

export default App;