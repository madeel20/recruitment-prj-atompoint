import React, { useCallback, useMemo } from 'react';
import { Paper } from '@material-ui/core';
import CFilterItem from '../../components/CFilterItem/CFilterItem';
import CSecurityProgressBar from '../../components/CSecurityProgressBar/CSecurityProgressBar';
import { Providers, Services } from '../../utils/constants';
import { MappedElement, usePersistedState } from '../../utils/helpers';
import SecurityCheckListJson from '../../assets/jsons/signatures-metadata.json';
import CChecklistItem from '../../components/CChecklistItem/CChecklistItem';
import { DragHandle } from '@material-ui/icons';

console.log(SecurityCheckListJson)

function Home() {

    const [filters, setFilters] = usePersistedState('filters', { providers:[], services:[] });
    const [checked, setChecked] = usePersistedState('checked', []);
    const [user, setUser] = usePersistedState('user', []);

    const checkFilterIsActive = filters => {

    }


    const getFilteredList = useCallback(() =>{

        // first filter by provider
        let filteredData = SecurityCheckListJson.filter(it=> filters.providers.includes(it?.cloud));

        // now filter by services
        filteredData = filteredData.filter(it=> filters.services.includes(it?.service))

        return filteredData;
 
    }, [filters])

    const handleProviderClick = (provider) =>{

        // first check if provider is already in filters then remove it and return
        if(filters.providers?.includes(provider)){
            setFilters(prevValue=> { return {...prevValue, providers: [...prevValue.providers.filter(it=>it !== provider )]}});
            return;
        }

        // else add provider to filters
        setFilters(prevValue=>  { return {...prevValue, providers: [...prevValue.providers,provider]}});
    }

    const handleServiceClick = (service) =>{

        // first check if service is already in filters then remove it and return
        if(filters.services?.includes(service)){
            setFilters(prevValue=> { return {...prevValue, services: [...prevValue.services.filter(it=>it !== service )]}});
            return;
        }

        // else add service to filters
        setFilters(prevValue=>  { return {...prevValue, services: [...prevValue.services,service]}});
    }

    return (

        <div className="container">

            <h1 className="mt-4 mb-4 "> Cloud Security Checklist </h1>


            <Paper className="filters-container">

                <h4>Filter by cloud service providers: </h4>

                <div>


                    <div className="filters">

                        <h6>Cloud Providers:</h6>

                        <CFilterItem isActive={filters.providers.length === 0} filter={'All'} onClick={() => { alert('asdf') }} />

                        <MappedElement data={Providers} renderElement={(obj, index) => {
                            return <CFilterItem key={obj} isActive={filters.providers.includes(obj)} filter={obj} onClick={() =>handleProviderClick(obj)} />
                        }} />

                    </div>

                    <div className="filters">

                        <h6>Services:</h6>

                        <CFilterItem isActive={filters.services.length === 0} filter={'All'} onClick={() => { alert('asdf') }} />

                        <MappedElement data={Services} renderElement={(obj, index) => {
                            console.log(obj)
                            return <CFilterItem isActive={filters.services.includes(obj)}  filter={obj} onClick={() => handleServiceClick(obj) } />
                        }} />

                    </div>

                </div>

            </Paper>

            <CSecurityProgressBar />

            <div className="checklist-wrapper">

                <MappedElement
                    data={getFilteredList}
                    renderElement={(obj, index) => {

                        return <CChecklistItem item={obj} key={obj?.name} />

                    }} />

            </div>

        </div>


    )

}

export default Home;
