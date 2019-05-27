import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import axios from 'axios';

import { Container } from 'reactstrap';

import ItemList  from './components/item/ItemList';
import Breadcrumb from './components/breadcrumb/Breadcrumb';


const apiUrl = 'http://localhost:9000/items?q=';
const options = { headers: {"Authorization" : "nicolas cuevas"} };

class ItemSearchResult extends Component {
  _componentIsMount = false;

  constructor(props) {
    super(props);
    this.state = {
      items: [],
      categories: [],
      searchText: "",
    };
  }

  getItems(searchText) {
    this._componentIsMount = true;

  	this.setState({
      searchText: searchText
    });
	axios.get(apiUrl+searchText, options).then((response)=>{
		if (this._componentIsMount) {
			this.setState({
				items: response.data.items,
				categories: response.data.categories ? response.data.categories : []
			});
		}
	});
  }

  componentDidMount () {
  	const qs = queryString.parse(this.props.location.search);
    if (!qs.search) {
    	this.props.history.push({
	      pathname: '/'
	    });
    }
    this.getItems(qs.search);
  }

  componentDidUpdate(prevProps) {
  	const qs = queryString.parse(this.props.location.search);
  	
    if (!qs.search) {
    	this.props.history.push({
	      pathname: '/'
	    });
    }

	if (this.state.searchText !== qs.search) {
		this.getItems(qs.search);
	}
  }

  componentWillUnmount() {
    this._componentIsMount = false;
  }

  render() {
    return (
    <div>
    <Container className="sub-nav">
        <Breadcrumb data={this.state.categories}></Breadcrumb>
    </Container>
    <Container className="main-content">
    <ItemList data={this.state.items}></ItemList>
    </Container>
    </div>
  	);
   }
}

export default withRouter(ItemSearchResult);
