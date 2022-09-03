interface AuthState {
    isLogged: boolean;
    token: string | null;
    isAdmin: boolean;
    userId: number | null;
    userPseudo: string | null;
}

interface LoginRequest {
    email: string;
    password: string;
}
