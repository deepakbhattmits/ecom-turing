import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import history from '../../history';

import {
  fetchDepartments,
  fetchCategories,
  fetchCategoriesData,
  fetchCategoryProd
} from '../../actions';

const Navigation =props=> {
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);
  useEffect(() =>{
    props.fetchDepartments();
  }, [props]);
  const departmentClick = e => {
    // console.log('TEST :',e.target.id);
    props.fetchCategories(e.target.id);
    setVisible(!visible);
    setActive(!active);
  };
  const cat = e => {
    const { id } = e.target;
    history.push(`/ecom/categories/${id}`);
    setVisible(false);
    props.fetchCategoriesData(id);
    props.fetchCategoryProd(id);
  };
  const renderDepartments=()=> {
    if (Object.values(props.departments).length === 0) {
      return <div>Loading...</div>;
    }
    return props.departments.map(({ name, department_id }) => {
      return (
        <div
          role='listbox'
          aria-expanded='false'
          className='ui pointing dropdown link item '
          key={department_id}
          id={department_id}
          onClick={departmentClick}
        >
          <div
            className={`text ${
              Object.values(props.categories).length > 0
                ? props.categories.some(
                    item => item.department_id === department_id
                  )
                  ? active
                    ? 'active'
                    : ''
                  : ''
                : ''
            }`}
            role='alert'
            aria-live='polite'
            id={department_id}
            onClick={departmentClick}
          >
            {' '}
            {name}
          </div>
          <i
            aria-hidden='true'
            className='dropdown icon'
            id={department_id}
            onClick={departmentClick}
          />

          <div
            className={`menu transition ${
              Object.values(props.categories).length > 0
                ? props.categories.some(
                    item => item.department_id === department_id
                  )
                  ? visible
                    ? 'visible'
                    : ''
                  : ''
                : ''
            }`}
          >
            {renderCategories()}
          </div>
        </div>
      );
    });
  }
  const renderCategories=()=> {
    if (Object.values(props.categories).length === 0) {
      return <div>Loading...</div>;
    }
    return props.categories.map(({ category_id, name, department_id }) => {
      return (
        <div className='item' id={category_id} key={category_id} onClick={cat}>
            {name}
        </div>
      );
    });
  }
    return (
      <>
      <div className='ui menu'>{renderDepartments()}</div>
      </>
    );
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
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
