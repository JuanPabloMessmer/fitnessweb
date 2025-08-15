import React, {useEffect, useState} from "react";
import {Card, CardContent, Grid, Typography} from "@mui/material";
import {useNavigate} from "react-router";
import {getAllActivities} from "../services/api.jsx";

const ActivityList = () => {
    const [activities, setActivities] = useState([]);
    const navigate = useNavigate();

    const fetchActivities = async () => {
      try {
          const response = await getAllActivities();
          setActivities(response.data)
      }  catch (error) {
          console.log(error);
      }
    };

    useEffect(() => {
        fetchActivities();
    },[])
    return (
        <Grid container spacing={2}>
            {activities.map((activity) => (
                <Grid
                    key={activity.id} // ✅ unique key here
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    <Card
                        sx={{ cursor: 'pointer' }}
                        onClick={() => navigate(`/activities/${activity.id}`)}
                    >
                        <CardContent>
                            <Typography variant='h6'>
                                Type: {activity.type}
                            </Typography>
                            <Typography>
                                Duration: {activity.duration}
                            </Typography>
                            <Typography>
                                Calories Burned: {activity.caloriesBurned}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

};

export default ActivityList;
