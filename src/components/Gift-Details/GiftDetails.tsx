import React from "react";
import IGiftdetailsProps from "../../interfaces/IGiftdetailsProps";
import { connect } from "react-redux";
import CategoryApi from "../../apis/category-api/CategoryApi";
import LoaderApi from "../../apis/loader-api/loaderApi";
import Store from "../../store/configureStore";
import { Card } from "react-bootstrap";

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
            <Card.Img
              variant="top"
              src={categoryDetails.imageUrl}
              style={{ width: "100%", height: "320px" }}
            />
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
