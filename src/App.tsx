import { Route, Routes, useLocation } from 'react-router-dom';
import Main from './components/Main';
import Home from './pages/Home/Home';
import './scss/app.scss';

const App = () => {
  return (
    <div className="conatiner">
      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Main />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
