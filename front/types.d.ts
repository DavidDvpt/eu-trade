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
}

interface Family extends Category {
  categories: Category[];
}
