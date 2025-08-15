import { Box, Typography, Card, CardContent } from "@mui/material";
import { useEffect, useState } from "react";
import { getUser } from "../services/api";

const Profile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;
      try {
        const { data } = await getUser(userId);
        setProfile(data);
      } catch (error) {}
    };
    loadProfile();
  }, []);

  return (
    <Box className="max-w-xl mx-auto p-4">
      <Typography variant="h4" gutterBottom className="text-sky-800">Profile</Typography>
      {profile ? (
        <Card className="mt-4 shadow rounded-lg">
          <CardContent>
            <Typography>Name: <b>{profile.firstName} {profile.lastName}</b></Typography>
            <Typography>Email: {profile.email}</Typography>
            <Typography>Height: {profile.height ? `${profile.height} cm` : "—"}</Typography>
            <Typography>Weight: {profile.weight ? `${profile.weight} kg` : "—"}</Typography>
            <Typography>BMI: {profile.bmi || "—"}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>Loading...</Typography>
      )}
    </Box>
  );
};
export default Profile;
