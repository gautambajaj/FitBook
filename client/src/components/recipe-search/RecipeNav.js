import React from 'react';
import { Button, ListGroup, ListGroupItem } from 'reactstrap';
import RecipePagination from "./RecipePagination"

export default class Example extends React.Component {
  render() {
	let searchActions;
	searchActions = (
		  <div>
	      		<RecipePagination handlePage={this.props.handlePage} resultCount={this.props.resultCount}
	      						  pageNumber={this.props.pageNumber}/>
	      		<Button color="info" size="lg" block onClick={this.props.handleClick}>Modify Search</Button>
		  </div>
	);
	

    return (
      <div className="sticky-top">
	      {searchActions}
      </div>
    );
  }
}
