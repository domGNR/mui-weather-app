import {
  Paper,
  Container,
  Box,
  Stack,
  Typography,
  Button,
  Divider,
  InputBase,
  Tabs,
  Tab,
} from "@mui/material";
import MySearch from "./MySearch";
import MyNavbar from "./MyNavbar";
import Today from "./Today";
import {useState} from 'react'
import MoreOn from "./MoreOn";



const MyPaper = () => {


  return (
    <Container>
      <Paper elevation={0} sx={{ marginTop: "50px", marginBottom: "50px" }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          sx={{ backgroundColor: "#ddd", borderRadius: "5%" }}
        >
          {/* SIDE 1 */}
          <Box
            sx={{
              backgroundColor: "skyblue",
              borderRadius: "5%",
              flex: 1,
              minHeight: 700,
            }}
          >
            <Container>
              <Stack mt={2} justifyContent="space-between" direction="row">
                <Box>forecast</Box>
                <Box>city</Box>
              </Stack>
              <Box
                sx={{
                  height: 700,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                }}
              >
                <Typography variant="h5" fontWeight="bold">
                  The Only weather Forecast You Need
                </Typography>
                <Divider sx={{ width: "60%" }} />
                <MySearch />
              </Box>
            </Container>
          </Box>

          {/* SIDE 2 */}
          <Box
            sx={{
              backgroundColor: "#ddd",
              borderTopRightRadius: "5%",
              borderBottomRightRadius: "5%",
              flex: 1,
              minHeight: 600,
              display:'flex',
              flexDirection:'column',
            }}
          > 
            <Container>
              <MyNavbar />
            </Container>
            <Today />
            <MoreOn/>
          </Box>
          
        </Stack>
      </Paper>
    </Container>
  );
};

export default MyPaper;
