import React, { Component } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Container } from 'reactstrap';

import NavBar  from './components/navbar/NavBar';
import ItemSearchResult from './ItemSearchResult';
import ItemDetail from './ItemDetail';



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }
  
  render() {
    return (
	<BrowserRouter>
    <NavBar></NavBar>  
		<Switch>
		  <Route path='/items' component={ItemSearchResult}/>
		  <Route path='/item/:Id' component={ItemDetail}/>
		</Switch>
	</BrowserRouter>
  	);
  }
}

export default App;
