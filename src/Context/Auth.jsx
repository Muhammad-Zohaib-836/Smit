import React, { useState, createContext, useContext } from 'react'
import { message } from 'antd'

const Auth = createContext();
const initialState = { isAuth: false, user: null };

const AuthContext = ({ children }) => {
    const [state, setState] = useState(initialState);
    const [isLoading, setIsLoading] = useState(false);

    // 1. Handling the Login Action
    const handleLogin = async (email, password) => {
        setIsLoading(true);
        try {
            // Yahan aap apna actual API fetch request call kar sakte hain
            console.log("Context matching credentials for:", email);

            // Mock Success Response Simulation:
            const mockUser = { email: email, name: "Student" };
            
            // State update toggles layout structures application-wide
            setState({ isAuth: true, user: mockUser });
            message.success("Logged in successfully!");
            return true; // Component code paths know it succeeded
        } catch (error) {
            console.error(error);
            message.error("Login authentication process failed.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // 2. Handling Password Creation / Update Logic
    const handlePasswordUpdate = async (email, dob, password) => {
        setIsLoading(true);
        try {
            console.log("Context updating security structures for:", email, dob);

            // API Call setup targets profile record changes
            message.success("Account password set up successfully!");
            return true;
        } catch (error) {
            console.error(error);
            message.error("Could not update account authentication parameters.");
            return false;
        } finally {
            setIsLoading(false);
        }
    };

    // 3. Optional Clear Logout Mechanism
    const handleLogout = () => {
        setState(initialState);
        message.info("Logged out from system session.");
    };

    return (
        <Auth.Provider value={{ ...state, isLoading, handleLogin, handlePasswordUpdate, handleLogout }}>
            {children}
        </Auth.Provider>
    )
}

export default AuthContext
export const useAuth = () => useContext(Auth);