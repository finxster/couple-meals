import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IRecipe } from 'app/shared/model/recipe.model';
import { getEntities as getRecipes } from 'app/entities/recipe/recipe.reducer';
import { getEntity, updateEntity, createEntity, reset } from './meal.reducer';
import { IMeal } from 'app/shared/model/meal.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IMealUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IMealUpdateState {
  isNew: boolean;
  recipeId: string;
}

export class MealUpdate extends React.Component<IMealUpdateProps, IMealUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      recipeId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getRecipes();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { mealEntity } = this.props;
      const entity = {
        ...mealEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/meal');
  };

  render() {
    const { mealEntity, recipes, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="coupleMealsApp.meal.home.createOrEditLabel">
              <Translate contentKey="coupleMealsApp.meal.home.createOrEditLabel">Create or edit a Meal</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : mealEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="meal-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="title">
                    <Translate contentKey="coupleMealsApp.meal.title">Title</Translate>
                  </Label>
                  <AvField
                    id="meal-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="dateLabel" for="date">
                    <Translate contentKey="coupleMealsApp.meal.date">Date</Translate>
                  </Label>
                  <AvField
                    id="meal-date"
                    type="date"
                    className="form-control"
                    name="date"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="typeLabel">
                    <Translate contentKey="coupleMealsApp.meal.type">Type</Translate>
                  </Label>
                  <AvInput id="meal-type" type="select" className="form-control" name="type" value={(!isNew && mealEntity.type) || 'LUNCH'}>
                    <option value="LUNCH">
                      <Translate contentKey="coupleMealsApp.MealType.LUNCH" />
                    </option>
                    <option value="DINNER">
                      <Translate contentKey="coupleMealsApp.MealType.DINNER" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="recipe.id">
                    <Translate contentKey="coupleMealsApp.meal.recipe">Recipe</Translate>
                  </Label>
                  <AvInput id="meal-recipe" type="select" className="form-control" name="recipeId">
                    <option value="" key="0" />
                    {recipes
                      ? recipes.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/meal" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  recipes: storeState.recipe.entities,
  mealEntity: storeState.meal.entity,
  loading: storeState.meal.loading,
  updating: storeState.meal.updating,
  updateSuccess: storeState.meal.updateSuccess
});

const mapDispatchToProps = {
  getRecipes,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealUpdate);
