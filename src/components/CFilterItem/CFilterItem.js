import React from 'react';
import PropTypes from 'prop-types';

const CFilterItem = (props) => {

    const { filter , isActive , onClick } = props;

    return (

        <span onClick={onClick}  className={`filter-item ${isActive?'active':''}`}>
                {filter}
        </span>

    )
}

// default props values
CFilterItem.propTypes = {
    filter: PropTypes.string,
    isActive: PropTypes.bool,
    onClick: PropTypes.func
}

// default props
CFilterItem.defaultProps = {
    filter: '',
    isActive: false,
    onClick: null
}

export default CFilterItem
