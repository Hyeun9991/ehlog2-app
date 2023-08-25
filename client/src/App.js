import { useSelector, useDispatch } from 'react-redux';
import { changeCount } from './store/actions/countActions';
import HomePage from './pages/home/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  const countChangeHandler = (type) => {
    dispatch(changeCount(type));
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
      {/* <p>{count.number}</p>
      <div>
        <button onClick={() => countChangeHandler('DECREASE')}>감소</button>
        <button onClick={() => countChangeHandler('INCREASE')}>증가</button>
      </div> */}
    </Router>
  );
}

export default App;
