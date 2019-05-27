import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col } from 'reactstrap';
import { Card, CardImg, Button } from 'reactstrap';

import Breadcrumb from './components/breadcrumb/Breadcrumb';

const apiUrl = 'http://localhost:9000/items/';
const options = { headers: {"Authorization" : "nicolas cuevas"} };

class ItemDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      item: null
    };
  }

  componentDidMount () {
  	console.log(this.state.item)
  	const { Id } = this.props.match.params;
    axios.get(apiUrl+Id, options).then((response)=>{
		this.setState({
			item: response.data
		});
	});
  }

  render() {
    return (
    	<div>
	    <Container className="sub-nav">
	    </Container>
    	<Container className="main-content">
    	<Container>
    		{ this.state.item !== null ?
    			<div>
		        <Row>
		        	<Col xs="6">
		        		<Card>
					       <CardImg top width="100%" src={this.state.item.picture.url} alt="" />
					    </Card>
		        	</Col>
		          	<Col xs="2"></Col>
		          	<Col xs="4">
		          	    <h6>{this.state.item.title}</h6>
		          		<h1>$ {new Intl.NumberFormat('es-AR',{maximumSignificantDigits: 2}).format(this.state.item.price.amount)}</h1>
		          		<Button color="primary">Comprar</Button>
		          	</Col>
		        </Row>
		        <Row>
		        <Col xs="6">
	        		<h4>{this.state.item.title}</h4>
	        		<p>{this.state.item.description}</p>
	        	</Col>
				</Row>
				</div>
		        :
		        <div></div>
    		}
		</Container>
		</Container>
		</div>
    
  	);}
}
export default withRouter(ItemDetail);
