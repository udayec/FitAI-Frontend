import { Box, Button, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Navigate, Route, Routes, useLocation } from "react-router";
import { setCredentials } from "./store/authSlice";
import ActivityForm from "./components/ActivityForm";
import ActivityList from "./components/ActivityList";
import ActivityDetail from "./components/ActivityDetail";
import Navbar from "./components/Navbar";
import Activities from "./pages/Activities";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

const ActvitiesPage = () => {
  return (<Box sx={{ p: 2, border: '1px dashed grey' }}>
    <ActivityForm onActivityAdded = {() => window.location.reload()} />
    <ActivityList />
  </Box>);
}

function App() {
  const { token, tokenData, logIn, logOut, isAuthenticated } = useContext(AuthContext);
  const dispatch = useDispatch();
  const [authReady, setAuthReady] = useState(false);
  
  useEffect(() => {
    if (token) {
      dispatch(setCredentials({token, user: tokenData}));
      setAuthReady(true);
    }
  }, [token, tokenData, dispatch]);

  return (
    <Router>
      {!token ? (
      <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" gutterBottom>
        Welcome to the Fitness Tracker App
      </Typography>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        Please login to access your activities
      </Typography>
      <Button variant="contained" color="primary" size="large" onClick={() => {
                logIn();
              }}>
        LOGIN
      </Button>
    </Box>
            ) : (
              // <div>
              //   <pre>{JSON.stringify(tokenData, null, 2)}</pre>
              //   <pre>{JSON.stringify(token, null, 2)}</pre>
              // </div>

             
              
              <Box sx={{ p: 2, border: '1px dashed grey' }}>
                <Navbar/>
              <Routes>
                <Route path="/activities" element={<ActvitiesPage />}/>
                <Route path="/activities/:id" element={<ActivityDetail />}/>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/activities" element={<Activities />} />
                <Route path="/" element={token ? <Navigate to="/activities" replace/> : <div>Welcome! Please Login.</div>} />
              </Routes>
            </Box>
            )}
    </Router>
  )
}

export default App