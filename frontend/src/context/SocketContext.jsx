import React, { createContext, useEffect } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`); // Replace with your server URL

const SocketProvider = ({ children }) => {
    useEffect(() => {
        // 👇 make socket globally accessible (for debugging / other components)
        window.socket = socket;

        socket.on('connect', () => {
            console.log('Connected to server ✅', socket.id);
        });

        socket.on('disconnect', () => {
            console.log('Disconnected from server ❌');
        });

    }, []);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};

export default SocketProvider;
