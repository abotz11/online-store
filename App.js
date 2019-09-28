import React from 'react';
import { BrowserRouter as Router, Switch, Route} from  'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import ReadMe from './components/pages/ReadMe'
import Admin from './components/pages/Admin'
import ProductList from './components/ProductList'
import LoginForm from './components/LoginForm'
import RegisterForm from './components/RegisterForm'
import Cart from './components/Cart'
import { storeProducts, signedProducts, keysProducts } from './data'
import './App.css';
import Navbar from "./components/Navbar";


class App extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            isLoginOpen: true,
            isRegisterOpen: false,
            username: "",
            productList: null,
            signedProductList: null,
            keysProductList: null,
            rememberMe: true,
        };

        this.handler = this.handler.bind(this);
        this.handlerProducts = this.handlerProducts.bind(this);
        this.handlerSearch = this.handlerSearch.bind(this);
        this.showRegisterBox = this.showRegisterBox.bind(this)
        this.showLoginBox = this.showLoginBox.bind(this)
    }


    handler(username, rememberMe, maxAge) {
        this.setState({
            username: username,
            rememberMe: rememberMe,
        })

        setTimeout(() => {this.setState({rememberMe: false})}, maxAge)
    }

    handlerProducts(res){
        const productIndex = this.state.productList.findIndex( product => {return product.id == res.id})
        this.setState(
            this.state.productList.splice(productIndex, 1, res)
        )
    }

    handlerSearch(e){
        let filteredProduct = storeProducts.filter(
            (product) => {
                if(product.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {
                    return product;
                }
            })

        let filteredSignedProduct = signedProducts.filter(
            (product) => {
                if (product.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {

                    return product;
                }
            })

        let filteredKeysProduct = keysProducts.filter(
            (product) => {
                if (product.title.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1) {

                    return product;
                }
            })

        this.setState({productList: filteredProduct,
            signedProductList: filteredSignedProduct,
            keysProductList: filteredKeysProduct
            })
    }


    showLoginBox() {
        this.setState({isLoginOpen: true, isRegisterOpen: false});
    }

    showRegisterBox() {
        this.setState({isRegisterOpen: true, isLoginOpen: false});
    }


    componentWillMount() {
        this.setState({
            productList: storeProducts,
            signedProductList: signedProducts,
            keysProductList: keysProducts
            })
    }

    componentDidMount() {
        fetch('http://localhost:5000/isLogin', {
            credentials: 'include',
        }).then(res => res.json())
            .then(res => {
                if(res.rememberMe === undefined){
                    this.setState({rememberMe: false})
                }else{
                    this.setState({username: res.rememberMe})
                }

            })
            .catch(error => alert(error))
    }

    render() {
        if(!this.state.rememberMe) {
            return (
                < div
            className = "root-container" >
                < div
            className = "box-container" >
                {this.state.isLoginOpen && < LoginForm handler={this.handler} / >}
                {this.state.isRegisterOpen && < RegisterForm handler={this.handler} / >}
        <
            /div>
            < div
            className = "box-controller" >
                < div
            className = {"controller " +(this.state.isLoginOpen ? "selected-controller" : "")}
            onClick = {this.showLoginBox} >
                Login
                < /div>

                < div
            className = {"controller " +(this.state.isRegisterOpen ? "selected-controller" : "")}
            onClick = {this.showRegisterBox} >
                Register
                < /div>
                < /div>
                < /div>
        );
        }else{
            return (
                <Router>
                    <div className="App">
                        <Navbar handlerSearch={this.handlerSearch} isAdmin={this.state.username == "admin"}/>
                        <Switch>
                            <Route exact path="/" render={props => (
                                <div>
                                    <React.Fragment>
                                        <ProductList username={this.state.username}
                                                     productList={this.state.productList}
                                                     handlerProducts={this.handlerProducts}/>
                                    </React.Fragment>
                                </div>
                             )} />

                            <Route path="/signedProducts" render={props => (
                                <div>
                                    <React.Fragment>
                                        <ProductList username={this.state.username}
                                                     productList={this.state.signedProductList}
                                                     handlerProducts={this.handlerProducts}/>
                                    </React.Fragment>
                                </div>
                            )} />

                            <Route path="/keyProducts" render={props => (
                                <div>
                                    <React.Fragment>
                                        <ProductList username={this.state.username}
                                                     productList={this.state.keysProductList}
                                                     handlerProducts={this.handlerProducts}/>
                                    </React.Fragment>
                                </div>
                            )} />

                            <Route path="/admin" component={Admin} />

                            <Route path="/readme" component={ReadMe}/>

                            <Route path="/cart" render={props => (
                                <React.Fragment>
                                    <Cart username={this.state.username} />
                                </React.Fragment>
                            )} />
                        </Switch>
                    </div>
                </Router>
            );
        }
    }
}

export default App;
