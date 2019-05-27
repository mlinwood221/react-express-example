import React, { Component } from 'react'
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';

import './Breadcrumb.scss'


export default class BreadcrumbCustom extends Component {
  render() {
    return (
      
      <Breadcrumb className="ml-breadcrumb">
      {this.props.data.map(
      	(item,index) =>
        <BreadcrumbItem key={item.id} >{item.name}</BreadcrumbItem>
        )
      }
      </Breadcrumb>
    )
  }
}
