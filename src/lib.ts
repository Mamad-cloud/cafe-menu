//import { generateUUID } from "./utils"

export interface Category {
    title: string,
    href: string, 
    svgUrl?: string,
}

// export class CategoryItem  {
//     private _id: string
//     public domElement: HTMLElement
//     public active: boolean

//     constructor(domElement: HTMLElement) {
//         this._id = generateUUID()
//         this.domElement = domElement
//         this.active = false
//     }

// }

export const menuCategoriesList: Category[] = [
    {
        title: 'cake',
        href: 'cake',
        svgUrl: '/assets/cake.svg',

    },
    {
        title: 'cake',
        href: 'cake',
        svgUrl: '/assets/cake.svg',

    },
    {
        title: 'cake',
        href: 'cake',
        svgUrl: '/assets/cake.svg',

    },
    {
        title: 'cake',
        href: 'cake',
        svgUrl: '/assets/cake.svg',

    },
    {
        title: 'cake',
        href: 'cake',
        svgUrl: '/assets/cake.svg',

    }
]
