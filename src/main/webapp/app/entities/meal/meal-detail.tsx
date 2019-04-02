import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './meal.reducer';
import { IMeal } from 'app/shared/model/meal.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IMealDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class MealDetail extends React.Component<IMealDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { mealEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="coupleMealsApp.meal.detail.title">Meal</Translate> [<b>{mealEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">
                <Translate contentKey="coupleMealsApp.meal.title">Title</Translate>
              </span>
            </dt>
            <dd>{mealEntity.title}</dd>
            <dt>
              <span id="date">
                <Translate contentKey="coupleMealsApp.meal.date">Date</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={mealEntity.date} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="type">
                <Translate contentKey="coupleMealsApp.meal.type">Type</Translate>
              </span>
            </dt>
            <dd>{mealEntity.type}</dd>
            <dt>
              <Translate contentKey="coupleMealsApp.meal.recipe">Recipe</Translate>
            </dt>
            <dd>{mealEntity.recipeId ? mealEntity.recipeId : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/meal" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/meal/${mealEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ meal }: IRootState) => ({
  mealEntity: meal.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MealDetail);
