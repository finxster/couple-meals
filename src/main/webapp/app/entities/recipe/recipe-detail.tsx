import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, byteSize } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './recipe.reducer';
import { IRecipe } from 'app/shared/model/recipe.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IRecipeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class RecipeDetail extends React.Component<IRecipeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { recipeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="coupleMealsApp.recipe.detail.title">Recipe</Translate> [<b>{recipeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="coupleMealsApp.recipe.title">Title</Translate>
              </span>
            </dt>
            <dd>{recipeEntity.title}</dd>
            <dt>
              <span id="stepByStep">
                <Translate contentKey="coupleMealsApp.recipe.stepByStep">Step By Step</Translate>
              </span>
            </dt>
            <dd>{recipeEntity.stepByStep}</dd>
            <dt>
              <span id="ingredients">
                <Translate contentKey="coupleMealsApp.recipe.ingredients">Ingredients</Translate>
              </span>
            </dt>
            <dd>{recipeEntity.ingredients}</dd>
          </dl>
          <Button tag={Link} to="/entity/recipe" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/recipe/${recipeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ recipe }: IRootState) => ({
  recipeEntity: recipe.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeDetail);
