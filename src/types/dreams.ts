export interface IDream {
    id: number;
    title: string;
    content: string;
    published: boolean;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    likes: number[];
}