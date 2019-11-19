import React, { Component, createRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import Navigation from './ecom/Navigation';
import { searchQuery } from '../actions'
// import ListExample from './ListExample';
class Header extends Component {
    constructor(props) {
        super(props);
        this.myRef = createRef();
    }

    state = { cartCount: 0, value: '' }
    queryString = (e) => {
        console.log('test : ', e.target.value);

        this.setState({ value: e.target.value }, () => { this.props.searchQuery(this.state.value); })
    }
    select = () => {
        // this.props.selectedProd 
    }
    moveFocus() {
        const node = this.myRef.current;
        node.addEventListener('keydown', function (e) {
            const active = document.activeElement;
            if (e.keyCode === 40 && active.nextSibling) {
                active.nextSibling.focus();
            }
            if (e.keyCode === 38 && active.previousSibling) {
                active.previousSibling.focus();
            }
        });
    }
    renderResults = () => {
        if (!this.props.searchResult.rows) {
            return <div>Loading...</div>;
        }
        return this.props.searchResult.rows.map((result, i) => {
            return (
                <Link to={`/ecom/prodDetails/${result.product_id}`} className="result" tabIndex={i} key={i} id={result.product_id} onClick={this.select}>
                    <div className="image">
                        <img src={require(`../assets/product_images/${result.thumbnail}`)} alt={result.thumbnail} />
                    </div>
                    <div className="content">
                        <div className="price">{result.discounted_price}</div>
                        <div className="title">{result.name}</div>
                        <div className="description">{`${result.description.substring(0, 35)}...`}</div>
                    </div>
                </Link>
            );
        });
    }
    clearInput = () => {
        this.setState({ value: '' }, () => { this.props.searchQuery(this.state.value); })
    }
    callback = e => {
        console.log('TEST : ', e.keyCode)
        if (e.keyCode === 27) {
            this.setState({ value: '' }, () => { this.props.searchQuery(this.state.value); })
        }
        if (e.keyCode === 30) {
            this.props.searchQuery(this.state.value);
        }
    }


    componentDidMount() {
        window.addEventListener('keydown', this.callback, false);
        document.addEventListener('mousedown', this.handleClickOutside);
        this.moveFocus();
    }

    componentWillUnmount() {
        window.removeEventListener('keydown', window.callback, false);
        document.removeEventListener('mousedown', this.handleClickOutside);
    }


    /**
     * Alert if clicked on outside of element
     */
    handleClick = e => {

        if (this.node.contains(e.target)) {
            //click the inside , continue whatever you want
            console.log('inside TEST : ', e.target);
            return;
        }
        this.handleClickOutside();
    }
    handleClickOutside = (event) => {
        console.log('outside TEST : ', this.ref);
    }


    render() {
        console.log(this.props.selProdData)
        return (
            <header className="ui header">

                {/* <ListExample /> */}
                <Menu >
                    <Menu.Item className="left menu">
                        <Link to={`/`} >
                            <span className="ui item" style={{ backgroundColor: '#f62f5e', color: '#fff', fontWeight: 'bolder' }} >
                                S H O P M A T E
                        </span>
                        </Link>
                    </Menu.Item>

                    <Navigation />

                    <Menu.Item className="right menu">
                        <div className={`ui search category ${this.props.searchResult.rows ? 'active visible' : ''}`}>
                            <div className="ui icon input">

                                <input
                                    className="prompt"
                                    type="text"
                                    placeholder="Search..."
                                    onChange={this.queryString}
                                    value={this.state.value}
                                />
                            </div>
                            {this.state.value.length === 0 ? <i className="search icon"></i> : <i className="icon window close outline" onClick={this.clearInput}></i>}

                            <div className={`results transition ${this.props.searchResult.rows.length > 0 ? 'visible' : 'hidden'}`} ref={this.myRef}>

                                {this.renderResults()}

                            </div>
                        </div>
                        <div className="bag">
                            <Link to={`/ecom/cartPage`} >
                                <p>{this.state.cartCount}</p>
                                <p><i className='icon shop'></i></p>
                            </Link>
                        </div>
                    </Menu.Item>


                </Menu>

            </header>
        );
    }
};
const mapStateToProps = (state) => {
    return {
        searchResult: state.ecomdata.searchResult,
        selectedProd: state.ecomdata.selectedProdData,
    }
};

export default connect(mapStateToProps, { searchQuery })(Header);