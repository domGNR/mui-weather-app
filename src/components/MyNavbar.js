import {useState}  from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

export default function MyNavbar() {
  const menuItems = [
    {
      id:1,
      text:'Weather'
    },
    {
      id:2,
      text:'Alerts'
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
  const [value, setValue] = useState('Weather');

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
