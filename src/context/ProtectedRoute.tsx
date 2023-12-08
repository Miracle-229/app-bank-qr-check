import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

function ProtectRouteScan({ children }: { children: ReactNode }) {
  const user = localStorage.getItem('work');
  if (!user) {
    return <Navigate to="/" />;
  }
  return <div>{children}</div>;
}

export default ProtectRouteScan;
