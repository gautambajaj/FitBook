import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types'; 
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addPost } from '../../actions/postActions';
import Bookmarks from '../dashboard/Bookmarks';


class PostForm extends Component{
	constructor(props){
		super(props);

		this.state = {
			text: '',
			errors: {}
		};

		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.errors){
			this.setState({errors: nextProps.errors});
		}
	}

	onSubmit(event){
		event.preventDefault();

		const { user } = this.props.auth;
		
		var newPost;
		if(this.props.post.shareData){
			newPost = {
				text: this.state.text,
				name: user.name,
				avatar: user.avatar,
				image: this.props.post.shareData.image,
				label: this.props.post.shareData.label,
				tags: this.props.post.shareData.tags,
				yields: this.props.post.shareData.yields,
				calories: this.props.post.shareData.calories,
				link: this.props.post.shareData.link
			};
		} else {
			newPost = {
				text: this.state.text,
				name: user.name,
				avatar: user.avatar
			};
		}

		this.props.addPost(newPost);
		this.setState({text: ''});
	}

	onChange(event){
		this.setState({ [event.target.name]: event.target.value });
	}

	render(){
		const { errors } = this.state;
		var shareData = this.props.post.shareData;
		let postContents;

		if(shareData){
			postContents = (
				<div>
					<div className="row">
						<div className="col-md-4"></div>
						<div className="col-md-4 ">
								<Bookmarks shareData={shareData} bookmarks={this.props.profile.profile.bookmarks} share={true} />
						</div>
						<div className="col-md-4"></div>
					</div>
					<TextAreaFieldGroup 
						placeholder="Enter post description. Must be at least 10 characters."
						name="text"
						value={this.state.text}
						onChange={this.onChange}
						error={errors.text}
					/>
				</div>
			);
		} else{
			postContents = (
				<TextAreaFieldGroup 
					placeholder="Enter post description. Must be at least 10 characters."
					name="text"
					value={this.state.text}
					onChange={this.onChange}
					error={errors.text}
				/>
			);
		}

		return(
          <div className="post-form mb-3">
            <div className="card card-info">
              <div className="card-header bg-info text-white">
                Make a new post...
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit}> 
                  <div className="form-group text-center">
                  	{postContents}
                  </div>
                  <div className="btn-group">
					{shareData ? (
					<div>
                  		<button type="submit" className="btn btn-dark">Submit</button>
                  		&nbsp;
                  		<button type="submit" className="btn btn-dark" 
                  			onClick={() => {
                  				if(shareData.fromHome){
                  					this.props.history.push('/dashboard')
                  				} else{
                  					this.props.history.push('/recipe-search/results')
                  				}
                  			}
                  			}>
                  		{shareData.fromHome ? 'Return to Dashboard' : 'Return to search results'}
                  		</button>
					</div>
					) : (
					<div>
                  		<button type="submit" className="btn btn-dark">Submit</button>
                  	</div>
					)}
                  </div>
                </form>
              </div>
            </div>
          </div>
		);
	}
}


PostForm.propTypes = {
	addPost: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
	profile: PropTypes.object.isRequired,
	post: PropTypes.object.isRequired,
	errors: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
	errors: state.errors,
	auth: state.auth,
	profile: state.profile,
	post: state.post
});

export default connect(mapStateToProps, { addPost })(withRouter(PostForm));