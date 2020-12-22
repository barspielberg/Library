import classes from './ManagerPage.module.css';
import React, { useState } from 'react';
import DataTable from './DataTable/DataTable';
import EditBook from './EditBook/EditBook';


const ManagerPage = () => {
    const [selected,select] = useState({})
    return (
        <div className={classes.Page}>
        <DataTable select={select}/>
        <EditBook selected={selected}/>
        </div>
    );
};

export default ManagerPage;