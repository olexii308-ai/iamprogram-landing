'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'default' | 'therapist' | 'clinic' | 'student';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>('default');

  useEffect(() => {
    const saved = localStorage.getItem('role') as UserRole;
    if (saved && ['default', 'therapist', 'clinic', 'student'].includes(saved)) {
      setRoleState(saved);
    }
  }, []);

  const setRole = (r: UserRole) => {
    setRoleState(r);
    localStorage.setItem('role', r);
  };

  return (
    <RoleContext.Provider value={{ role, setRole }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
}
