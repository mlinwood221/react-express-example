import React, { Component } from 'react'
import {
    Container,
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand
} from 'reactstrap';

import Search from '../search/Search'

import './NavBar.scss'

export default class NavBar extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
      }

      toggle() {
        this.setState({
          isOpen: !this.state.isOpen
        });
      }

      render() {
        return (
          <div>
            <Navbar light expand="md" className="ml-navbar">
              <Container>
                <NavbarBrand href="/">
                  <img src={process.env.PUBLIC_URL + '/logo.png'} alt=""/>
                </NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Search></Search>                              
                </Collapse>
              </Container>
            </Navbar>
          </div>
        );
      }
}
