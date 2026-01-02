import React, { createContext, useContext, useState, useEffect } from 'react';

const ConnectivityContext = createContext();

export function ConnectivityProvider({ children }) {
    const [isOnline, setIsOnline] = useState(navigator.onLine);
    const [isLowDataMode, setIsLowDataMode] = useState(false);

    useEffect(() => {
        const handleOnline = () => setIsOnline(true);
        const handleOffline = () => setIsOnline(false);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        if (navigator.connection) {
            const updateConnectionStatus = () => {
                const { saveData, effectiveType } = navigator.connection;
                if (saveData === true || effectiveType === '2g' || effectiveType === 'slow-2g') {
                    setIsLowDataMode(true);
                } else {
                    setIsLowDataMode(false);
                }
            };

            navigator.connection.addEventListener('change', updateConnectionStatus);
            updateConnectionStatus();

            return () => {
                window.removeEventListener('online', handleOnline);
                window.removeEventListener('offline', handleOffline);
                navigator.connection.removeEventListener('change', updateConnectionStatus);
            };
        }

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <ConnectivityContext.Provider value={{ isOnline, isLowDataMode }}>
            {!isOnline && (
                <div style={{
                    backgroundColor: '#b91c1c',
                    color: 'white',
                    textAlign: 'center',
                    padding: '8px',
                    fontSize: '0.85rem',
                    fontWeight: '500',
                    position: 'sticky',
                    top: 0,
                    zIndex: 9999
                }}>
                    ⚠️ Offline Mode: Using cached data
                </div>
            )}
            {children}
        </ConnectivityContext.Provider>
    );
}

export function useConnectivity() {
    return useContext(ConnectivityContext);
}
