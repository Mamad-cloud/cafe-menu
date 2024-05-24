// const __ITEM_UUID_COUNTER__ = 0

export function cleanSVG(svg: SVGSVGElement) : void {
    svg.removeAttribute('class')
    svg.removeAttribute('style')
    svg.removeAttribute('height')
    svg.removeAttribute('width')

}

export function generateUUID() : string {
    return crypto.randomUUID()
}