import React, { Component } from 'react';
class TableHeader extends Component {
    raiseSort = path => {
        const sortcolumn = { ...this.props.sortcolumn };
        if (sortcolumn.path === path)
            sortcolumn.order = (sortcolumn.order === 'asc') ? 'desc' : 'asc';
        else {
            sortcolumn.path = path;
            sortcolumn.order = 'asc';
        }
        this.props.onSort(sortcolumn);
    }
  
    render() { 
        return (
            <thead>
            <tr>
                    {this.props.columns.map(column => (<th key={column.path || column.key} onClick={() => this.raiseSort(column.path)}>{column.label}</th>))}
            </tr>
        </thead>  );
    }
}
 
export default TableHeader;