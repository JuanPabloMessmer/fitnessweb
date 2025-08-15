import React, { useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import {addActivity} from "../services/api.jsx";

const ActivityForm = ({ onActivityAdded }) => {
    const [activity, setActivity] = useState({
        type: "RUNNING",
        duration: '',
        caloriesBurned: '',
        additionalMetrics: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const userId = localStorage.getItem("userId");
        const payload = {
            ...activity,
            userId,
            additionalMetrics: {}
        }

        try {
            await addActivity(payload); // make sure addActivity is imported
            onActivityAdded();
            setActivity({ type: "RUNNING", duration: '', caloriesBurned: '', additionalMetrics: '' });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mb: 4 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Activity Type</InputLabel>
                <Select value={activity.type} onChange={(e) => setActivity({ ...activity, type: e.target.value })}>
                    <MenuItem value="RUNNING">Running</MenuItem>
                    <MenuItem value="WALKING">Walking</MenuItem>
                    <MenuItem value="CYCLING">Cycling</MenuItem>
                </Select>
            </FormControl>

            <TextField
                fullWidth
                label="Duration (MINUTES)"
                type="number"
                sx={{ mb: 2 }}
                value={activity.duration}
                onChange={(e) => setActivity({ ...activity, duration: e.target.value })}
            />

            <TextField
                fullWidth
                label="Calories Burned"
                type="number"
                sx={{ mb: 2 }}
                value={activity.caloriesBurned}
                onChange={(e) => setActivity({ ...activity, caloriesBurned: e.target.value })}
            />

            <Button type="submit" variant="contained">Add Activity</Button>
        </Box>
    );
};

export default ActivityForm;
