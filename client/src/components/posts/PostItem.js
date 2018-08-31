import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Link } from 'react-router-dom';
import { deletePost, addLike, removeLike } from '../../actions/postActions'
import Bookmarks from '../dashboard/Bookmarks';


class PostItem extends Component{
	onDeleteClick(id){
		this.props.deletePost(id);
	}

	onLikeClick(id){
		this.props.addLike(id);
	}

	onUnlikeClick(id){
		this.props.removeLike(id);
	}

	findUserLike(likes){
		const { auth } = this.props;
		if(likes.filter(like => like.user === auth.user.id).length > 0){
			return true;
		} else {
			return false;
		}
	}

	render(){
		const { post, auth, showActions } = this.props;

		let recipe = '';
		
		if(post.recipe && this.props.profile.profile){
			recipe = (
				<Bookmarks shareData={post.recipe} bookmarks={this.props.profile.profile.bookmarks} share={true} />
			)
		} else{
			recipe = '';
		}

		return(
            <div className="card card-body mb-3">
              <div className="row">
                <div className="col-md-2">
                  <a href="profile.html">
                    <img className="rounded-circle d-none d-md-block" 
                    	 src={post.avatar}
                      alt="" />
                  </a>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                {recipe === '' ? (
	                <div className="col-md-10">
	                  <p className="lead">{post.text}</p>
	                  <button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
	                    <i className={classnames('fas fa-thumbs-up', {
							'text-info': this.findUserLike(post.likes)
	                    })} />
	                    <span className="badge badge-light">{post.likes.length}</span>
	                  </button>
	                  <button onClick={this.onUnlikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
	                    <i className="text-secondary fas fa-thumbs-down"></i>
	                  </button>
	                  {showActions ? (<span>
		                  <Link to={`/posts/${post._id}`} className="btn btn-info mr-1">
		                    Comments
		                  </Link>
		                  {post.user === auth.user.id ? (
						  	<button type="button" onClick={this.onDeleteClick.bind(this, post._id)} 
						  	className="btn btn-danger mr-1">
						  		<i className="i fas fa-times"/>
						  	</button>
		                  ) : null}		                  	
	                  </span>) : null}
	                </div>
                ) : (
	            <div className="col-md-10 row">
	                <div className="col-md-5">
	                  <p className="lead">{post.text}</p>
	                  <button onClick={this.onLikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
	                    <i className={classnames('fas fa-thumbs-up', {
							'text-info': this.findUserLike(post.likes)
	                    })} />
	                    <span className="badge badge-light">{post.likes.length}</span>
	                  </button>
	                  <button onClick={this.onUnlikeClick.bind(this, post._id)} type="button" className="btn btn-light mr-1">
	                    <i className="text-secondary fas fa-thumbs-down"></i>
	                  </button>
	                  {showActions ? (<span>
		                  <Link to={`/posts/${post._id}`} className="btn btn-info mr-1">
		                    Comments
		                  </Link>
		                  {post.user === auth.user.id ? (
						  	<button type="button" onClick={this.onDeleteClick.bind(this, post._id)} 
						  	className="btn btn-danger mr-1">
						  		<i className="i fas fa-times"/>
						  	</button>
		                  ) : null}		                  	
	                  </span>) : null}
	            	</div>
	            	<div className="col-md-5">{recipe}</div>
	            </div>
                )}

              </div>
            </div>

		);
	}
}

PostItem.defaultProps = {
	showActions: true
};


PostItem.propTypes = {
	deletePost: PropTypes.func.isRequired,
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	auth: state.auth,
	profile: state.profile
});

export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem);