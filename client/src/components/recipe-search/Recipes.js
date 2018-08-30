import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import store from '../../store';
import RecipeCard from './RecipeCard'
import RecipeNav from './RecipeNav'
import { recipeBookmark, recipeUnBookmark } from '../../actions/profileActions';
import { Alert, Container, Row, Col, Button } from 'reactstrap';


class Recipes extends Component {
	constructor(props){
		super(props);

		this.state = {
			pageNumber: 1
		}

        this.handlePage = this.handlePage.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.handleBookmark = this.handleBookmark.bind(this);
        this.handleUnBookmark = this.handleUnBookmark.bind(this);
	}

	getRecipes(){
		return store.getState().profile.recipes[0];
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
        this.props.history.push('/recipe-search');    
    }

    handleBookmark(recipe){
    	const newBookmark = {
    		image: recipe.image,
    		label: recipe.label,
    		tags: recipe.tags,
    		yields: recipe.yields,
    		calories: recipe.calories,
    		link: recipe.redirect
    	}
		this.props.recipeBookmark(newBookmark);
    }

	handleUnBookmark(id){
		this.props.recipeUnBookmark(id);
	}

	getBookmarks(bookmarks){
		var result;
		if(bookmarks){
			result = bookmarks.map(bookmark => {
				return [bookmark.calories, bookmark._id];
			});
		}

		return result;	
	};

	render() {
		var bookmarks = this.getBookmarks(this.props.profile.profile.bookmarks);
		var recipes = this.getRecipes();
		var resultCount = this.getResultCount();

		var fromIndex = ((this.state.pageNumber-1)*12);
        var toIndex = (this.state.pageNumber*12);
        recipes = recipes.slice(fromIndex,toIndex)

		let recipeCards;
		recipeCards = recipes.map(recipe => {
			    return (
			        <Col key={recipe.id} lg="4">
			          <RecipeCard key={recipe.id} recipe={recipe} 
			          			  bookmarks={bookmarks} handleBookmark={this.handleBookmark}
			          			  handleUnBookmark={this.handleUnBookmark} />
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
	                            {resultCount == 0 ? (
	                                <Alert color="danger">
                        				No results found. Please try again.
                    				</Alert>  
	                            ) : recipeCards}
	                        </Row>
	                    </Container>
	                </Col>
                </Row>
            </Container>
		);
	}
}

Recipes.propTypes = {
  recipeBookmark: PropTypes.func.isRequired,
  recipeUnBookmark: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { recipeBookmark, recipeUnBookmark })(Recipes);
