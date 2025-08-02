import axios, { AxiosResponse } from "axios";

// API base URL - replace with your Django backend URL
const API_BASE_URL = process.env.VITE_API_URL || "http://localhost:8000";

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000, // 30 seconds
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      localStorage.removeItem("auth_token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

// API functions for each agent

// YouTube Summarizer API
export const summarizeYoutube = async (url: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post("/api/summarize-youtube/", {
      youtube_url: url,
    });
    return response.data;
  } catch (error) {
    console.error("YouTube summarization error:", error);
    throw error;
  }
};

// PDF Q&A API
export const askFromPDF = async (file: File, query: string): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("pdf_file", file);
    formData.append("query", query);

    const response: AxiosResponse = await api.post("/api/ask-from-pdf/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("PDF Q&A error:", error);
    throw error;
  }
};

// Resume Matcher API
export const matchResume = async (resumeFile: File, jobDescription: string): Promise<any> => {
  try {
    const formData = new FormData();
    formData.append("resume_file", resumeFile);
    formData.append("job_description", jobDescription);

    const response: AxiosResponse = await api.post("/api/resume-matcher/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Resume matching error:", error);
    throw error;
  }
};

// Auth API functions
export const loginUser = async (email: string, password: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post("/api/auth/login/", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Login error:", error);
    throw error;
  }
};

export const signupUser = async (fullName: string, email: string, password: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post("/api/auth/signup/", {
      full_name: fullName,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
};

export const verifyOTPCode = async (email: string, otp: string): Promise<any> => {
  try {
    const response: AxiosResponse = await api.post("/api/auth/verify-otp/", {
      email,
      otp,
    });
    return response.data;
  } catch (error) {
    console.error("OTP verification error:", error);
    throw error;
  }
};

export default api;