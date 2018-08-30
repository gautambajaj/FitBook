import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';
import RecipeCard from './RecipeCard'
import RecipeNav from './RecipeNav'
import { Alert, Container, Row, Col, Button } from 'reactstrap';


class Recipes extends Component {
	constructor(props){
		super(props);
		this.state = {
			pageNumber: '1'
		}
        this.handlePage = this.handlePage.bind(this);
        this.handleClick = this.handleClick.bind(this);
	}

	getRecipes(){
		return store.getState().profile.recipes[0];
	}

	getFilters(){
		return store.getState().profile.recipes[2];
	}

	getResultCount(){
		return store.getState().profile.recipes[1];
	}

    handlePage(pageNumber){
        this.setState({
            pageNumber: pageNumber
        });
    }   

    handleClick(event){
        event.preventDefault();
        this.setState({
            pageNumber: 0
        });     
    }

	render() {
		var recipes = this.getRecipes();
		var filters = this.getFilters();
		var resultCount = this.getResultCount();

		var fromIndex = ((this.state.pageNumber-1)*12);
        var toIndex = (this.state.pageNumber*12);
        recipes = recipes.slice(fromIndex,toIndex)

		let recipeCards;
		recipeCards = recipes.map(recipe => {
			    return (
			        <Col key={recipe.id} lg="4">
			          <RecipeCard key={recipe.id} recipe={recipe} />
			        </Col>
			    )
		});

		return (
            <Container fluid>
                <Row>
                    <Col md="3">
                        <RecipeNav resultCount={resultCount} handleClick={this.handleClick}
                             pageNumber={this.state.pageNumber} handlePage={this.handlePage}/>
                    </Col>
                    <Col md="9">
	                    <Container fluid>
	                        <Row>
	                            {recipeCards}
	                        </Row>
	                    </Container>
	                </Col>
                </Row>
            </Container>
		);
	}
}

export default connect(null, { })(
  withRouter(Recipes)
);
