import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


class RecipeCard extends Component{
    getBookmarks(bookmarks){
      var result;
      if(bookmarks){
        result = bookmarks.map(bookmark => {
          return bookmark.calories;
        });
      }

      return result;  
    };

    render () {
      let bookmarkIcon;
      var target = this.props.recipe.calories;
      var targetID = null;
      var bookmarks = this.getBookmarks(this.props.profile.profile.bookmarks);

      for(var i = 0; i < bookmarks.length; ++i){
        if(bookmarks[i] == target){
          targetID = target;
        }
      }

      if(targetID){
        bookmarkIcon = (
          <i 
            className="fas fa-bookmark fa-2x btn bkIcon" 
            onClick={(event) => {this.props.handleUnBookmark(targetID)}}>
          </i>
        );
      } else {
        bookmarkIcon = (
          <i className="far fa-bookmark fa-2x btn bkIcon" onClick={(event) => {this.props.handleBookmark(this.props.recipe)}}></i>
        );
      }

        return (
          <div>
            <Card>
              <CardImg top width="100" src={this.props.recipe.image} alt="https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97180&w=318&h=180" />
              
              <CardBody>
                <CardTitle>
                  <b>{this.props.recipe.label}</b>
                </CardTitle>
                <CardSubtitle>
                    <b>{this.props.recipe.tags}</b>
                    <br/>
                </CardSubtitle>
                <CardText>
                    Serving size: {this.props.recipe.yields}
                    <br/>
                    Calories per Serving: {this.props.recipe.calories}
                </CardText>
                <div className="text-center">
                  <div className="text-center"> 
                    <i className="fas fa-external-link-alt fa-2x btn" onClick = {() => window.open(this.props.recipe.redirect, '_blank')}></i>
                    &nbsp; &nbsp; 
                    {bookmarkIcon}
                    &nbsp; &nbsp; 
                    <i className="fas fa-share-alt fa-2x btn" onClick={(event) => this.props.handleShare(this.props.recipe)}  ></i>
                  </div>
                </div>
              </CardBody>
            </Card>
            <br/>
          </div>
        )
    }
};



RecipeCard.propTypes = {
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps)(RecipeCard);
