import { ICategory } from "./ICategoryViewProps";

export default interface IGiftdetailsProps{
    selectedCategoryID: string,
    loadCategoryDetails: any,
    categoryDetails: ICategory
}