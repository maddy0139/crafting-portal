import Selectors from "./CategorySelectors";
import BaseApi from "../base-api/BaseApi";
import ActionTypes from './CategoryActionTypes';
import DefaulterviceBase from '../ServiceClass';
import categoryServiceClass from "./Category.service";
import { ICategory } from "../../interfaces/ICategoryViewProps";

export default class CategoryApi extends BaseApi {
    sliceName: string;
    selectors: any;
    ServiceBase:any;

    constructor(store: any, sliceName = 'categoryApi', ServiceBase  = DefaulterviceBase) {
        super(store, sliceName);
        this.sliceName = sliceName;
        this.selectors = new Selectors();
        this.ServiceBase = ServiceBase;
    }
    async loadCategory() {
        await this.serviceRequest(
            categoryServiceClass.getAllCategories,
            {},
            ActionTypes.LOAD_CATEGORIES);
        return null;
    }
    async laodCategoryDetails() {
        await this.serviceRequest(
            categoryServiceClass.getCategoryDetails,
            this.getSelectedCategoryId(),
            ActionTypes.LOAD_CATEGORY_DETAILS
        );
    }

    async addCategory(category:ICategory) {
        await this.serviceRequest(
            categoryServiceClass.addCategory,
            category,
            ActionTypes.ADD_CATEGORY
        );
    }

    async deleteCategory(categoryId:string) {
        await this.serviceRequest(
            categoryServiceClass.deleteCategory,
            categoryId,
            ActionTypes.DELETE_CATEGORY
        );
    }

    async editCategory(category:ICategory) {
        await this.serviceRequest(
            categoryServiceClass.updateCategory,
            category,
            ActionTypes.EDIT_CATEGORY
        )
    }
    getCategory = () => {
        return this.selectors.loadCategorySelector(this.getState());
    }

    getCategoryDetails = ():ICategory => {
        return this.selectors.categoryDetailsSelector(this.getState());
    }
    setSelectedCategoryId = (id: string) => {
        this.dispatchStoreAction(ActionTypes.SET_SELECTED_CATEGORY_ID, id);
    }
    getSelectedCategoryId = ():string => {
        return this.selectors.getCategoryIdSelector(this.getState());
    }
}