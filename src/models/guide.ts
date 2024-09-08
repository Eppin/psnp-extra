import { Extra } from './extra';

export interface Guide {
    id: number
    trophy: number[]
    title: string
    bg: string
    authors: string[]
    data: number[]
    view: number[]
    extra: Extra;
    published: number
    updated?: number
}
