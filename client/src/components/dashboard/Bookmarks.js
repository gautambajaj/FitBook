import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BookmarkCard from './BookmarkCard'
import { recipeBookmark, recipeUnBookmark } from '../../actions/profileActions';
import { Alert, Container, Row, Col, Button } from 'reactstrap';


class Bookmarks extends Component {
  constructor(props){
    super(props);

    this.handleBookmark = this.handleBookmark.bind(this);
    this.handleUnBookmark = this.handleUnBookmark.bind(this);
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
    if(bookmarks){
      bookmarks = bookmarks.map(bookmark => {
        return [bookmark.label, bookmark._id];
      });
    }

    return bookmarks; 
  };

  render() {
    let bookmarks = this.getBookmarks(this.props.bookmarks);

    let bookmarkCards = this.props.bookmarks.map(recipe => {
      return (
          <Col key={recipe._id} lg="4">
            <BookmarkCard key={recipe._id} recipe={recipe} 
                    bookmarks={bookmarks} handleBookmark={this.handleBookmark}
                    handleUnBookmark={this.handleUnBookmark} />
          </Col>
      )
    });
    return (
      <div>
        <hr/>
        <h4 className="mb-4"><b>Bookmarked Recipes</b></h4>
          <Container fluid>
              <Row>
                  <Col md="12">
                    <Container fluid>
                        <Row>
                            {bookmarks.length === 0 ? (
                                <Alert color="danger">
                                  You do not have any bookmarked recipes
                                </Alert>  
                            ) : bookmarkCards}
                        </Row>
                    </Container>
                </Col>
              </Row>
          </Container>
      </div>
    );
  }
}

Bookmarks.propTypes = {
  recipeUnBookmark: PropTypes.func.isRequired,
  recipeBookmark: PropTypes.func.isRequired,
};

export default connect(null, { recipeUnBookmark, recipeBookmark })(Bookmarks);
