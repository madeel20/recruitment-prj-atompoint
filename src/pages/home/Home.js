import { Paper } from '@material-ui/core';
import React from 'react';
import CFilterItem from '../../components/CFilterItem/CFilterItem';
import { Providers } from '../../utils/constants';
import { MappedElement } from '../../utils/helpers';


function Home() {

    return (

        <div className="container">
            
            <h1 className="mt-4 mb-4 "> Cloud Security Checklist </h1>


            <Paper className="filters-container">

                    <h4>Filter by cloud service providers: </h4>

                    <div>
                        <MappedElement data={Providers} renderElement={(obj,index)=>{
                                return <CFilterItem isActive={true} filter={obj} onClick={()=>{alert('asdf')}} />
                        }} />
                    </div>




            </Paper>

        </div>


    )

}

export default Home;
