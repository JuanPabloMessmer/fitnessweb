// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; // <-- use react-router-dom
import "./App.css";
import { Box, Button } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "react-oauth2-code-pkce";
import { useDispatch } from "react-redux";
import { setCredentials } from "./store/authSlice.jsx";

 import ActivityForm from "./components/ActivityForm.jsx";
 import ActivityList from "./components/ActivityList.jsx";
 import ActivityDetail from "./components/ActivityDetails.jsx";


const ActivitiesPage = () => {
    return (
        <Box component="section" sx={{ p: 2, border: "1px dashed grey" }}>
            <ActivityForm onActivitiesAdded={() => window.location.reload()} />
            <ActivityList />
        </Box>
    );
};

function App() {
    const { token, tokenData, logIn } = useContext(AuthContext);
    const dispatch = useDispatch();
    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        if (token) {
            dispatch(setCredentials({ token, user: tokenData }));
            setAuthReady(true);
        }
    }, [token, tokenData, dispatch]);

    return (
        <Router>
            {!token ? (
                <Box sx={{ p: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => {
                            logIn();
                        }}
                    >
                        Login
                    </Button>
                    <div style={{ marginTop: 12 }}>Welcome! Please log in.</div>
                </Box>
            ) : (
                <Box component="main" sx={{ p: 2, border: "1px dashed grey" }}>
                    <Routes>
                        <Route path="/activities" element={<ActivitiesPage />} />
                        <Route path="/activities/:id" element={<ActivityDetail />} />
                        <Route path="/" element={<Navigate to="/activities" replace />} />
                        <Route path="*" element={<Navigate to="/activities" replace />} />
                    </Routes>
                </Box>
            )}
        </Router>
    );
}

export default App;
