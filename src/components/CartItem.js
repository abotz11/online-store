import React  from 'react';


export default class CartItem extends React.Component {

    increment(e){
        e.preventDefault()

        const id = this.props.product.id;
        const username = this.props.username;
        fetch('http://localhost:5000/increment', {
            method: "post",
            body: JSON.stringify({username: username, id: id}),
        }).then(res => res.json())
            .then(res => {
                this.props.handler()
            })
            .catch(error => alert(error))
    }

    decrement(e) {
        e.preventDefault()

        const id =this.props.product.id;
        const username = this.props.username;
        fetch('http://localhost:5000/decrement', {
            method: "post",
            body: JSON.stringify({username: username, id: id}),
        }).then(res => res.json())
            .then(res => {
                this.props.handler();
            })
            .catch(error => alert(error))
    }

    removeItem(e){
        e.preventDefault()

        const id = this.props.product.id;
        const username = this.props.username;
        fetch('http://localhost:5000/removeItem', {
            method: "delete",
            credentials: 'include',
            body: JSON.stringify({username: username, id: id}),
        }).then(res => res.json())
            .then(res => {
                this.props.handler()
            })
            .catch(error => alert(error))
    }


    render(){
        const { id, title, img, price, total, count, info } = this.props.product;


        return (
            <div className="row my-2 text-capitalize text-center">
                <div className="col-10 mx-auto col-lg-2">
                    <img
                        src={img}
                        style={{ widht: "5rem", height: "5rem" }}
                        className="img-fluid"
                        alt="product"
                    />
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <span className="d-lg-none">product:</span>
                    {title}
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <span className="d-lg-none">info:</span>
                    "{info}"
                </div>
                <div className="col-10 mx-auto col-lg-1">
                    <span className="d-lg-none">price:</span>
                    ${price}
                </div>
                <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                    <div className="d-flex justify-content-center">
                        <div>
                            <span className="btn btn-black mx-1"
                                onClick={this.decrement.bind(this)} style={{cursor: "pointer"}}> -
                            </span>
                            <span className="btn btn-black mx-1">{count}</span>
                            <span className="btn btn-black mx-1"
                                onClick={this.increment.bind(this)} style={{cursor: "pointer"}}> +
                            </span>
                        </div>
                    </div>
                </div>
                <div className="col-10 mx-auto col-lg-1">
                    <div className="cart-icon" onClick={this.removeItem.bind(this)} style={{cursor: "pointer"}}>
                        <i className="fas fa-trash" />
                    </div>
                </div>
                <div className="col-10 mx-auto col-lg-2">
                    <strong>item total: $ {total}</strong>
                </div>
            </div>
        );
    }

}