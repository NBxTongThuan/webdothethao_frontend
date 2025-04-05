import { jwtDecode, JwtPayload } from "jwt-decode";

interface ExtendedJwtPayload extends JwtPayload {
    ROLE?: string;
    isActivated?: boolean;
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

export function getUserName(token:string) {
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

export function getUserIsActive() {
    const token = localStorage.getItem('token');
    if(token)
    {
        return (jwtDecode(token) as ExtendedJwtPayload).isActivated;
    }
}

export function logOut(navigate: any) {
    navigate('/Login');
    localStorage.removeItem('token');
    localStorage.removeItem('cartID');
    window.dispatchEvent(new Event("storage"));
}

