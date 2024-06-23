import { useContext } from "react";
import { UserContext } from "../context/userContext";

export function useUser() {
    const { user, saveUser, clearUser, loading } = useContext(UserContext);

    const login = (user) => {
        saveUser(user);
    };

    const logout = () => {
        clearUser();
    };

    return { user, login, logout, loading };
}