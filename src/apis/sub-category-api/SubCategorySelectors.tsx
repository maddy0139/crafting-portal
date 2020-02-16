import { createSelector } from "reselect";

export default class Selectors {

    sliceSelector = (state:any) => state;

    loadSubCategorySelector = createSelector(this.sliceSelector, (slice) => {
        return slice && slice.subCategories; 
    });
    getSubCategoryIdSelector = createSelector(this.sliceSelector, (slice) => {
        return slice && slice.selectedSubCategoryId; 
    });

    subCategoryDetailsSelector = createSelector(this.sliceSelector, (slice) => {
        return slice && slice.subCategoryDetails;
    })
}