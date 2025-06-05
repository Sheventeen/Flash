import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom';
import SignupPage from './pages/SignupPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import VerifyEmailPage from './pages/VerifyEmailPage.jsx';
import { useAuthStore } from './store/authStore.js';
import { useEffect } from 'react';
import DashBoardPage from './pages/DashBoardPage.jsx';
import ForgotPasswordPage from './pages/ForgotPasswordPage.jsx';
import ResetPasswordPage from './pages/ResetPasswordPage.jsx';

const ProtectedRoute = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();

  if(!isAuthenticated){
    return <Navigate to='/login' replace />;
  }
  if(!user.isVerified) {
    return <Navigate to='/verify-email' replace />;
  }
  return children;
}


const RedirectAuthenticatedUser = ({children}) => {
  const {isAuthenticated, user} = useAuthStore();
  if(isAuthenticated && user.isVerified){
    return <Navigate to='/dashboard' replace />
  }
  return children;
};

function App() {
  const {isCheckingAuth, checkAuth, isAuthenticated, user} = useAuthStore();

  useEffect(() => {
    checkAuth()
  },[checkAuth])

  console.log('user',user);
  return (
    
      <div className='min-h-screen bg-[#1c1d22] border-1 border-amber-50 text-2xl text-amber-50 '>
     
        <Routes>
          <Route path='/home' element={
              'home' 
          } />

          <Route path='/dashboard' element={
            <ProtectedRoute>
              <DashBoardPage />
            </ProtectedRoute>
          } />

          <Route path='/signup' element={
            <RedirectAuthenticatedUser>
              <SignupPage/>
            </RedirectAuthenticatedUser>
            } />

          <Route path='/login' element={
            <RedirectAuthenticatedUser>
              <LoginPage/>
            </RedirectAuthenticatedUser>} />  


          <Route path='/forgot-password' element={
            <RedirectAuthenticatedUser>
              <ForgotPasswordPage /> 
            </RedirectAuthenticatedUser>
            } />

            <Route path='/reset-password/:resetToken' element={
              <RedirectAuthenticatedUser>
                <ResetPasswordPage /> 
              </RedirectAuthenticatedUser>
            } />
            
            <Route path='/verify-email' element={<VerifyEmailPage />} />  
        </Routes>
      </div>
    
  )
}
export default App
