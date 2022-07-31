interface Category {
  id: number;
  name: string;
  createdAt: string;
  isActif: boolean;
}

interface Family extends Category {
  categories: Category[];
}
