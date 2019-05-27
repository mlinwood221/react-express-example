import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { Media } from 'reactstrap';

import './Item.scss';

class Item extends Component {

  render() {
    return (
    <Link to={"item/"+this.props.data.id}>
  	<Media>
  	    <Media right>
			<Media object src={this.props.data.picture} alt="{this.props.data.title}" />
		</Media>
	    <Media body>
			<Media heading>
				$ {new Intl.NumberFormat('es-AR',{maximumSignificantDigits: 2}).format(this.props.data.price.amount)}
			</Media>
			{this.props.data.title}
		</Media>
	</Media>
	</Link>
  );}
}

export default withRouter(Item);
