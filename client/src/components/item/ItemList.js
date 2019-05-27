import React, { Component } from 'react';
import { Media } from 'reactstrap';

import Item  from './Item';

import './ItemList.scss';

class ItemList extends Component {

  render() {
    return (
    <Media list>
        {this.props.data.map(
            (item,index) =>
              <Media tag="li" key={item.id}>
              	<Item key={item.id} data={item}></Item>
              </Media>
            )
        }
    </Media>
  );}
}

export default ItemList;
