import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const ProfileActions = () => {
	return(
          <div className="container">
            <div className="row">
                <div className="btn-group-vertical d-sm-none mb-4" role="group">
                  <Link to="/edit-profile" className="btn btn-light">
                    <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile
                  </Link>
                  <Link to="/recipe-search" className="btn btn-light">
                    <i className="fas fa-utensils text-info mr-1"></i>
                    Browse Recipes
                  </Link>
                  <Link to="/feed" className="btn btn-light">
                    <i className="fa fa-rss text-info mr-1"></i>
                    View Post-Feed
                  </Link>
                </div>
                <div className="btn-group d-none d-sm-block mb-4" role="group">
                  <Link to="/edit-profile" className="btn btn-light">
                    <i className="fas fa-user-circle text-info mr-1"></i> Edit Profile
                  </Link>
                  <Link to="/recipe-search" className="btn btn-light">
                    <i className="fas fa-utensils text-info mr-1"></i>
                    Browse Recipes
                  </Link>
                  <Link to="/feed" className="btn btn-light">
                    <i className="fa fa-rss text-info mr-1"></i>
                    View Post-Feed
                  </Link>
                </div>
          </div>
        </div>
	)
};

export default ProfileActions;