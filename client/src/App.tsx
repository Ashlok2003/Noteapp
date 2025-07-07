import { Route, Routes } from 'react-router-dom';
import { LoginLayout } from './layouts/login-layout';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import LoginPage from './pages/Login';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Routes>
        <Route element={<LoginLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>

        <Route path="/login" element={<LoginPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
