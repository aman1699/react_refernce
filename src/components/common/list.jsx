import React, { Component } from 'react';
const List = props => {
    return (<ul className="list-group">
        {props.items.map(item => <li onClick={() => props.onItemsSelect(item)} key={item._id} style={{cursor:"pointer"}} className={item === props.selectItem ? "list-group-item active" : "list-group-item"}>{item.name}</li>)}
       
    </ul>  );
}
 
export default List;