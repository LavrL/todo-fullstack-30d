interface User {
    id: number,
    name: string
}

type UserType = {
    id: number,
    name: string
}

interface Person {
    name: string
}

interface Employee extends Person {
    role: string
}

type Animal = {
    species: string
}

type Dog = Animal & {
    bark(): void
}

interface Box {
    height: string
}

interface Box {
    width: string
}
// Box { height: string, width: string}

type Card = {
    height: string
}
// No, No, No
type Card = {
    width: string
}

// Pick, Partial, Exclude, ReturnType
interface Todo {
    id: number;
    title: string;
    description?: string;
    completed: boolean;
}