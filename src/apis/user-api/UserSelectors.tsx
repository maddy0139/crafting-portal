import { createSelector } from "reselect";

export default class Selectors {

    sliceSelector = (state:any) => state;

    getUserDetailsSelector = createSelector(this.sliceSelector, (slice) => {
        return slice && slice.userInformation && slice.userInformation.user && slice.userInformation.user[0]; 
    });
}