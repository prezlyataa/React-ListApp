import React, { Component } from 'react';
import './list.css';

export class List extends Component {
    render() {
        return(
            <div className='list'>
                <ul>
                    {this.props.products.map((product, id) => (
                        <div key={id}>
                            <li>
                                <h4>
                                    {product.name}
                                </h4>
                                <h4 className='person_gender'>
                                    {product.price}
                                </h4>
                            </li>
                        </div>
                    ))}
                </ul>
            </div>
        );
    }
}