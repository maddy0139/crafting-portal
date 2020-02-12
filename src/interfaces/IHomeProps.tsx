import { RouteComponentProps } from 'react-router-dom';
import {ICategoryViewProps} from './ICategoryViewProps';

export default interface IHomeProps extends RouteComponentProps<any> {
    selectedCategoryId: string,
    tilesViewProps: ICategoryViewProps,
    setSelectedCategoryId: any,
    setCategories: any,
    categories: any,
    loadCategories: any
}