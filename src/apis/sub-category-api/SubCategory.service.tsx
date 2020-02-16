import DefaultServiceBase from "../ServiceClass";
import { ISubCategory } from "../../interfaces/ISubCategory";
class SubCategoryService {
    serviceBase: any;
    constructor(serviceBase = DefaultServiceBase) {
        this.serviceBase = serviceBase;
        this.getAllSubCategories = this.getAllSubCategories.bind(this);
    }

    getAllSubCategoriesUri = () => {
        return this.serviceBase.getUri('getAllSubCategoriesUri')
    }
    getAllSubCategories = (config: any) => {
        return this.serviceBase.ajax.get(this.getAllSubCategoriesUri(), config);
    }

    getSubCategoryUri = (subCategoryId: string) => {
        return this.serviceBase.getUri('getSubCategoryUri', { subCategoryId });
    }
    getSubCategoryDetails = (subCategoryId:string) => {
        return this.serviceBase.ajax.get(this.getSubCategoryUri(subCategoryId))
    }
    addSubCategoryUri = () => {
        return this.serviceBase.getUri('addSubCategoryUri');
    }
    addSubCategory = (payload:any) => {
        return this.serviceBase.ajax.post(this.addSubCategoryUri(), payload);
    }

    deleteSubCategoryUri = (subCategoryId:string) => {
        return this.serviceBase.getUri('deleteSubCategoryUri', { subCategoryId });
    }
    deleteSubCategory = (subCategoryId:string) => {
        return this.serviceBase.ajax.delete(this.deleteSubCategoryUri(subCategoryId));
    }

    updateSubCategoryUri = (subCategoryId:string) => {
        return this.serviceBase.getUri('updateSubCategoryUri', { subCategoryId });
    }
    updateSubCategory = (subCategory:ISubCategory) => {
        return this.serviceBase.ajax.post(this.updateSubCategoryUri(subCategory._id), subCategory);
    }

}
const SubCategoryServiceClass = new SubCategoryService();
export default SubCategoryServiceClass;
export {
    SubCategoryServiceClass,
};