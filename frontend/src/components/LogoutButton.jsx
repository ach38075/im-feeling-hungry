import React, { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { RefreshContext } from '../context/RefreshContext';

export function LogoutButton() {
    const navigate = useNavigate(); 
    const { setRefresh } = useContext(RefreshContext);

    const handleLogout = async () => {
        const token = localStorage.getItem('token'); // Retrieve token from local storage

        const response = await fetch('http://localhost:8080/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (response.ok) {
            localStorage.removeItem('token'); // Remove token from local storage
            localStorage.removeItem('username'); // Remove token from local storage
            setRefresh(prev => !prev);
            alert("Logout successful!");
            setTimeout(() => navigate("/login"), 100); // redirect to login page
        } else {
            localStorage.removeItem('username'); // Remove token from local storage
            alert("Logout failed - must be signed in to logout");
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
};
