import { createSelector } from "reselect";

export default class Selectors {
    
    sliceSelector = (state:any) => state;

    getSuccessMessageSelector = createSelector(this.sliceSelector, (slice) => {
        return (slice && slice.notification) || {};
    });

    showSuccessMessageSelector = createSelector(this.sliceSelector, (slice) => {
        return slice && slice.showSuccessMessage;
    })
}