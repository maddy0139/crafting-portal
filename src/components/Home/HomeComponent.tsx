import React from 'react';
import { connect } from "react-redux";
import IHomeProps from '../../interfaces/IHomeProps';
import CategoryCardView from '../common/CardView/CategoryCardView';
import { ICategory, ICategoryViewProps } from '../../interfaces/ICategoryViewProps';
import LoaderApi from '../../apis/loader-api/loaderApi';
import store from '../../store/configureStore';
import CategoryApi from "../../apis/category-api/CategoryApi";
import CarouselComponents from '../common/Carousel/Carousel';

const loaderApi = new LoaderApi(store);
const categoryApi = new CategoryApi(store);

interface IHomeState {
    categories: Array<ICategory>
}

class HomeComponent extends React.Component<IHomeProps, IHomeState> {
    constructor(props: any) {
        super(props);
        this.state = {
            categories: this.props.categories
        };
        this.categoryClickHandler = this.categoryClickHandler.bind(this);
    }
    componentDidMount() {
        loaderApi.loadWithLoader(this.props.loadCategories);
    }
    componentWillReceiveProps(nextProps: any) {
        const categories = nextProps.categories;
        this.setState({ ...this.state, categories });
    }
    categoryClickHandler(e:React.MouseEvent, id: string): void {
        e.preventDefault();
        // this.props.setSelectedCategoryId({
        //     payload:{id}
        // });
        this.props.setSelectedCategoryId(id);
        this.props.history.push("/gift-details");
    }
    getTilesViewProps(): ICategoryViewProps {
        const { categories } = this.state;
        return {
            categories,
            categoryClickHandler: this.categoryClickHandler
        }
    }
    render() {
        const tilesProps = this.getTilesViewProps();
        return (
            <div className="container">

                <div className="home-container">
                    <CarouselComponents/>
                    <CategoryCardView {...tilesProps} />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state: any, ownProps: any) {
    return {
        categories: categoryApi.getCategory()
    };
}
function mapDispatchToProps(dispatch: any) {
    return {
        setSelectedCategoryId: (id:string) => {
            return categoryApi.setSelectedCategoryId(id)
        },
        loadCategories: () => {
            return categoryApi.loadCategory();
        }
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);