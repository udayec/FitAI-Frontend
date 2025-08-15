// src/pages/Activities.jsx
import ActivityForm from "../components/ActivityForm";
import ActivityList from "../components/ActivityList";
import { Box } from "@mui/material";

const Activities = () => (
  <Box className="p-4 w-full max-w-4xl mx-auto">
    <h1 className="text-2xl font-bold mb-2 text-sky-700">Your Activities</h1>
    <p className="mb-6 text-gray-500">Track and manage your physical activities here.</p>
    <ActivityForm onActivityAdded={() => window.location.reload()} />
    <ActivityList />
  </Box>
);
export default Activities;
