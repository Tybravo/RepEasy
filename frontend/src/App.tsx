import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';

import RepEasy from './components/RepEasy';

const App: React.FC = () => {
  return (
    <div>

      <BrowserRouter>
      <Routes>
         <Route path="/" element={<Dashboard />} />
         <Route path="/generate" element={<RepEasy />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;