import React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default class RecipePagination extends React.Component {
  constructor(props) {
      super(props);
  }

  render() {
    var currPage = this.props.pageNumber;
    let getPaginationItem = (itemNumber) => {
      if(itemNumber == currPage){
        return (
          <PaginationItem active>
            <PaginationLink href="#" onClick={(event) => {this.props.handlePage(itemNumber)}}>
            {itemNumber}
            </PaginationLink>
          </PaginationItem>
        );
      } else if(this.props.resultCount < ((itemNumber-1))*12){
        return (
          <PaginationItem disabled>
            <PaginationLink href="#">
            {itemNumber}
            </PaginationLink>
          </PaginationItem>
        );
      } else{
        return(
          <PaginationItem>
            <PaginationLink href="#" onClick={(event) => {this.props.handlePage(itemNumber)}}>
            {itemNumber}
            </PaginationLink>
          </PaginationItem>
        );
      }
    };

    let getPrevPagination = () => {
      if(currPage == 1){
        return (
          <PaginationItem disabled>
            <PaginationLink previous href="#"/>
          </PaginationItem>
        );
      } else{
        return(
          <PaginationItem>
            <PaginationLink previous href="#" onClick={(event) => {this.props.handlePage(currPage-1)}}/>
          </PaginationItem>
        );
      }
    };

    let getNextPagination = () => {
      if(currPage == 5 || this.props.resultCount < ((currPage))*12){
        return (
          <PaginationItem disabled>
            <PaginationLink next href="#" />
          </PaginationItem>
        );
      } else{
        return(
          <PaginationItem>
            <PaginationLink next href="#" onClick={(event) => {this.props.handlePage(currPage+1)}}/>
          </PaginationItem>
        );
      }
    }

    return (
      <Pagination aria-label="Page navigation example">
        {getPrevPagination()}
        {getPaginationItem(1)}
        {getPaginationItem(2)}
        {getPaginationItem(3)}
        {getPaginationItem(4)}
        {getPaginationItem(5)}
        {getNextPagination()}
      </Pagination>
    );
  }
}