import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Checkbox, Chip, withStyles } from '@material-ui/core';

const CChecklistItem = (props) => {

    const { item } = props;

    return (
        <div className="c-checklist-item-wrapper">

            <Checkbox color="default" size="medium" />

            <Accordion className="c-checklist-item">

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h6 className="name-container">  {item?.description}     <span className="group-text">({item?.group}) </span></h6>


                    {/* <span className="category">
                {item?.category} 
          </span> */}
                    <span className="item-attributes-container">
                        <Chip label={item?.risk} color="" />
                        <Chip label={item?.category} color="primary" />
                        <Chip label={item?.cloud} color="secondary" />

                    </span>


                </AccordionSummary>

                <AccordionDetails className="details-container">

                    <span>

                        <strong>Function: </strong>

                        {item?.function}
                    </span>

                    <br/>

                    <h6>Description:</h6>
                    <p>
                        {item?.pageDetail}

                    </p>

                    <h6>Remediation Steps:</h6>

                    <span className="remediation-steps">
                        {item?.RemediationSteps.slice(1,item?.RemediationSteps.length-1)}
                    </span>

                    <br/>

                    <span>

                        <strong>Test Passed: </strong>

                        {item?.messagePass}
                    </span>

                    <span>
                        <strong>Test Failed: </strong>

                        {item?.messageFail}
                    </span>

                </AccordionDetails>

            </Accordion>

        </div>
    )
}


// default props values
CChecklistItem.propTypes = {
    item: PropTypes.object,
}

// default props
CChecklistItem.defaultProps = {
    item: {},
}

export default CChecklistItem;
