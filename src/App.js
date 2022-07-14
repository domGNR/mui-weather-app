import {CssBaseline} from '@mui/material'
import MyPaper from './components/MyPaper';
import Test from './components/Test';

function App() {
  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ")
  }
  return (
  <>
    <CssBaseline/>
    <MyPaper/>
    {/* <Test /> */}

  </>
  );
}

export default App;
