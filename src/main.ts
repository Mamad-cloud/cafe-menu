import { type Category, menuCategoriesList } from "./lib"
import { cleanSVG } from "./utils"

/**
 * hashmap to store the svg raw text
 * only the getSVG function should operate on this map
 * url -> svgText
 */
const svgs = new Map<string, string>()

/**
 * returns the svg HTML element associated with the url and stores results in the svgs hashmap
 * @param url the url of the svg file
 * @returns the svg element inside a div
 */
async function getSVG(url: string) : Promise<HTMLElement> {
    const rootElem = document.createElement('div')
    
    if ( svgs.has(url) ) {
        rootElem.innerHTML = svgs.get(url)!
        return rootElem
    }

    try {
        const response : Response = await fetch(url, {cache: 'force-cache'}) // returns Promise<Response>
        const svgText = await response.text()
        
        rootElem.innerHTML = svgText

        const svgElem = rootElem.querySelector('svg')!
        cleanSVG(svgElem)

        svgElem.setAttribute('width', '50')
        svgElem.setAttribute('height', '50')
        svgElem.style.fill = 'none'
         
        svgs.set(url, rootElem.innerHTML)
        return rootElem

    } catch(error) {
        throw new Error('svg file not found or couldnt correctly parse file! (probably :) )')
    }
    

}

async function getAllSVGs(categories: Category[]) : Promise<void> {
    for (let category of categories) {
        if (category.svgUrl)
            await getSVG(category.svgUrl)
    }

}

/**
 * @param svgURL url of the category icon
 * @returns individual menu category item
 */
async function createMenuCategoryItem(category: Category) : Promise<HTMLElement> {
    const rootContainer = document.createElement('div')
    const anchor: HTMLAnchorElement = document.createElement('a')
    rootContainer.classList.add('flex', 'flex-col', 'justify-center', 'items-center',
        'cursor-pointer', 'h-full', 'min-w-20',
    )
    anchor.classList.add('flex', 'flex-col', 'justify-center', 'items-center',
        'h-full'
    )

    anchor.href = `#${category.href}`
    

    const title = document.createElement('h2')
    title.classList.add('text-white')
    title.innerText = category.title
    anchor.appendChild(title)
    
    if ( category.svgUrl ){
        const svgContainer = document.createElement('div')
        const loadingText = document.createElement('p');
        loadingText.innerText = 'Loading...';
        svgContainer.appendChild(loadingText)

        const svgIcon = await getSVG(category.svgUrl)
        svgContainer.innerHTML = svgIcon.innerHTML
    
        anchor.appendChild(svgContainer)
    }
    
    rootContainer.appendChild(anchor)
    return rootContainer
}

async function createMenuCategories() : Promise<HTMLElement> {
    const menuCategoriesRoot = document.createElement('div')
    menuCategoriesRoot.classList.add('h-28', 'w-full', 'bg-slate-900',
        'flex', 'flex-row', 'gap-6', 'items-center', 'overflow-x-scroll', 'snap-x', 'no-scrollbar', 
        'rounded-b-md',
    )

    await getAllSVGs(menuCategoriesList)
    
    const items: HTMLElement[] = []
    for ( let _item of menuCategoriesList) {
        items.push(await createMenuCategoryItem(_item))
    }

    items.forEach( item => menuCategoriesRoot.appendChild(item))
    

    return menuCategoriesRoot
    
}

function main() {
    
    
    createMenuCategories().then(res => {
        document.body.appendChild(res)
        
    })

}

main()