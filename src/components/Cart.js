import React from 'react';
import CartItem from './CartItem'
import CartTitles from './CartTitles'

class Cart extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            cart: null,
            cartTotal: 0,
        };

        this.handler = this.handler.bind(this);
    }

    sumCartItems(cart){
        let cartTotal = 0
        for(let i = 0; i < cart.length; i++){
            cartTotal += cart[i].total
        }
        return cartTotal
    }

    componentWillMount(){
        fetch('http://localhost:5000/cart',{
            method: 'POST',
            body: JSON.stringify({username: this.props.username})
        }).then(res => res.json())
            .then(res => {
                this.setState({cart: res, cartTotal: this.sumCartItems(res)})
            })
    }

    handler() {
        fetch('http://localhost:5000/cart',{
            method: 'POST',
            body: JSON.stringify({username: this.props.username})
        }).then(res => res.json())
            .then(res => {
                this.setState({cart: res, cartTotal: this.sumCartItems(res)})
            })
    }

    render() {
        if(!this.state.cart || this.state.cart === undefined || this.state.cart.length == 0){
            return (
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-10 mx-auto text-center text-title">
                            <h1>Your Cart Is Empty!!!</h1>
                        </div>
                    </div>
                </div>
            )
        }else{
            return (
                <section>

                    <CartTitles />
                    <div className="container-fluid">
                    {
                        this.state.cart.map(product=> {
                            return <CartItem key={product.id} product={product} username={this.props.username} handler={this.handler}/>
                        })
                    }
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right">
                                <h5>
                                    <span className="text-title">Total: </span>
                                    <strong>${this.state.cartTotal}</strong>

                                </h5>
                            </div>
                        </div>
                    </div>
                </section>
            );
        }
    }
}

export default Cart;