import React from 'react';
import {
  ICategory,
  ICategoryViewProps
} from '../../../interfaces/ICategoryViewProps';
import { Card, Button, CardDeck } from 'react-bootstrap';

const TilesView: React.FC<ICategoryViewProps> = props => {
  const { categories = [] } = props;
  return (
    <div>
      {
        <CardDeck>
          {categories.map((category: ICategory) => {
            return (
              <Card
                key={category.title}
                style={{
                  maxHeight: '400px',
                  minWidth: '260px',
                  marginBottom: '15px'
                }}
              >
                <Card.Img
                  variant="top"
                  src={category.imageUrl}
                  style={{
                    width: 'fit-content',
                    height: '160px',
                    margin: 'auto'
                  }}
                />
                <Card.Body>
                  <Card.Title>{category.title}</Card.Title>
                  <Card.Text>{category.details}</Card.Text>
                  <Button
                    variant="primary"
                    onClick={(e: any) => handleClick(e, props, category._id)}
                  >
                    More Details
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardDeck>
      }
    </div>
  );
};

function handleClick(
  e: React.MouseEvent,
  props: ICategoryViewProps,
  id: string
) {
  if (props.categoryClickHandler) {
    props.categoryClickHandler(e, id);
  }
}
export default TilesView;
