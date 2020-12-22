import classes from './ManagerPage.module.css';
import React from 'react';
import DataTable from './DataTable/DataTable';
import EditBook from './EditBook/EditBook';


const ManagerPage = () => {
    return (
        <div className={classes.Page}>
        <DataTable/>
        <EditBook/>
        </div>
    );
};

export default ManagerPage;