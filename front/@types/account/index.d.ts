interface User {
    id: number;
    email: string;
    pseudo: string;
    cratedAt: string;
    datas?: GlobalUserData;
}
interface GlobalUserData {
    id: number;
    initialPedCardValue: number;
}
interface AccountState {
    user: User | null;
    globalUserData: GlobalUserData | null;
}
