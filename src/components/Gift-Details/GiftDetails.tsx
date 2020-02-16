import React from 'react';
import IGiftdetailsProps from '../../interfaces/IGiftdetailsProps';
import { connect } from 'react-redux';
import CategoryApi from '../../apis/category-api/CategoryApi';
import LoaderApi from '../../apis/loader-api/loaderApi';
import Store from '../../store/configureStore';
import { Card } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';

const categoryApi = new CategoryApi(Store);
const loaderApi = new LoaderApi(Store);

class GiftdetailsComponents extends React.Component<IGiftdetailsProps> {
  constructor(props: IGiftdetailsProps) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props.loadCategoryDetails();
  }

  render() {
    const { categoryDetails } = this.props;
    return (
      <div className="container gift-details">
        {categoryDetails && (
          <Card>
            <Carousel className="home_page_banner">
              <Carousel.Item style={{ backgroundColor: 'gray' }}>
                <img
                  src={categoryDetails.imageUrl}
                  className="d-block"
                  alt="banner"
                  style={{
                    maxHeight: '300px',
                    width: 'fit-content',
                    margin: 'auto'
                  }}
                />
                <Carousel.Caption>
                  <h3>{categoryDetails.title}</h3>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item style={{ backgroundColor: 'gray' }}>
                <img
                  src={categoryDetails.imageUrl}
                  className="d-block"
                  alt="banner"
                  style={{
                    maxHeight: '300px',
                    width: 'fit-content',
                    margin: 'auto'
                  }}
                />
                <Carousel.Caption>
                  <h3>Explosion Box</h3>
                </Carousel.Caption>
              </Carousel.Item>
            </Carousel>

            <Card.Body>
              <Card.Title>{categoryDetails.title}</Card.Title>
              <Card.Text>{categoryDetails.details}</Card.Text>
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">Last updated 3 mins ago</small>
            </Card.Footer>
          </Card>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: any, ownProps: any) {
  return {
    selectedCategoryID: categoryApi.getSelectedCategoryId(),
    categoryDetails: categoryApi.getCategoryDetails()
  };
}

function mapDispatchToProps() {
  return {
    loadCategoryDetails: () => {
      return loaderApi.loadWithLoader(categoryApi.laodCategoryDetails, {});
    }
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GiftdetailsComponents);
