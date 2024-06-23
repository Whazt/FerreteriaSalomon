import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Cargar usuario desde localStorage si está disponible
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); // Indicar que la carga ha terminado
    }, []);

    const saveUser = (user) => {
        setUser(user);
        localStorage.setItem("user", JSON.stringify(user));
    };

    const clearUser = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <UserContext.Provider value={{ user, saveUser, clearUser, loading }}>
            {children}
        </UserContext.Provider>
    );
}