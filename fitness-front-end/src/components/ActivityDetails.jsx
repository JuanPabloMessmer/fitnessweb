// ActivityDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // <= use react-router-dom
import { getActivityDetail } from "../services/api.jsx";
import { Box, Card, CardContent, Divider, Typography } from "@mui/material";

const ActivityDetails = () => {
    const { id } = useParams();
    const [detail, setDetail] = useState(null); // could be Activity or Recommendation

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const res = await getActivityDetail(id);
                setDetail(res.data);
            } catch (err) {
                console.error(err);
            }
        };
        fetchDetail();
    }, [id]);

    if (!detail) return <Typography>Loading...</Typography>;

    // Try to support both shapes (Activity vs Recommendation)
    const type = detail.type || detail.activityType || "UNKNOWN";
    const duration = detail.duration;
    const calories = detail.caloriesBurned;
    const createdAt =
        detail.createdAt ? new Date(detail.createdAt).toLocaleString() : null;

    const analysisText = detail.recommendation; // Recommendation.analysis flattened in your service
    const improvements = detail.improvements || [];
    const suggestions = detail.suggestions || [];
    const safety = detail.safety || [];

    return (
        <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
            <Card sx={{ mb: 2 }}>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Activity Details
                    </Typography>
                    <Typography>Type: {type}</Typography>
                    {duration != null && (
                        <Typography>Duration: {duration} minutes</Typography>
                    )}
                    {calories != null && (
                        <Typography>Calories Burned: {calories}</Typography>
                    )}
                    {createdAt && <Typography>Date: {createdAt}</Typography>}
                </CardContent>
            </Card>

            {analysisText && (
                <Card>
                    <CardContent>
                        <Typography variant="h5" gutterBottom>
                            AI Recommendation
                        </Typography>

                        <Typography variant="h6">Analysis</Typography>
                        <Typography paragraph>{analysisText}</Typography>

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">Improvements</Typography>
                        {improvements.length > 0 ? (
                            improvements.map((improvement, idx) => (
                                <Typography key={idx} paragraph>
                                    {improvement}
                                </Typography>
                            ))
                        ) : (
                            <Typography paragraph>No improvements provided.</Typography>
                        )}

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">Suggestions</Typography>
                        {suggestions.length > 0 ? (
                            suggestions.map((suggestion, idx) => (
                                <Typography key={idx} paragraph>
                                    {suggestion}
                                </Typography>
                            ))
                        ) : (
                            <Typography paragraph>No suggestions provided.</Typography>
                        )}

                        <Divider sx={{ my: 2 }} />

                        <Typography variant="h6">Safety Guidelines</Typography>
                        {safety.length > 0 ? (
                            safety.map((s, idx) => (
                                <Typography key={idx} paragraph>
                                    {s}
                                </Typography>
                            ))
                        ) : (
                            <Typography paragraph>No safety guidelines provided.</Typography>
                        )}
                    </CardContent>
                </Card>
            )}
        </Box>
    );
};

export default ActivityDetails;
