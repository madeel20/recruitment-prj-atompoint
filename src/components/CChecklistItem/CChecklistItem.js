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

            <Checkbox color="green" size="medium"  />

            <Accordion className="c-checklist-item">

                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <h6 className="name-container"> {item?.name} <span className="group-text">({item?.group}) </span></h6>


                    {/* <span className="category">
                {item?.category} 
          </span> */}
                    <span className="item-attributes-container">

                        <Chip label={item?.risk} color="" />
                        <Chip label={item?.category} color="primary" />
                        <Chip label={item?.cloud} color="secondary" />

                    </span>


                </AccordionSummary>

                <AccordionDetails>

                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
          </Typography>

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
