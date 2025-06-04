import { Routes, Route } from 'react-router-dom';
import OnboardingPage from '@/pages/OnboardingPage';

function App() {
  return (
    <div className='min-h-screen bg-gray-50'>
      <Routes>
        <Route path='/' element={<OnboardingPage />} />
      </Routes>
    </div>
  );
}

export default App;
