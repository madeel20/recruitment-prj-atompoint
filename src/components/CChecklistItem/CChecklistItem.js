import React from 'react'
import PropTypes from 'prop-types';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Checkbox, Chip } from '@material-ui/core';

const CChecklistItem = (props) => {

    const { item, isChecked, onCheckClick } = props;

    return (
        <div className="c-checklist-item-wrapper">

            <Checkbox checked={isChecked} onClick={onCheckClick} color="default" size="medium" />

            <Accordion className="c-checklist-item">

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h6 className="name-container">  {item?.description}     <span className="group-text">({item?.group}) </span></h6>

                    <span className="item-attributes-container">

                        <Chip label={item?.risk} color="" />
                        <Chip label={item?.category} color="primary" />
                        <Chip label={item?.service} color="secondary" />
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
    onCheckClick: PropTypes.func,
    isChecked: PropTypes.bool
}

// default props
CChecklistItem.defaultProps = {
    item: {},
    onCheckClick: null,
    isChecked: false
}

export default CChecklistItem;
