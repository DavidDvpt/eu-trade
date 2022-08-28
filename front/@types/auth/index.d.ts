interface AuthState {
    isLogged: boolean;
    token: string | null;
    isAdmin: boolean;
    userId: number | null;
    userPseudo: string | null;
    loginModal: boolean;
}

interface LoginRequest {
    email: string;
    password: string;
}
