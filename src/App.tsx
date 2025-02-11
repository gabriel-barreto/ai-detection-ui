import { SignInForm } from '@/components/sign-in.form';
import { SignUpForm } from '@/components/sign-up.form';
import { Auth } from '@/layout/auth';
import { BrowserRouter, Route, Routes } from 'react-router';
import { Dashboard } from './pages/Dashboard.page';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' Component={Auth}>
          <Route index Component={SignInForm} />
          <Route path='/registre-se' Component={SignUpForm} />
        </Route>
        <Route path='dashboard' Component={Dashboard} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
