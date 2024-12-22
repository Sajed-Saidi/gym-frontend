import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axiosApi";
import { Outlet } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const GlobalContext = createContext();

export const useGlobal = () => useContext(GlobalContext);

export const GlobalProvider = ({ children }) => {
  const [plans, setPlans] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [trainingClasses, setTrainingClasses] = useState([]);
  const [settings, setSettings] = useState(null);

  // Shared loading and error states for different entities
  const [loading, setLoading] = useState({
    plans: false,
    trainers: false,
    trainingClasses: false,
    settings: false,
  });

  const [errors, setErrors] = useState({});

  const updateLoading = (key, value) =>
    setLoading((prev) => ({ ...prev, [key]: value }));
  const updateError = (key, error) =>
    setErrors((prev) => ({ ...prev, [key]: error }));

  const fetchPlans = async () => {
    updateLoading("plans", true);
    try {
      const response = await api.get("/plans");
      setPlans(response.data.data);
    } catch (err) {
      updateError("plans", err.message || "Failed to fetch plans.");
    } finally {
      updateLoading("plans", false);
    }
  };

  const fetchTrainers = async () => {
    updateLoading("trainers", true);
    try {
      const response = await api.get("/trainers");
      setTrainers(response.data.data);
    } catch (err) {
      updateError("trainers", err.message || "Failed to fetch trainers.");
    } finally {
      updateLoading("trainers", false);
    }
  };

  const fetchTrainingClasses = async () => {
    updateLoading("trainingClasses", true);
    try {
      const response = await api.get("/training-classes");
      setTrainingClasses(response.data.data);
    } catch (err) {
      updateError("trainingClasses", err.message || "Failed to fetch classes.");
    } finally {
      updateLoading("trainingClasses", false);
    }
  };

  const fetchSettings = async () => {
    updateLoading("settings", true);
    try {
      const response = await api.get("/settings");
      setSettings(response.data.data);
    } catch (err) {
      updateError("settings", err.message || "Failed to fetch settings.");
    } finally {
      updateLoading("settings", false);
    }
  };

  const showNotification = async (message, type = "info") => {
    toast[type](message, {
      autoClose: 3000,
    });
  };

  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState(null);

  const handleApiError = (err) => {
    if (err.response) {
      setAuthError(err.response.data);
    } else if (err.request) {
      setAuthError("Network error. Please check your internet connection.");
    } else {
      setAuthError("Something went wrong. Please try again.");
    }
  };

  // Set the token in the request headers if available
  const setAuthToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  };

  const fetchUser = async () => {
    setAuthLoading(true);
    setAuthToken(); // Set token in headers
    try {
      const response = await api.get("/auth/me");
      setUser(response.data.data);
    } catch (error) {
      showNotification(error.message);
      localStorage.removeItem("token"); // Remove invalid token if user fetching fails
      setUser(null);
    } finally {
      setAuthLoading(false);
    }
  };

  const login = async (email, password) => {
    setAuthLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });

      console.log(response);

      localStorage.setItem("token", response.data.data.token);
      setUser(response.data.data.user);

      return response.data;
    } catch (err) {
      handleApiError(err);
    } finally {
      setAuthLoading(false);
    }
  };

  const signup = async (data) => {
    setAuthLoading(true);
    try {
      const response = await api.post("/auth/register", data);

      localStorage.setItem("token", response.data.data.token);
      setUser(response.data.data.user);
      return response.data;
    } catch (err) {
      handleApiError(err);
    } finally {
      setAuthLoading(false);
    }
  };

  const logout = async () => {
    setAuthLoading(true);
    try {
      const response = await api.post("/auth/logout");

      localStorage.removeItem("token");
      setUser(null);
      setAuthError(null); // Clear any previous errors

      return response.data;
    } catch (err) {
      handleApiError(err);
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    if (authError) {
      showNotification(authError.message, "error");
    }
  }, [authError]);

  return (
    <GlobalContext.Provider
      value={{
        plans,
        trainers,
        trainingClasses,
        settings,
        loading,
        errors,
        fetchPlans,
        fetchTrainers,
        fetchTrainingClasses,
        fetchSettings,
        showNotification,
        login,
        signup,
        logout,
        authLoading,
        authError,
        user,
        fetchUser,
      }}
    >
      {children}
      <Outlet />
      <ToastContainer />
    </GlobalContext.Provider>
  );
};
