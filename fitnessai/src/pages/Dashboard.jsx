import { Box, Typography, Card, CardContent } from "@mui/material";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Box className="max-w-3xl mx-auto p-4">
      <Typography variant="h4" gutterBottom className="text-sky-800 font-extrabold">
        Welcome, {user?.preferred_username || user?.name || "User"}!
      </Typography>
      <Card className="mt-4 bg-gradient-to-br from-sky-100 to-blue-50 shadow rounded-lg">
        <CardContent>
          <Typography variant="h6">Today's Summary</Typography>
          <Typography>AI Suggestions: <span className="text-indigo-600">Coming from Gemini</span></Typography>
          <Typography variant="body2">Your BMI will be calculated from UserService</Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
