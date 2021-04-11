import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Paper } from '@material-ui/core';
import CFilterItem from '../../components/CFilterItem/CFilterItem';
import CSecurityProgressBar from '../../components/CSecurityProgressBar/CSecurityProgressBar';
import { Providers, Services } from '../../utils/constants';
import { checkUserExist, MappedElement, usePersistedState } from '../../utils/helpers';
import SecurityCheckListJson from '../../assets/jsons/signatures-metadata.json';
import CChecklistItem from '../../components/CChecklistItem/CChecklistItem';
import { Lock } from '@material-ui/icons';
import CRegisterForm from '../../components/CRegisterForm/CRegisterForm';
import { Alert } from 'bootstrap';


function Home() {

    const [filters, setFilters] = usePersistedState('filters', { providers: [], services: [] });
    const [checklist, setChecklist] = usePersistedState('checklist', []);
    const [user, setUser] = usePersistedState('user', {});
    const [openRegForm, setOpenRegForm] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');

    useEffect(() => {

    }, []);

    const getFilteredList = useCallback(() => {

        // check if user is not registered yet then don't apply filters
        if (!checkUserExist(user)) {
            return SecurityCheckListJson.slice(1, 4);
        }

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

    }, [filters, user]);


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

    const handleOnCheck = (testName) => {

        // first check if test is already in checked then remove it and return
        if (checklist.includes(testName)) {
            setChecklist(prevValue => prevValue.filter(it => it !== testName));
            return;
        }

        // else add service to filters
        setChecklist(prevValue => [...prevValue, testName]);
    }



    return (

        <div className="container home-container">

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

            <CSecurityProgressBar totalChecks={SecurityCheckListJson.length} checksPerformed={checklist.length} />

            <div className="checklist-wrapper">

                <MappedElement
                    data={getFilteredList()}
                    renderElement={(obj, index) => {

                        return <CChecklistItem

                            isChecked={checklist.includes(obj?.name)}
                            onCheckClick={() => handleOnCheck(obj?.name)}
                            item={obj}
                            key={obj?.name}

                        />

                    }} />

                {successMsg &&

                    <div class="alert alert-success text-center" role="alert">
                        {successMsg}
                    </div>
                }

                

                {!checkUserExist(user) && !successMsg &&
                    <div onClick={() => setOpenRegForm(true)} className="lock-container">
                        <Lock />
                        <h6 className="mt-2">Click to register and unlock all checklist items.</h6>
                    </div>
                }



                <CRegisterForm
                    open={openRegForm}
                    onClose={() => setOpenRegForm(false)}
                    onRegistration={(msg) => setSuccessMsg(msg)}
                />



            </div>
        </div>


    )

}

export default Home;
