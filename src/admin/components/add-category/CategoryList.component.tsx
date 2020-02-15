import React from 'react';
import { Table, Button } from 'react-bootstrap';
import AddCategory from '../modal/AddCategory.component';
import { ICategory } from '../../../interfaces/ICategoryViewProps';
import CategoryApi from '../../../apis/category-api/CategoryApi';
import LoaderApi from '../../../apis/loader-api/loaderApi';

import Store from '../../../store/configureStore';
import { connect } from 'react-redux';

const categoryApi = new CategoryApi(Store);
const loaderApi = new LoaderApi(Store);

interface IAddCategoryProps {
    show: boolean,
    allCategory: any,
    addCategory: any,
    loadCategories: any,
    deleteCategory: any,
    editCategory: any
}

interface IAddCategoryState {
    show: boolean,
    selectedCategory: ICategory
}

class AddCategoryComponent extends React.Component<IAddCategoryProps, IAddCategoryState> {
    constructor(props: IAddCategoryProps) {
        super(props);
        this.state = {
            show: false,
            selectedCategory: {
                _id: '',
                title: '',
                imageUrl: '',
                details: ''
            }
        }
        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleSubmitForm = this.handleSubmitForm.bind(this);
        this.editCategory  = this.editCategory.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        const selectedCategory = {
            _id: '',
            title: '',
            imageUrl: '',
            details: ''
        }
        this.setState({selectedCategory, show: true });
    }
    handleSubmitForm(Category: ICategory, { setErrors, resetForm }: any) {
        const {_id: categoryId} = this.state.selectedCategory;

        if(categoryId) {
            Category._id = categoryId;
            this.props.editCategory(Category).then(() => {
                this.handleClose();
                this.props.loadCategories();
            });
        } else {
            this.props.addCategory(Category).then(() => {
                this.handleClose();
                this.props.loadCategories();
            });
        }

    }
    editCategory(category:ICategory) {
        this.setState({selectedCategory: category, show: true});
    }

    deleteCategory(categoryId: string) {
        this.props.deleteCategory(categoryId).then(() => {
            this.props.loadCategories();
        })
    }
    render() {
        const { allCategory = [] } = this.props;

        return (
            <div className="container">
                <Button variant="primary" className="add-category" onClick={this.handleShow}>
                    Add Category
                </Button>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Category Title</th>
                            <th>Image Path</th>
                            <th style={{maxWidth: '600px'}}>Details</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allCategory.map((category: ICategory) => {
                                return (
                                    <tr key={category._id}>
                                        <td>{category.title}</td>
                                        <td>
                                            <img style={{height:'120px'}} src={category.imageUrl} alt={category.title}/>
                                        </td>
                                        <td style={{maxWidth: '600px'}}>{category.details}</td>
                                        <td className="action-btn">
                                            <Button onClick={() => this.editCategory(category)}>Edit</Button>
                                            <Button onClick={() => this.deleteCategory(category._id)}>Delete</Button>
                                        </td>
                                    </tr>
                                );
                            })
                        }
                    </tbody>
                </Table>
                <AddCategory
                    handleSubmitForm={this.handleSubmitForm}
                    show={this.state.show}
                    handleClose={this.handleClose}
                    category={this.state.selectedCategory}
                />
            </div>
        );
    }
}

function mapStateToProps() {
    return {
        allCategory: categoryApi.getCategory()
    }
}
function mapDispatchToProps() {
    return {
        addCategory: (category: ICategory) => {
            return loaderApi.loadWithLoader(categoryApi.addCategory, category);
        },
        loadCategories: () => {
            return loaderApi.loadWithLoader(categoryApi.loadCategory, {});
        },
        deleteCategory: (categoryId:string) => {
            return loaderApi.loadWithLoader(categoryApi.deleteCategory, categoryId);
        },
        editCategory: (category:ICategory) => {
            return loaderApi.loadWithLoader(categoryApi.editCategory, category);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCategoryComponent);