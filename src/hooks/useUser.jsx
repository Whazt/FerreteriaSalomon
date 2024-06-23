import { useContext } from "react";
import { UserContext } from "../context/userContext";

export function useUser() {
    const { user, setUser } = useContext(UserContext);

    const login = (user) => {
        setUser(user);
    }

    const logout = () => {
        setUser(null);
    }

    return { user, login, logout };
}