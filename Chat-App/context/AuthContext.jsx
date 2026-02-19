import { createContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

// axios base url setup
axios.defaults.baseURL = backendUrl;

// Create Auth Context
export const Authcontext = createContext();

export const AuthProvider = ({ children }) => {

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const [socket, setSocket] = useState(null);

  // Check if the user is authenticated and if so, set user data and connect the socket
  const checkAuth = async () => {
    try {
      const { data } = await axios.get("/api/auth/check");
      if (data.success) {
        setAuthUser(data.user);
        connectSocket(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Login function to handle user authentication and socket connection
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);

      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);

        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setToken(data.token);
        localStorage.setItem("token", data.token);

        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Logout function to handle user logout and socket disconnection
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);

    axios.defaults.headers.common["Authorization"] = null;

    socket?.disconnect();
    toast.success("Logged out successfully");
    // Force full reload to ensure auth state and headers are reset
    window.location.href = "/login";
  };

  // Update profile function to handle user profile updates
  const updateProfile = async (body) => {
    try {
      console.log("Authorization header being sent:", axios.defaults.headers.common["Authorization"]);
      const { data } = await axios.put("/api/auth/update-profile", body);
      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Connect socket function to handle socket connection and online users updates
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;

    const newSocket = io(backendUrl, {
      query: {
        userId: userData._id,
      },
    });

    newSocket.connect();
    setSocket(newSocket);
    console.log("Socket connecting for user:", userData._id, "socket id:", newSocket.id);

    newSocket.on("connect", () => {
      console.log("Socket connected:", newSocket.id, "for user:", userData._id);
    });

    newSocket.on("getOnlineUsers", (userIds) => {
      console.log("Received getOnlineUsers:", userIds);
      setOnlineUser(userIds);
    });
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      checkAuth();
    }
  }, [token]);

  const value = {
    authUser,
    onlineUser,
    // backward-compatible alias used across components
    onlineUsers: onlineUser,
    socket,
    login,
    logout,
    updateProfile,
  };

  return (
    <Authcontext.Provider value={value}>
        {children}
    </Authcontext.Provider>
  );
};
