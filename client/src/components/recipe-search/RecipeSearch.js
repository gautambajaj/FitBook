import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { connect } from 'react-redux';
import Spinner from '../common/Spinner';
import PropTypes from 'prop-types';
import { recipeSearch } from '../../actions/profileActions';
import store from '../../store';


class RecipeSearch extends Component {
  constructor(props) {
    super(props);
    var query = '';
    var dietLabel = 'No Preference';
    var calorieRange = 'No Preference';
    
    if(store.getState().profile.recipes){
      var filters = store.getState().profile.recipes[2];
      query = filters.query;
      dietLabel = filters.dietLabel;
      calorieRange = filters.calorieRange;
    }

    this.state = {
      query: query,
      dietLabel: dietLabel,
      calorieRange: calorieRange,
      errors: {},
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const filters = {
      query: this.state.query,
      dietLabel: this.state.dietLabel,
      calorieRange: this.state.calorieRange,
    };

    this.props.recipeSearch(filters, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    const { loading } = this.props.profile;

    // Select options for nutritionLabels
    const nutritionOptions = [
      { label: 'No Preference', value: 'No Preference' },
      { label: 'Balanced', value: 'Balanced' },
      { label: 'High-Protein', value: 'High-Protein' },
      { label: 'Low-Fat', value: 'Low-Fat' },
      { label: 'High-Fiber', value: 'High-Fiber' },
      { label: 'Low-Carb', value: 'Low-Carb' },
      { label: 'Low-Sodium', value: 'Low-Sodium' },
    ];

    // Select options for caloriesPerServing
    const caloriesOptions = [
      { label: 'No Preference', value: 'No Preference'},
      { label: '100-300', value: '100-300' },
      { label: '300-500', value: '300-500' },
      { label: '500-700', value: '500-700' },
      { label: '700+', value: '700+' },
    ];

    let searchButton = '';
    if(this.state.query === ''){
      searchButton = (
        <input
          type="submit"
          value="Search"
          className="btn btn-info btn-block mt-4"
          disabled
        />
      );
    } else{
      searchButton = (
        <input
          type="submit"
          value="Search"
          className="btn btn-info btn-block mt-4"
        />
      );
    }

    let content;

    if(loading){
      return (
        <div>
          <Spinner/>
        </div>
      );
    } 
    
    return(
        <div className="recipe-search">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <Link to="/dashboard" className="btn btn-light">
                    Go Back
                  </Link>
                  <h1 className="display-4 text-center">Search for Recipes</h1>
                  <hr/>
                  <small className="d-block pb-3">* = required fields</small>
                  <form onSubmit={this.onSubmit}>
                    <TextFieldGroup
                      placeholder="* Enter query Keyword(s) e.g. chicken"
                      name="query"
                      value={this.state.query}
                      onChange={this.onChange}
                      error={errors.query}
                      info="* Enter recipe Keyword(s)"
                    />
                    <SelectListGroup
                      name="dietLabel"
                      value={this.state.dietLabel}
                      onChange={this.onChange}
                      options={nutritionOptions}
                      error={errors.dietLabel}
                      info="Select a nutrition label"
                    />
                    <SelectListGroup
                      name="calorieRange"
                      value={this.state.calorieRange}
                      onChange={this.onChange}
                      options={caloriesOptions}
                      error={errors.calorieRange}
                      info="Calories per Serving"
                    />
                    {searchButton}
                  </form>
                </div>
              </div>
            </div>
          </div>
    );
  }
}

RecipeSearch.propTypes = {
  recipeSearch: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  errors: state.errors,
  profile: state.profile
});

export default connect(mapStateToProps, { recipeSearch })(
  withRouter(RecipeSearch)
);
