type InputType = 'text' | 'number' | 'email' | 'password';

interface LoginRequest {
    email: string;
    password: string;
}

interface Category {
    id: number;
    name: string;
    createdAt: string;
    isActif: boolean;
    familyId: number;
    familyName?: string;
}

interface Family extends Category {
    categories: Category[];
}

interface TitleDisplay {
    label: string;
    display: string;
}
