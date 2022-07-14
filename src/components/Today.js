import { Typography, Box, Stack, Container, Paper, Divider } from "@mui/material";
import {WiCloudy,WiDayThunderstorm} from 'weather-icons-react'

const Today = () => {
  return (
    <>
      <Container>
        <Typography variant="h3">Today</Typography>
        <Paper sx={{my:2}} elevation={4}>
          <Stack direction='row' py={2} justifyContent='space-around'>
            {/* side 1 */}
            <Stack direction='column' spacing={1}>
                <Typography variant="h3" fontWeight='bold'>30°</Typography>
                <Typography variant="h4" >Clouds
                <Box sx={{px:'16px',display:'inline-block',position:'relative',top:'10px'}}><WiDayThunderstorm size={40}/></Box></Typography>
                <Box sx={{pt:1}}>
                <Typography variant="overline" sx={{lineHeight:'inherit'}}>Broken Clouds</Typography>
                <Typography variant="body1" sx={{padding:0,margin:0 }}>Monday Jul 11</Typography>
                </Box>
            </Stack>

            {/* side 2 */}
            <Box sx={{display:'flex',alignItems:'center'}}>
                <Divider variant='middle' orientation='vertical' sx={{margin:'8px'}}/>
                <Stack direction='column'>
                    <Typography variant="subtitle1">Real feel:</Typography>
                    <Typography variant="subtitle1">Humidity:</Typography>
                    <Typography variant="subtitle1">Cloud Cover:</Typography>
                    <Typography variant="subtitle1">Min Temp:</Typography>
                    <Typography variant="subtitle1">Max Temp:</Typography>
                </Stack>
            </Box>
          </Stack>
        </Paper>
      </Container>
    </>
  );
};

export default Today;
