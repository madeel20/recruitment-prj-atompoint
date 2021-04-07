import React from 'react';
import PropTypes from 'prop-types';

const CFilterItem = (props) => {

    const { filter , isActive , onClick } = props;

    return (

        <span onClick={onClick}  className={`filter-item ${isActive?'active':''}`}>
                {filter?.name}
        </span>

    )
}

// default props values
CFilterItem.propTypes = {
    filter: PropTypes.object,
    isActive: PropTypes.bool,
    onClick: PropTypes.func
}

// default props
CFilterItem.defaultProps = {
    filter: {name:''},
    isActive: false,
    onClick: null
}

export default CFilterItem
