import React, { useState, Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Typography from '@material-ui/core/Typography';
import div from './custom-component.css';

function Card({ thing }) {
  const [verHeroe, estado] = useState("false");
  const [modificar, setModificar] = useState("false");

  if (verHeroe === "true") {
    let dire = thing._id;
    return <Redirect to={`/verHeroe/${dire}`} />;
  }

  if (modificar === "true") {
    let dire = thing._id;
    return <Redirect to={`/modificar/${dire}`} />;
  }

  const styleImage = {
    maxWidth: "17rem",
    maxWidht: "17rem",
    maxHeight: "16rem",
    minHeight: "16rem",
    marginTop: "50px",
  };

  return (

    <div>
      <img class="card-img-top" src={thing.images[0]} style={styleImage} />
      <div class="card-body">
        <h5 class="card-title mb-2 text-dark-bold ">{thing.name}</h5>

        <custom-component style={div}> {thing.biography} </custom-component>
        < br />

        <h6 class="text-dark">Editorial: {thing.house} </h6>

        < br />
        <button class="btn btn-primary mr-3" onClick={() => estado("true")}>
          Ver más datos de {thing.name}
        </button>
        
        {/*<button
          class="btn btn-primary mr-3"
          onClick={() => setModificar("true")}
        >
          Modificar a {thing.name}
        </button>/*/}
        
      </div>
    </div>

  );
}
export default Card;
{/*
import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

function Card({ thing }) {
  const [verHeroe, estado] = useState("false");
  const [modificar, setModificar] = useState("false");

  if (verHeroe === "true") {
    let dire = thing._id;
    return <Redirect to={`/verHeroe/${dire}`} />;
  }

  if (modificar === "true") {
    let dire = thing._id;
    return <Redirect to={`/modificar/${dire}`} />;
  }

  const styleImage = {
    maxWidth: "19rem",
    maxWidht: "19rem",
    maxHeight: "18rem",
    minHeight: "18rem",
    marginTop: "50px",
  };

  return (
    <div>
      <img class="card-img-top" src={thing.images[0]} style={styleImage} />
      <div class="card-body">
        <h5 class="card-title mb-2 text-danger ">{thing.name}</h5>
        <button class="btn btn-primary mr-3" onClick={() => estado("true")}>
          Ver heroe
        </button>
        <button
          class="btn btn-primary mr-3"
          onClick={() => setModificar("true")}
        >
          Modificar
        </button>
      </div>
    </div>
  );
}
export default Card;

{/*import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";

function Card({ thing }) {
  const [verHeroe, estado] = useState("false");
  const [modificar, setModificar] = useState("false");

  if (verHeroe === "true") {
    let dire = thing._id;
    return <Redirect to={`/verHeroe/${dire}`} />;
  }

  if (modificar === "true") {
    let dire = thing._id;
    return <Redirect to={`/modificar/${dire}`} />;
  }

  const styleImage = {
    maxWidth: "19rem",
    maxWidht: "19rem",
    maxHeight: "18rem",
    minHeight: "18rem",
    marginTop: "50px",
  };

  return (
    <div>
      <img class="card-img-top" src={thing.images[0]} style={styleImage} />
      <div class="card-body">
        <h5 class="card-title mb-2 text-danger ">{thing.name}</h5>
        <button class="btn btn-primary mr-3" onClick={() => estado("true")}>
          Ver heroe
        </button>
        <button
          class="btn btn-primary mr-3"
          onClick={() => setModificar("true")}
        >
          Modificar
        </button>
      </div>
    </div>
  );
}
export default Card;*/}
