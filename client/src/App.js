import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/home/HomePage';
import RegisterPage from './pages/register/RegisterPage';
import ArticleDetailPage from './pages/articleDetail/ArticleDetailPage';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blog/:id" element={<ArticleDetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
