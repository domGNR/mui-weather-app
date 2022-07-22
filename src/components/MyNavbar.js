import {useState}  from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {saveDay} from '../redux/reducers/api-forecast-reducer'
import { useDispatch ,useSelector} from 'react-redux'

export default function MyNavbar() {
  const {
    day:{selectedDay,today},
  } = useSelector((state) => state.forecast);
  const dispatch = useDispatch()
  const timeElapsed = Date.now();
  const todayDt = new Date(timeElapsed);
  const menuItems = [
    {
      id:1,
      text:'Today'
    },
    {
      id:2,
      text:'Tomorrow'
    },
    {
      id:3,
      text:'Map'
    },
    {
      id:4,
      text:'Satellite'
    },
    {
      id:5,
      text:'News'
    },
  ]
  const [value, setValue] = useState('Today');

  const handleChange = (event, newValue) => {
    setValue(newValue)
    const newDate = todayDt
    if (newValue==='Today'){
      newDate.setDate(todayDt.getDate())
      dispatch(saveDay({
        'selectedDay':newDate.getDate(),
        'today':today
      }))
      return
    }
    if (newValue==='Tomorrow'){
      newDate.setDate(todayDt.getDate()+1)
      dispatch(saveDay({
        'selectedDay':newDate.getDate(),
        'today':today
      }))
      return
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        textColor="primary"
        indicatorColor="primary"
        aria-label="secondary tabs example"
        sx={{float:'right'}}
      >
        {menuItems.map(el=>{
          return <Tab 
          sx={{padding:0,minWidth:'70px',fontSize:13,textTransform:'none'}}
          key={el.id} value={el.text} label={el.text} />
        })}
      </Tabs>
    </Box>
  );
}
