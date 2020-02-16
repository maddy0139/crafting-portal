import DefaultServiceBase from "../ServiceClass";
import { ICategory } from "../../interfaces/ICategoryViewProps";
class SubCategoryService {
    serviceBase: any;
    constructor(serviceBase = DefaultServiceBase) {
        this.serviceBase = serviceBase;
        this.getAllCategories = this.getAllCategories.bind(this);
    }

    getAllCategoriesUri = () => {
        return this.serviceBase.getUri('getAllCategoriesUri')
    }
    getAllCategories = () => {
        return this.serviceBase.ajax.get(this.getAllCategoriesUri(), {});
    }

    getCategoryUri = (categoryId: string) => {
        return this.serviceBase.getUri('getCategoryUri', { categoryId });
    }
    getCategoryDetails = (categoryId:string) => {
        return this.serviceBase.ajax.get(this.getCategoryUri(categoryId))
    }
    addCategoryUri = () => {
        return this.serviceBase.getUri('addCategoryUri');
    }
    addCategory = (payload:any) => {
        return this.serviceBase.ajax.post(this.addCategoryUri(), payload);
    }

    deleteCategoryUri = (categoryId:string) => {
        return this.serviceBase.getUri('deleteCategoryUri', { categoryId });
    }
    deleteCategory = (categoryId:string) => {
        return this.serviceBase.ajax.delete(this.deleteCategoryUri(categoryId));
    }

    updateCategoryUri = (categoryId:string) => {
        return this.serviceBase.getUri('updateCategoryUri', { categoryId });
    }
    updateCategory = (category:ICategory) => {
        return this.serviceBase.ajax.post(this.updateCategoryUri(category._id), category);
    }

}
const SubCategoryServiceClass = new SubCategoryService();
export default SubCategoryServiceClass;
export {
    SubCategoryServiceClass,
};