import classes from './ManagerPage.module.css';
import React from 'react';
import DataTable from './DataTable/DataTable';


const ManagerPage = () => {
    return (
        <div className={classes.Page}>
        <DataTable/>
        </div>
    );
};

export default ManagerPage;