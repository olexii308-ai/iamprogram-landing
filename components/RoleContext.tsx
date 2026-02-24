'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'default' | 'therapist' | 'clinic' | 'student';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const allowedRoles: UserRole[] = ['default', 'therapist', 'clinic', 'student'];

export function RoleProvider({ children }: { children: ReactNode }) {
  // Always start with 'therapist' to match SSR — prevents hydration mismatch
  const [role, setRoleState] = useState<UserRole>('therapist');

  // Sync from localStorage AFTER mount (client-only)
  useEffect(() => {
    const saved = localStorage.getItem('role');
    if (saved && allowedRoles.includes(saved as UserRole)) {
      setRoleState(saved as UserRole);
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
