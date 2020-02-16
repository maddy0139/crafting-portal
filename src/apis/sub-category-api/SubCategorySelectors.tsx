import { createSelector } from "reselect";

export default class Selectors {

    sliceSelector = (state:any) => state;

    loadCategorySelector = createSelector(this.sliceSelector, (slice) => {
        return slice && slice.categories; 
    });
    getCategoryIdSelector = createSelector(this.sliceSelector, (slice) => {
        return slice && slice.selectedCategoryId; 
    });

    categoryDetailsSelector = createSelector(this.sliceSelector, (slice) => {
        return slice && slice.categoryDetails;
    })
}