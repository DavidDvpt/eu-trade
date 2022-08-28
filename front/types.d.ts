type InputType = 'text' | 'number' | 'email' | 'password';

interface ObjectBase {
    id: number;
    name: string;
    createdAt: string;
    isActif: boolean;
}
interface Category extends ObjectBase {
    familyId: number;
    familyName?: string;
}

interface Item extends ObjectBase {
    categoryId: number;
    value: number;
    ttMax: number;
    imageUrlId: string;
    isStackable: boolean;
    isLimited: boolean;
}

interface Family extends Category {
    categories: Category[];
}

interface Session {
    id: number;
    number: number;
    type: string;
    ttCost: number;
    ttWin: number;
    isOpen: boolean;
}

interface TitleDisplay {
    label: string;
    display: string;
}
