import { CUSTOMIZE_LIFESTYLE } from '@/constants';
import React, { createContext, ReactNode, useContext, useState } from 'react';


interface JournalItem {
    id: string;
    label: string;
    desc: string;
    icon?: string;
    emoji?: string;
    active: boolean;
    isPinned?: boolean;
    logTime?: 'Daytime' | 'Nighttime';
    isCustom?: boolean;
    category?: string;
}

interface JournalContextType {
    items: JournalItem[];
    setItems: (items: JournalItem[]) => void;
    updateItem: (id: string, updates: Partial<JournalItem>) => void;
}

const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function JournalProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<JournalItem[]>(CUSTOMIZE_LIFESTYLE as JournalItem[]);

    const updateItem = (id: string, updates: Partial<JournalItem>) => {
        setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    };

    return (
        <JournalContext.Provider value={{ items, setItems, updateItem }}>
            {children}
        </JournalContext.Provider>
    );
}

export function useJournal() {
    const context = useContext(JournalContext);
    if (context === undefined) {
        throw new Error('useJournal must be used within a JournalProvider');
    }
    return context;
}

interface AuthContextType {
    isAuthenticated: boolean;
    user: { name: string; email: string } | null;
    isLoading: boolean;
    signIn: () => void;
    signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [user, setUser] = useState<{ name: string; email: string } | null>({
        name: 'Mobbin',
        email: 'mobbin.design@gmail.com'
    });

    const signIn = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsAuthenticated(true);
            setUser({ name: 'Mobbin', email: 'mobbin.design@gmail.com' });
            setIsLoading(false);
        }, 500);
    };

    const signOut = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    const value = {
        isAuthenticated,
        user,
        isLoading,
        signIn,
        signOut,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}