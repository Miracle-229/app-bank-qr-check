import './App.css';
// eslint-disable-next-line import/no-extraneous-dependencies
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './Routes/routes';
import ProtectRouteScan from './context/ProtectedRoute';

function App() {
  return (
    <BrowserRouter basename="/app-bank-qr-check/">
      <Routes>
        {routes.public.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={<route.element />}
          />
        ))}
      </Routes>
      <Routes>
        {routes.work.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={
              <ProtectRouteScan>
                <route.element />
              </ProtectRouteScan>
            }
          />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
