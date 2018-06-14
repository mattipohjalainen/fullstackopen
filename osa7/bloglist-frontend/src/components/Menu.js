import React from "react";
import { NavLink } from "react-router-dom";

const Menu = ( props ) => {
 const { name, logout } = props

 const menuStyle = { 
    padding: 20,
    background: 'turquoise'
  }
  const activeStyle = {
    fontWeight: 'bold',
      color: 'blue'
  }

  return (
    <div style={ menuStyle }>    
    <NavLink to="/blogs" activeStyle={ activeStyle}>blogs</NavLink> &nbsp;
    <NavLink to="/users" activeStyle={ activeStyle}>users</NavLink> &nbsp;
    <span>
    {name} logged in{" "}
            <button onClick={logout}>logout</button>
    </span>
  </div>
  )
}

export default Menu