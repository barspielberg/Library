import classes from './ManagerPage.module.css';
import React, { useState } from 'react';
import DataTable from './DataTable/DataTable';
import EditBook from './EditBook/EditBook';
import Book from '../../models/Book';


const ManagerPage: React.FC = () => {
    const [selected,select] = useState<Book>(new Book())
    return (
        <div className={classes.Page}>
        <DataTable select={select}/>
        <EditBook selected={selected} select={select}/>
        </div>
    );
};

export default ManagerPage;