import { createSelector } from "reselect";

export default class Selectors {

    sliceSelector = (state:any) => state;

    loaderCounterSelector = createSelector(this.sliceSelector, (slice) => {
        return slice ? slice.counter : 0; 
    });
}