import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { addActivity } from '../services/api'
import toast from "react-hot-toast";

const activityTypes = [
  { value: "RUNNING", label: "Running 🏃" },
  { value: "WALKING", label: "Walking 🚶" },
  { value: "CYCLING", label: "Cycling 🚴" },
  { value: "SWIMMING", label: "Swimming 🏊" },
  { value: "WEIGHT_TRAINING", label: "Weight Training 🏋️" },
  { value: "YOGA", label: "Yoga 🧘" },
  { value: "HIT", label: "HIIT 💥" },
  { value: "CARDIO", label: "Cardio 💓" },
  { value: "STRETCHING", label: "Stretching 🤸" },
  { value: "OTHER", label: "Other 🌀" },
];


const ActivityForm = ({ onActivityAdded }) => {
  const [activity, setActivity] = useState({ type: "RUNNING", duration: '', caloriesBurned: '', additionalMetrics: {} });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field, value) => setActivity(prev => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await addActivity(activity);
      onActivityAdded();
      setActivity({ type: "RUNNING", duration: '', caloriesBurned: '' });
      toast.success("Activity added!");
    } catch (error) {
      toast.error("Failed to add activity.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 max-w-lg w-full mx-auto mb-8 space-y-4">
      <FormControl fullWidth>
        <InputLabel>Activity Type</InputLabel>
        <Select
          value={activity.type}
          size="medium"
          onChange={e => handleChange("type", e.target.value)}
          className="mb-2"
        >
          {activityTypes.map(a => <MenuItem value={a.value} key={a.value}>{a.label}</MenuItem>)}
        </Select>
      </FormControl>
      <TextField
        label="Duration (Minutes)"
        type="number"
        required
        fullWidth
        inputProps={{ min: 1, max: 600 }}
        value={activity.duration}
        onChange={e => handleChange("duration", e.target.value)}
      />
      <TextField
        label="Calories Burned"
        type="number"
        required
        fullWidth
        inputProps={{ min: 1 }}
        value={activity.caloriesBurned}
        onChange={e => handleChange("caloriesBurned", e.target.value)}
      />
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={submitting}
        className="text-md font-semibold"
      >
        {submitting ? "Adding..." : "Add Activity"}
      </Button>
    </form>
  );
};

export default ActivityForm
