import { Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { ApplicationLayout } from './layouts/layout';
import { LoginLayout } from './layouts/login-layout';
import { Dashboard } from './pages/Dashboard';
import { Home } from './pages/Home';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';

function App() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Routes>
        <Route element={<ApplicationLayout />}>
          <Route path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
        </Route>
        <Route element={<LoginLayout />}>
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Route>
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
