import React from 'react';
import {  withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import PropTypes from 'prop-types';

const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    colorPrimary: {
        backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);



const  CSecurityProgressBar = (props) => {

    const {totalChecks,checksPerformed} = props;

    return (
        <div className="c-security-progress-bar">

            <h5>How much secure is your cloud?</h5>

            <div className="info-wrapper">

                <span className="statistics">
                        {checksPerformed} / {totalChecks}
                </span>

                <BorderLinearProgress className="progress-bar" variant="determinate" value={(checksPerformed/totalChecks)*100} />

            </div>

        </div>
    )
}

// default props values
CSecurityProgressBar.propTypes = {
    totalChecks: PropTypes.number,
    checksPerformed: PropTypes.number,
}

// default props
CSecurityProgressBar.defaultProps = {
    totalChecks:100,
    checksPerformed:0,
}

export default CSecurityProgressBar
