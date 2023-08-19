export const getElementWidth = async (element : ElementSync) => {
    return element.getSize('width')
}

export const getElementHeight = async (element : ElementSync) => {
    return element.getSize('height')
}

export const getElementXPosition = async (element : ElementSync) => {
    return element.getSize('x')
}

export const getElementYPosition = async (element : ElementSync) => {
    return element.getSize('y')
}