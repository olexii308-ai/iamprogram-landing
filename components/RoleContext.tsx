'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type UserRole = 'default' | 'therapist' | 'clinic' | 'student';

interface RoleContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
}

const RoleContext = createContext<RoleContextType | undefined>(undefined);

const allowedRoles: UserRole[] = ['default', 'therapist', 'clinic', 'student'];

function resolveInitialRole(): UserRole {
  if (typeof window === 'undefined') return 'default';
  const saved = localStorage.getItem('role');
  return allowedRoles.includes(saved as UserRole) ? (saved as UserRole) : 'default';
}

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<UserRole>(resolveInitialRole);

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
