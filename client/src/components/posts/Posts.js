import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 
import PostForm from './PostForm';
import Spinner from '../common/Spinner';
import { updatePosts } from '../../actions/postActions';
import PostFeed from './PostFeed';


class Posts extends Component{
	componentDidMount(){
		this.props.updatePosts();
		if(this.props.post.sharedData !== null){
			window.scrollTo(0, 0);
		}
	}


	render(){
		const { posts, loading } = this.props.post;
		let postContent;

		postContent = <PostFeed posts={posts}/>  

		return(
			<div className="feed">
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<PostForm recipe={this.props.recipe}/>
							<hr/>
							<h2>Post-Feed</h2>
							{postContent}
						</div>
					</div>
				</div>
			</div>
		);
	}
}


Posts.propTypes = {
	updatePosts: PropTypes.func.isRequired,
	post: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
	post: state.post
});

export default connect(mapStateToProps, { updatePosts })(Posts);