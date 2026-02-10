import {create} from "zustand";
import { axiosInstance } from "../lib/axios";

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,

    signup: async (registerData) => {
        set({loading: true});

        try {
            await axiosInstance.post("/auth/register", registerData);

            return true;
        } catch (error) {
            console.log("Error registering user:", error);
            return false
        } finally {
            set({loading: false});
        }
    },

    login: async (loginData) => {
        set({loading: true});

        try {
            const res = await axiosInstance.post("/auth/login", loginData);

            set({user: res.data.user});
        } catch (error) {
            console.log("Error during login:", error);
        } finally {
            set({loading: false});
        }
    },

    profile: async () => {
        try {
            const res = await axiosInstance.get("/auth/profile");

            set({user: res.data.user});
        } catch (error) {
            console.log("Error getting profile: ", error);
        }
    },

    logout: async () => {
        set({loading: true});

        try {
            await axiosInstance.post("/auth/logout");
            set({user: null});
            return true;
        } catch (error) {
            console.log("Error during logout:", error);
            return false;
        } finally {
            set({loading: false});
        }
    }
}))