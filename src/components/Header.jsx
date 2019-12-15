import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Menu } from 'semantic-ui-react';
import Navigation from './ecom/Navigation';
import { searchQuery } from '../actions';
// import ListExample from './ListExample';
const Header = props => {
  const myRef = useRef(null);
  const cartCount = useState()[0];
  const [value, setValue] = useState('');
  const queryString = e => {
    // console.log('test : ', e.target.value);
    setValue(e.target.value);
    props.searchQuery(value);
  };
  const select = () => {
    // props.selectedProd
  };
  const moveFocus = () => {
    const node = myRef.current;
    node.addEventListener('keydown', function(e) {
      const active = document.activeElement;
      if (e.keyCode === 40 && active.nextSibling) {
        active.nextSibling.focus();
      }
      if (e.keyCode === 38 && active.previousSibling) {
        active.previousSibling.focus();
      }
    });
  };
  const renderResults = () => {
    if (!props.searchResult.rows) {
      return <div>Loading...</div>;
    }
    return props.searchResult.rows.map((result, i) => {
      return (
        <Link
          to={`/ecom/prodDetails/${result.product_id}`}
          className='result'
          tabIndex={i}
          key={i}
          id={result.product_id}
          onClick={select}
        >
          <div className='image'>
            <img
              src={require(`../assets/product_images/${result.thumbnail}`)}
              alt={result.thumbnail}
            />
          </div>
          <div className='content'>
            <div className='price'>{result.discounted_price}</div>
            <div className='title'>{result.name}</div>
            <div className='description'>{`${result.description.substring(
              0,
              35
            )}...`}</div>
          </div>
        </Link>
      );
    });
  };
  const clearInput = () => {
    // this.setState({ value: '' }, () => {
    //   props.searchQuery(this.state.value);
    // });
    setValue('');
    props.searchQuery(value);
  };
  const callback = e => {
    // console.log('TEST : ', e.keyCode);
    if (e.keyCode === 27) {
      //   this.setState({ value: '' }, () => {
      //     props.searchQuery(this.state.value);
      //   });
      clearInput();
    }
    if (e.keyCode === 30) {
      props.searchQuery(value);
    }
  };

  //   componentDidMount() {
  //     window.addEventListener('keydown', this.callback, false);
  //     document.addEventListener('mousedown', this.handleClickOutside);
  //     this.moveFocus();
  //   }

  //   componentWillUnmount() {
  //     window.removeEventListener('keydown', window.callback, false);
  //     document.removeEventListener('mousedown', this.handleClickOutside);
  //     }
  useEffect(() => {
    window.addEventListener('keydown', callback, false);
    document.addEventListener('mousedown', handleClickOutside);
    moveFocus();
    return () => {
      window.removeEventListener('keydown', callback, false);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback]);

  /**
   * Alert if clicked on outside of element
   */
  //   const handleClick = e => {
  //     const node = myRef.current;
  //     if (node.contains(e.target)) {
  //       //click the inside , continue whatever you want
  //       console.log('inside TEST : ', e.target);
  //       return;
  //     }
  //     handleClickOutside();
  //   };
  const handleClickOutside = event => {
    // console.log('outside TEST : ', myRef);
  };
  // console.log(props.selProdData);
  return (
    <header className='ui header'>
      {/* <ListExample /> */}
      <Menu>
        <Menu.Item className='left menu'>
          <Link to={`/`}>
            <span
              className='ui item'
              style={{
                backgroundColor: '#f62f5e',
                color: '#fff',
                fontWeight: 'bolder',
                textTransform: 'uppercase',
                letterSpacing: '.4rem'
              }}
            >
              shopmate
            </span>
          </Link>
        </Menu.Item>

        <Navigation />

        <Menu.Item className='right menu'>
          <div
            className={`ui search category ${
              props.searchResult.rows ? 'active visible' : ''
            }`}
          >
            <div className='ui icon input'>
              <input
                className='prompt'
                type='text'
                placeholder='Search...'
                onChange={queryString}
                value={value}
              />
            </div>
            {value.length === 0 ? (
              <i className='search icon'></i>
            ) : (
              <i className='icon window close outline' onClick={clearInput}></i>
            )}

            <div
              className={`results transition ${
                props.searchResult.rows && props.searchResult.rows.length > 0
                  ? 'visible'
                  : 'hidden'
              }`}
              ref={myRef}
            >
              {renderResults()}
            </div>
          </div>
          <div className='bag'>
            <Link to={`/ecom/cartPage`}>
              <p>{cartCount}</p>
              <p>
                <i className='icon shop'></i>
              </p>
            </Link>
          </div>
        </Menu.Item>
      </Menu>
    </header>
  );
};
const mapDispatchToProps = dispatch => ({
  searchQuery: data => dispatch(searchQuery(data))
});
const mapStateToProps = state => {
  return {
    searchResult: state.ecomdata.searchResult,
    selectedProd: state.ecomdata.selectedProdData
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
