import { useSelector, useDispatch } from 'react-redux';
import { changeCount } from './store/actions/countActions';

function App() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.count);

  const countChangeHandler = (type) => {
    dispatch(changeCount(type));
  };

  return (
    <div>
      <p>{count.number}</p>
      <div>
        <button onClick={() => countChangeHandler('DECREASE')}>감소</button>
        <button onClick={() => countChangeHandler('INCREASE')}>증가</button>
      </div>
    </div>
  );
}

export default App;
