import React, { useCallback, useMemo, useState } from 'react';
import { Paper } from '@material-ui/core';
import CFilterItem from '../../components/CFilterItem/CFilterItem';
import CSecurityProgressBar from '../../components/CSecurityProgressBar/CSecurityProgressBar';
import { Providers, Services } from '../../utils/constants';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { MappedElement, usePersistedState } from '../../utils/helpers';
import SecurityCheckListJson from '../../assets/jsons/signatures-metadata.json';
import CChecklistItem from '../../components/CChecklistItem/CChecklistItem';

function Home() {
    const [filters, setFilters] = usePersistedState('filters', { providers: [], services: [] });
    const [checked, setChecked] = usePersistedState('checked', []);
    const [user, setUser] = usePersistedState('user', []);


    const getFilteredList = useCallback(() => {
        let filteredData = SecurityCheckListJson;

        // first filter by provider
        if (filters.providers.length > 0) {
            filteredData = SecurityCheckListJson.filter(it => filters.providers.includes(it?.cloud));

        }

        // now filter by services
        if (filters.services.length > 0) {

            filteredData = filteredData.filter(it => filters.services.includes(it?.service))
        }
        //return the filtered data
        return filteredData;

    }, [filters]);


    const handleProviderClick = (provider) => {

        // first check if provider is already in filters then remove it and return
        if (filters.providers?.includes(provider)) {
            setFilters(prevValue => { return { ...prevValue, providers: [...prevValue.providers.filter(it => it !== provider)] } });
            return;
        }

        // else add provider to filters
        setFilters(prevValue => { return { ...prevValue, providers: [...prevValue.providers, provider] } });
    }

    const handleServiceClick = (service) => {

        // first check if service is already in filters then remove it and return
        if (filters.services?.includes(service)) {
            setFilters(prevValue => { return { ...prevValue, services: [...prevValue.services.filter(it => it !== service)] } });
            return;
        }

        // else add service to filters
        setFilters(prevValue => { return { ...prevValue, services: [...prevValue.services, service] } });
    }

    return (

        <div className="container">

            <h1 className="mt-4 mb-4 "> Cloud Security Checklist </h1>


            <Paper className="filters-container">

                <h4>Filter by cloud service providers: </h4>

                <div>


                    <div className="filters">

                        <h6>Cloud Providers:</h6>

                        <CFilterItem
                            isActive={filters.providers.length === 0}
                            filter={'All'}
                            onClick={() => setFilters(prevValue => { return { ...prevValue, providers: [] } })}
                            key={'all'}
                        />

                        <MappedElement
                            data={Providers}
                            renderElement={(obj, index) => {
                                return <CFilterItem
                                    key={obj}
                                    isActive={filters.providers.includes(obj)}
                                    filter={obj}
                                    onClick={() => handleProviderClick(obj)}
                                    key={obj}
                                />
                            }} />

                    </div>

                    <div className="filters">

                        <h6>Services:</h6>

                        <CFilterItem
                            isActive={filters.services.length === 0}
                            filter={'All'}
                            onClick={() => setFilters(prevValue => { return { ...prevValue, services: [] } })}
                            key={'all'}
                        />

                        <MappedElement
                            data={Services}
                            renderElement={(obj, index) => {
                                return <CFilterItem
                                    isActive={filters.services.includes(obj)}
                                    filter={obj}
                                    onClick={() => handleServiceClick(obj)}
                                    key={obj}
                                />
                            }} />

                    </div>

                </div>

            </Paper>

            <CSecurityProgressBar />

            <div className="checklist-wrapper">

                <MappedElement
                    data={getFilteredList()}
                    renderElement={(obj, index) => {

                        return <CChecklistItem item={obj} key={obj?.name} />

                    }} />

            </div>

       

        </div>


    )

}

export default Home;
