import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import {
    InputGroup,
    InputGroupAddon,
    Input,
    Button
   } from 'reactstrap';

import './Search.scss'


class Search extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }


  updateSearchText(event){
    this.setState({
      searchText: event.target.value
    });
  }

  searchItem(event) {
    this.props.history.push({
      pathname: '/items',
      search: '?search=' + this.state.searchText,
      state: { detail: {} }
    });
  }

  keyPressed(event) {
    if (event.key === "Enter") {
      this.props.history.push({
        pathname: '/items',
        search: '?search=' + this.state.searchText,
        state: { detail: {} }
      });
    }
  }

  render() {
    return (
    <InputGroup>
      <Input className="ml-search" 
        value={this.state.searchText} 
        onChange={this.updateSearchText.bind(this)} 
        onKeyPress={this.keyPressed.bind(this)}/>
      <InputGroupAddon addonType="append">
        <Button color="primary" onClick={this.searchItem.bind(this)} >
        <img className="searchIcon" src={process.env.PUBLIC_URL + '/search.png'} alt=""/>
        </Button>
      </InputGroupAddon>
    </InputGroup>
    )
  }
}

export default withRouter(Search);
