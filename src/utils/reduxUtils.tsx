
export const createActionTypes = (types:any) => {
    return types.reduce((previousValue:any, currentValue:any) => {
        previousValue[currentValue] = currentValue;
        return previousValue;
    }, {});
};

export const createActionCreator = (type:any) => {
    return (payload:any) => {
        const action:any = {type};

        if (typeof payload !== 'undefined') {
            action.payload = payload;
        }

        if (payload instanceof Error) {
            action.error = true;
        }

        return action;
    };
};