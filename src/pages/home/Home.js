import { Paper } from '@material-ui/core';
import React, { useState } from 'react';
import CFilterItem from '../../components/CFilterItem/CFilterItem';
import CSecurityProgressBar from '../../components/CSecurityProgressBar/CSecurityProgressBar';
import { Providers } from '../../utils/constants';
import { MappedElement } from '../../utils/helpers';
import SecurityCheckListJson from '../../assets/jsons/signatures-metadata.json';
import CChecklistItem from '../../components/CChecklistItem/CChecklistItem';
console.log(SecurityCheckListJson)
function Home() {
    
    return (

        <div className="container">

            <h1 className="mt-4 mb-4 "> Cloud Security Checklist </h1>


            <Paper className="filters-container">

                <h4>Filter by cloud service providers: </h4>

                <div>
                    <MappedElement data={Providers} renderElement={(obj, index) => {
                        return <CFilterItem isActive={true} filter={obj} onClick={() => { alert('asdf') }} />
                    }} />
                </div>

            </Paper>

            <CSecurityProgressBar />

            <div className="checklist-wrapper">

                <MappedElement
                    data={SecurityCheckListJson}
                    renderElement={(obj, index) => {

                        return <CChecklistItem item={obj} key={obj?.name} />

                    }} />

            </div>

        </div>


    )

}

export default Home;
