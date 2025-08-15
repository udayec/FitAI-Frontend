// src/components/ActivityDetail.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getActivityDetail } from '../services/api';
import { Box, Card, CardContent, Divider, Typography, Chip, Skeleton } from '@mui/material';

const Section = ({ title, items }) => (
  <>
    <Typography variant="h6" className="mt-4 text-blue-700">{title}</Typography>
    {items && items.length > 0 ? (
      <ul className="list-disc list-inside space-y-1">
        {items.map((item, idx) => (
          <li key={idx}><Typography variant="body2">{item}</Typography></li>
        ))}
      </ul>
    ) : (
      <Typography color="text.secondary">No data.</Typography>
    )}
  </>
);

const ActivityDetail = () => {
  const { id } = useParams();
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getActivityDetail(id)
      .then(res => { setRecommendation(res.data); setLoading(false); })
      .catch(err => { setLoading(false); });
  }, [id]);

  if (loading) return <Skeleton variant="rectangular" width="100%" height={300} />;
  if (!recommendation) return <Typography color="error">Not found</Typography>;

  const { type, duration, caloriesBurned, createdAt, recommendation: recText, improvements, suggestions, safety } = recommendation;

  return (
    <Box className="max-w-2xl mx-auto p-4">
      <Card className="mb-4 shadow-xl rounded-lg">
        <CardContent>
          <Typography variant="h5" className="font-bold mb-1">Activity Details</Typography>
          <Chip label={type} color="primary" className="mb-2" />
          <div className="flex gap-4 flex-wrap">
            <Typography>⏱️ <b>{duration}</b> min</Typography>
            <Typography>🔥 <b>{caloriesBurned}</b> kcal</Typography>
          </div>
          <Typography className="text-gray-500 text-sm">Date: {createdAt && new Date(createdAt).toLocaleString()}</Typography>
        </CardContent>
      </Card>

      <Card className="rounded-lg">
        <CardContent>
          <Typography variant="h5" className="mb-2">AI Recommendation</Typography>
          <Divider flexItem className="my-2" />
          <Typography className="whitespace-pre-wrap text-gray-800" paragraph>{recText}</Typography>
          <Divider flexItem className="my-2" />
          <Section title="Improvements" items={improvements} />
          <Section title="Suggestions" items={suggestions} />
          <Section title="Safety Guidelines" items={safety} />
        </CardContent>
      </Card>
    </Box>
  );
};

export default ActivityDetail;
