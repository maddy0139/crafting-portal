import { ICategory } from "./ICategoryViewProps";
import { ISubCategory } from "./ISubCategory";

export default interface IGiftdetailsProps{
    selectedCategoryID: string,
    loadCategoryDetails: any,
    categoryDetails: ICategory,
    subCategories: any,
    loadSubCategories: any
}