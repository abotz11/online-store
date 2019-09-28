import React from "react";
import styled from "styled-components";
import PropTypes from 'prop-types'

export default class Product extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            product: "",
            username: "",
        };

        this.addToCart = this.addToCart.bind(this);
    }


    addToCart(e){
        e.preventDefault();

        fetch('http://localhost:5000/add', {
            method: "put",
            credentials: 'include',
            body: JSON.stringify(this.state),
        }).then(res => res.json())
            .then(res => {
                this.setState(res)
            })
            .catch(error => alert(error))
    }

    componentDidMount() {
        this.setState({product: this.props.product, username: this.props.username})
    }


    render() {
        const { title, img, price } = this.state.product;


        return (
            <ProductWrapper className="col-9 mx-auto col-md-9 col-lg-3 my-3" >
                <div className="card">
                     <div className="img-container p-5">
                        <img src={img} alt="product" className="card-img-top" />
                        <button className="cart-btn" onClick={this.addToCart}>
                            <i className="fas fa-cart-plus" />
                        </button>
                     </div>
                    <div className="card-footer d-flex justify-content-between">
                        <p className="align-self-center mb-0">
                            {title}
                        </p>
                        <h5 className="text-blue font-italic mb-0">
                            <span className="mr-1">$</span>
                            {price}
                        </h5>
                    </div>
                 </div>
            </ProductWrapper>
        );
    }
}

Product.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number,
        img: PropTypes.string,
        title: PropTypes.string,
        price: PropTypes.number,
        inCart: PropTypes.bool
    }).isRequired
};


const ProductWrapper = styled.div`
    .card {
      border-color: transparent;
      transition: all 1s linear;
    }
    .card-footer {
      background: transparent;
      border-top: transparent;
      transition: all 1s linear;
    }
    &:hover {
      .card {
        border: 0.04rem solid rgba(0,0,0,0.2);
        box-shadow: 2px 2px 5px 0px rgba(0,0,0,0.2)
      }
      .card-footer {
        background: rgba(247, 247, 247);
      }
    }
    .img-container {
      position: relative;
      overflow: hidden;
    }
    .card-img-top {
      transition: all 1s linear;
    }
    .img-container:hover .card-img-top{
      transform: scale(1.4);
    }
    .cart-btn{
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0.2 rem 0.4rem;
      background: #696969;
      border: none;
      color: #F5F5F5;
      font-size: 1.4rem;
      border-radius: 0.5rem 0 0 0;
      transform: translate(100%, 100%);
      transition: all 1s linear;
    }
    .img-container: hover .cart-btn {
      transform: translate(0,0);
    }
    .cart-btn:hover{
      color: #FFD700;
      cursor: pointer;
    }
`;
