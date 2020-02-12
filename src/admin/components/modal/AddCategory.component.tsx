import React from 'react';
import { Modal } from 'react-bootstrap';
import { Formik, Field, Form as FormikForm, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Form } from "react-bootstrap";
import { ICategory } from '../../../interfaces/ICategoryViewProps';

interface IAddCategoryProps {
    show: boolean,
    handleClose: any,
    handleSubmitForm: any,
    category: ICategory
}

const AddCategory: React.FC<IAddCategoryProps> = (props) => {
    const { show, handleClose, handleSubmitForm, category } = props;
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Add Category</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Formik
                    initialValues={{
                        title: category.title || '',
                        imageUrl: category.imageUrl || '',
                        details: category.details || ''
                    }}
                    validationSchema={Yup.object().shape({
                        title: Yup.string()
                            .required('Category Title is required'),
                        imageUrl: Yup.string()
                            .required('Image Path is required'),
                        details: Yup.string()
                            .required('Category Details is required')
                    })}
                    onSubmit={handleSubmitForm}
                    render={({ errors, status, touched }) => (
                        <FormikForm>
                            <Form.Group>
                                <Field name="title" type="text" placeholder="Enter Category Title" className={'form-control' + (errors.title && touched.title ? ' is-invalid' : '')} />
                                <ErrorMessage name="title" component="div" className="invalid-feedback" />
                            </Form.Group>
                            <Form.Group>
                                <Field name="imageUrl" type="text" placeholder="Image Path" className={'form-control' + (errors.imageUrl && touched.imageUrl ? ' is-invalid' : '')} />
                                <ErrorMessage name="imageUrl" component="div" className="invalid-feedback" />
                            </Form.Group>
                            <Form.Group>
                                <Field name="details" type="text" placeholder="Enter Category Details" className={'form-control' + (errors.details && touched.details ? ' is-invalid' : '')} />
                                <ErrorMessage name="details" component="div" className="invalid-feedback" />
                            </Form.Group>
                            <Form.Group>
                                {category._id &&
                                    <button type="submit" className="btn btn-primary">Edit</button>
                                }
                                {!category._id &&
                                    <button type="submit" className="btn btn-primary">Add</button>
                                }
                            </Form.Group>
                        </FormikForm>
                    )}
                />
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>
    );
}

export default AddCategory;