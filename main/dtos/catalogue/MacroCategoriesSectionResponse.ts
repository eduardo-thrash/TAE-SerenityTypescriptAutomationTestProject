export interface MacroCategoriesSectionResponse {
    avaibleStock: AvaibleStock[]
}
  
export interface AvaibleStock {
    name: string
    id: number
    mShortDescription: string
    thumb: string
    medium: string
    large: string
    svgUrl: string
    pngUrl: string
    primaryColor: PrimaryColor
    appGradient: string[]
    subCategories: SubCategory[]
    countProducts: number
}
  
export interface PrimaryColor {
    initColor: string
    endColor: string
}
  
export interface SubCategory {
    subCategoryId: number
    subCategoryName: string
    sShortDescription: string
}
  