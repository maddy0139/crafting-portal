import Selectors from './SubCategorySelectors';
import BaseApi from '../base-api/BaseApi';
import ActionTypes from './SubCategoryActionTypes';
import DefaulterviceBase from '../ServiceClass';
import subCategoryServiceClass from './SubCategory.service';
import _bindAll from 'lodash/bindAll';
import { ISubCategory } from '../../interfaces/ISubCategory';

export default class CategoryApi extends BaseApi {
  sliceName: string
  selectors: any
  ServiceBase: any

  constructor(
    store: any,
    sliceName = 'subCategoryApi',
    ServiceBase = DefaulterviceBase
  ) {
    super(store, sliceName)
    this.sliceName = sliceName
    this.selectors = new Selectors()
    this.ServiceBase = ServiceBase
    _bindAll(this, [
      'loadSubCategory',
      'laodSubCategoryDetails',
      'addSubCategory',
      'deleteSubCategory',
      'editSubCategory'
    ])
  }
  async loadSubCategory(categoryId: string) {
    const config = {
        params: {
            categoryId
        }
    }
    return await this.serviceRequest(
      subCategoryServiceClass.getAllSubCategories,
      config,
      ActionTypes.LOAD_SUB_CATEGORIES
    )
  }
  async laodSubCategoryDetails() {
    return await this.serviceRequest(
      subCategoryServiceClass.getSubCategoryDetails,
      this.getSelectedSubCategoryId(),
      ActionTypes.LOAD_SUB_CATEGORY_DETAILS
    )
  }

  async addSubCategory(subCategory: ISubCategory) {
    await this.serviceRequest(
      subCategoryServiceClass.addSubCategory,
      subCategory,
      ActionTypes.ADD_SUB_CATEGORY
    )
  }

  async deleteSubCategory(subCategoryId: string) {
    await this.serviceRequest(
      subCategoryServiceClass.deleteSubCategory,
      subCategoryId,
      ActionTypes.DELETE_SUB_CATEGORY
    )
  }

  async editSubCategory(subCategory: ISubCategory) {
    await this.serviceRequest(
      subCategoryServiceClass.updateSubCategory,
      subCategory,
      ActionTypes.EDIT_CATEGORY
    )
  }
  getSubCategory = () => {
    return this.selectors.loadSubCategorySelector(this.getState())
  }

  getSubCategoryDetails = (): ISubCategory => {
    return this.selectors.subCategoryDetailsSelector(this.getState())
  }
  setSelectedSubCategoryId = (id: string) => {
    this.dispatchStoreAction(ActionTypes.SET_SELECTED_CATEGORY_ID, id)
  }
  getSelectedSubCategoryId = (): string => {
    return this.selectors.getSubCategoryIdSelector(this.getState())
  }
}
