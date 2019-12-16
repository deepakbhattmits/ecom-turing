import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {
  fetchDepartments,
  fetchCategories,
  fetchCategoriesData,
  fetchCategoryProd
} from '../../actions';

class Navigation extends Component {
  state = {
    visible: false,
    active: false
  };
  componentDidMount() {
    this.props.fetchDepartments();
  }
  departmentClick = e => {
    // console.log('TEST : ',e.target.id);
    this.props.fetchCategories(e.target.id);
    this.setState({ visible: true, active: true });
  };
  cat = e => {
    this.setState({ visible: false });
    this.props.fetchCategoriesData(e.target.id);
    this.props.fetchCategoryProd(e.target.id);
  };
  renderDepartments() {
    if (Object.values(this.props.departments).length === 0) {
      return <div>Loading...</div>;
    }
    return this.props.departments.map(({ name, department_id }) => {
      return (
        <div
          role='listbox'
          aria-expanded='false'
          className='ui pointing dropdown link item '
          key={department_id}
          id={department_id}
          onClick={this.departmentClick}
        >
          <div
            className={`text ${
              Object.values(this.props.categories).length > 0
                ? this.props.categories.some(
                    item => item.department_id === department_id
                  )
                  ? this.state.active
                    ? 'active'
                    : ''
                  : ''
                : ''
            }`}
            role='alert'
            aria-live='polite'
            id={department_id}
            onClick={this.departmentClick}
          >
            {' '}
            {name}
          </div>
          <i
            aria-hidden='true'
            className='dropdown icon'
            id={department_id}
            onClick={this.departmentClick}
          />

          <div
            className={`menu transition ${
              Object.values(this.props.categories).length > 0
                ? this.props.categories.some(
                    item => item.department_id === department_id
                  )
                  ? this.state.visible
                    ? 'visible'
                    : ''
                  : ''
                : ''
            }`}
          >
            {this.renderCategories()}
          </div>
        </div>
      );
    });
  }
  renderCategories() {
    if (Object.values(this.props.categories).length === 0) {
      return <div>Loading...</div>;
    }
    return this.props.categories.map(({ category_id, name, department_id }) => {
      return (
        <div className='item' key={category_id} onClick={this.cat}>
          <Link to={`/ecom/categories/${category_id}`} id={category_id}>
            {name}
          </Link>
        </div>
      );
    });
  }
  render() {
    // style={{ backgroundColor: '#f62f5e' }}
    // console.log("Departments: ",Object.values(this.props.categories).length > 0 ? ( this.props.categories.some(item => item.department_id === 1 ) ? 'visible': 'false'): '');
    return (
      <Fragment>
        {/* <Menu.Item>
                 { this.renderDepartments() }
                </Menu.Item> */}

        <div className='ui menu'>{this.renderDepartments()}</div>
      </Fragment>
    );
  }
}
const mapDispatchToProps = dispatch => ({
  fetchDepartments: () => dispatch(fetchDepartments()),
  fetchCategories: data => dispatch(fetchCategories(data)),
  fetchCategoriesData: data => dispatch(fetchCategoriesData(data)),
  fetchCategoryProd: data => dispatch(fetchCategoryProd(data))
});
const mapStateToProps = state => {
  return {
    categories: state.ecomdata.departmentCategory,
    departments: state.ecomdata.departments
  };
};
// export default connect(mapStateToProps, { fetchDepartments, fetchCategories, fetchCategoriesData, fetchCategoryProd })(Navigation);
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
