import {CssBaseline} from '@mui/material'
import MyPaper from './components/MyPaper';
import {useEffect} from 'react'
import {useDispatch,} from 'react-redux'
import { saveDay } from './redux/reducers/api-forecast-reducer';


function App() {
  const dispatch = useDispatch()
  const timeElapsed = Date.now();
  const todayDt = new Date(timeElapsed);
  useEffect(() => {
    dispatch(saveDay({
      'selectedDay':todayDt.getDate(),
      'today':todayDt.getDate(),
    }))
  }, [])
  return (
  <>
    <CssBaseline/>
    <MyPaper/>
  </>
  );
}

export default App;
