import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';
import RecipeCard from './RecipeCard'
import { Alert, Container, Row, Col, Button } from 'reactstrap';


class Recipes extends Component {
	getRecipes(){
		return store.getState().profile.recipes[0];
	}

	getFilters(){
		return store.getState().profile.recipes[2];
	}

	getResultCount(){
		return store.getState().profile.recipes[1];
	}

	render() {
		var recipes = this.getRecipes();
		var filters = this.getFilters();
		var resultCount = this.getResultCount();

		let recipeCards;
		recipeCards = recipes.map(recipe => {
			    return (
			        <Col key={recipe.id} sm="4">
			          <RecipeCard key={recipe.id} recipe={recipe} />
			        </Col>
			    )
		});

		return (
            <Container fluid>
                <Row>
                    {recipeCards}                        
                </Row>
            </Container>
		);
	}
}

export default connect(null, { })(
  withRouter(Recipes)
);
