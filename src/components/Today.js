import { Typography, Box, Stack, Container, Paper, Divider } from "@mui/material";
import {useDispatch, useSelector} from 'react-redux'
import degConversion from '../utils/degConversion'
import getIcon from '../utils/getIcon'
const Today = () => {
  const {forecasts:{list}, deg} = useSelector((state) => state.forecast)
  const timeElapsed = Date.now();
const today = new Date(timeElapsed);
  return (
    <>
      <Container>
        <Typography variant="h3">Today</Typography>
        <Paper sx={{my:2}} elevation={4}>
          <Stack direction='row' py={2} justifyContent='space-around'>
            {/* side 1 */}
            <Stack direction='column' spacing={1}>
                <Typography variant="h3" fontWeight='bold'>{degConversion(deg,list[0].main.temp)}</Typography>
                <Typography variant="h4" >{list[0].weather[0].main}
                <Box sx={{px:'4px',display:'inline-block',position:'relative',top:'15px'}}>
                  <img src={getIcon(today.getHours(),list[0].weather[0].id)} alt={list[0].weather[0].description}/></Box></Typography>
                {/* {console.log()} */}
                
                 {/* {
                    console.log(list[0].weather[0].id)
                 } */}
                <Box sx={{pt:1}}>
                <Typography variant="overline" sx={{lineHeight:'inherit'}}>{list[0].weather[0].description}</Typography>
                <Typography variant="body1" sx={{padding:0,margin:0 }}>{`${today.toDateString()} ${today.getHours()}:${today.getMinutes().toFixed().length === 1 ?  '0' + today.getMinutes().toFixed() : today.getMinutes().toFixed() }`}</Typography>
                </Box>
            </Stack>

            {/* side 2 */}
            <Box sx={{display:'flex',alignItems:'center'}}>
                <Divider variant='middle' orientation='vertical' sx={{margin:'8px'}}/>
                <Stack direction='column'>
                    <Typography variant="subtitle1">Real feel: {degConversion(deg,list[0].main.feels_like)}</Typography>
                    <Typography variant="subtitle1">Humidity: {list[0].main.humidity}%</Typography>
                    {/* <Typography variant="subtitle1">Cloud Cover:</Typography> */}
                    <Typography variant="subtitle1">Min Temp: {degConversion(deg,list[0].main.temp_min)}</Typography>
                    <Typography variant="subtitle1">Max Temp: {degConversion(deg,list[0].main.temp_max)}</Typography>
                </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default Today;
