import { getToken } from "@/utils";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface AuthRouterProps{
    children: ReactNode;
};

function AuthRouter({ children }: AuthRouterProps) {
    const token = getToken()
    if (token) {
        return <>{children}</>
    } else {
        return <Navigate to={'/login'} replace />
    }
}

export default AuthRouter