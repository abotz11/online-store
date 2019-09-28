import React from 'react'
import {Link} from 'react-router-dom'
import  SearchBox from './SearchBox'
import styled from 'styled-components'

export default class Navbar extends React.Component {
    render() {
        return (
            <NavbarWrapper className="navbar navbar-expand-sm bg-dark px-sm-5">

                <Link className="nav-link" to="/" >
                    <span className="mr-2">
                        <i className="fas fa-home"></i>
                    </span>
                </Link>

                <ul className="navbar-nav align-items-center" style={{color: "#fff"}}>
                    <li className="nav-item ml-5">
                        <Link to="/" className="nav-link">
                            products
                        </Link>
                    </li>
                    <li className="nav-item ml-5">
                        <Link to="/keyProducts" className="nav-link">
                            key chain products
                        </Link>
                    </li>
                    <li className="nav-item ml-5">
                        <Link to="/signedProducts" className="nav-link">
                           autographed products
                        </Link>
                    </li>

                    <li className="nav-item ml-5">
                        <Link to="/readme" className="nav-link">
                        read me
                        </Link>
                    </li>

                    {this.props.isAdmin && <li className="nav-item ml-5">
                        <Link to="/admin" className="nav-link">
                            admin
                        </Link>
                    </li>}
                </ul>

                <span className="ml-auto">
                    <SearchBox  className="mr-2" handlerSearch={this.props.handlerSearch} />
                </span>
                <Link className="nav-link ml-auto" to="/cart" >
                    <span className="mr-2">
                        <i className="fas fa-cart-plus"></i>
                    </span>
                    my cart
                </Link>
            </NavbarWrapper>
        )
    }
}


const NavbarWrapper = styled.nav`
    background-color: yellow,
    color: green,
    textAlign: center,
    padding:10px 10px


    .nav-link {
      color: LightGrey !important;
      font-size: 1rem;
      text-transform: capitalize;
      
    }
    
    .nav-link:hover{
      color: #FFD700 !important;
      }
`;