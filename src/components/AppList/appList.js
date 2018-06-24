import React, { Component } from 'react';
import './appList.css';
import { List } from "../List/list";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import 'react-datepicker/dist/react-datepicker.css';

export default class AppList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: 0,
            products: [],
            total: 0,
            date: null
        };

        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangePrice = this.handleChangePrice.bind(this);
        this.addProduct = this.addProduct.bind(this);
        this.reset = this.reset.bind(this);
        this.total = this.total.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.remove = this.remove.bind(this);
    }

    handleChangeDate(date) {
        this.setState({
            date: date
        });
    }

    handleChangeName(e) {
        e.preventDefault();
        this.setState({
            name: e.target.value
        })
    }

    handleChangePrice(e) {
        e.preventDefault();
        this.setState({
            price: parseFloat(e.target.value)
        })
    }

    addProduct() {
        let addDate = new Date();
        let formatDate = moment(addDate).format('YYYYMMDD');

        let product = {
            name: this.state.name,
            price: this.state. price,
            date: parseFloat(formatDate)
        };

        if(this.state.name !== '' && this.state.price) {
            this.setState(prevState => ({
                products: prevState.products.concat(product)
            }));
        }

        this.reset();
    }

    reset() {
        this.setState({
            name: '',
            price: 0
        });

        this.myFormRef.reset();
    }

    total() {
        const { products } = this.state;
        let sum = 0;
        for (let i=0;i<products.length;i++){
            if(products[i].price != null){
                sum += parseFloat(products[i].price);
            }
        }

        if(products.length > 1) {
            this.setState({
                total: sum
            })
        }
        else if(products.length) {
            this.setState({
                total: products[0].price
            })
        }
    }

    remove() {
        let formattedDate = moment(this.state.date).format('YYYYMMDD');
        parseFloat(formattedDate);
        let newList = this.state.products.filter(product => product.date > formattedDate);
        this.setState({
            products: newList
        })
    }

    render() {
        return (
            <div className='app'>
                <div className='app-form'>
                    <form  ref={(el) => this.myFormRef = el}>
                        <input type="text" placeholder='Name' onChange={this.handleChangeName} required />
                        <input type="number" placeholder='Price'  onChange={this.handleChangePrice} required />
                    </form>
                    <button onClick={this.addProduct}>Add product</button>
                </div>
                <div className='app-list'>
                    <List products={this.state.products}/>
                </div>
                <div className='app-date'>
                    <DatePicker
                        selected={this.state.date}
                        onChange={this.handleChangeDate}
                    />
                    <button onClick={this.remove}>Remove</button>
                </div>
                <div>
                    <button onClick={this.total}>Get total</button>
                    <h3>Total: {this.state.total}</h3>
                </div>
            </div>
        );
    }
}