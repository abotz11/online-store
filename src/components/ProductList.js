import React from 'react'
import Product from './Product'
import Title from './Title'

export default class ProductList extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            productList: this.props.productList,
            text: ""
        };

        this.handler = this.handler.bind(this);
    }


    handler(res){
        this.props.handlerProducts(res)
    }

    componentDidUpdate(prevProps) {
        if(prevProps.productList != this.props.productList){
            this.setState({
                productList: this.props.productList
            })
        }
    }

    render() {
        if(this.state.productList.length == 0){
            return(
                <React.Fragment>
                <h1>Can't find products</h1>
                </React.Fragment>
            )
        }else{
            return (
                <React.Fragment>
                  <div className="py-5">
                    <div className="container">
                        <Title name="our" title=" products"/>
                        <div className="row">
                            {this.state.productList.map((product) =>
                                    <Product key={product.id}
                                            username={this.props.username}
                                            product={product}
                                            handler={this.handler} />)}
                        </div>
                    </div>
                  </div>
                </React.Fragment>
            )
        }
    }
}
