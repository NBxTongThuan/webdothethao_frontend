import { jwtDecode, JwtPayload } from "jwt-decode";

interface ExtendedJwtPayload extends JwtPayload {
    ROLE?: string;
}

export function isTokenExpired(token: string): boolean {
    const decodedToken = jwtDecode(token);

    if(!decodedToken.exp) {
        return false;
    }

    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;

}

export function isHasToken(): boolean {
    const token = localStorage.getItem('token');
    return !!token;
}

export function getUserName() {
    const token = localStorage.getItem('token');
    if(token)
    {
        return jwtDecode(token).sub;
    }
}


export function getUserRole() {
    const token = localStorage.getItem('token');
    if(token)
    {
        return (jwtDecode(token) as ExtendedJwtPayload).ROLE;
    }
}

export function logOut(navigate: any) {
    navigate('/Login');
    localStorage.removeItem('token');
}

