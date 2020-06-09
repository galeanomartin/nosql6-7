import React from "react";

const logo_marvel_dc = {
  width: null,
  resizeMode: 'contain',
  height: 75
};


function Header({ logo, house }) {
  return (
    
    <center>
    <img src={logo} alt="Marvel" style={logo_marvel_dc} />
    </center>
    
  );
}
export default Header;
