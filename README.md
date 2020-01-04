please follow below steps
 
1 npm install
2 npm start

 <div className="ui pointing menu">
        <div className='left menu'>
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

        </div>
        <Navigation />
        <div className="right menu">
          <div className="item">
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
          </div>
        </div>