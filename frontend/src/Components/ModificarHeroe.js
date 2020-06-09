import React, { useState, useEffect, Fragment, Router } from "react";
import { Redirect, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

import Nav from "./Navbar";

function ModificarHeroe({ id }) {
  const [biografia, setBiografia] = useState("");
  const [imagenes, setCantidad] = useState("");
  const [character, setCharacter] = useState("");
  const [house, setHouse] = useState("");
  const [images, setImages] = useState([]);
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [equipamento, setEquipamento] = useState("");
  const [identi, setId] = useState("");
  const [iden, setIden] = useState("");


  const encontrarHeroe = () => {
    axios
      .get("http://localhost:5000/listarTodos")
      .then((res) => {
        console.log(res.data);
        let heroeBuscado = res.data.filter((hero) => hero._id === id);
        console.log(heroeBuscado);
        setBiografia(heroeBuscado[0].biography);
        setCantidad(heroeBuscado[0].cantidad_imagenes);
        setCharacter(heroeBuscado[0].character);
        setHouse(heroeBuscado[0].house);
        setImages(heroeBuscado[0].images);
        setBiografia(heroeBuscado[0].biography);
        setName(heroeBuscado[0].name);
        setYear(heroeBuscado[0].year);
        setId(heroeBuscado[0]._id);
        setEquipamento(heroeBuscado[0].equipamento);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const modificarHeroe = (e) => {
    e.preventDefault();
    return axios
      .post("http://localhost:5000/modificar", {
        biography: biografia,
        name: name,
        character: character,
        year: year,
        house: house,
        images: images,
        equipamento: equipamento,
        id: identi,
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "SUPERHEROE modificado.",
          /*text: "Se modifico correctamente",
          imageUrl:
            "https://i0.pngocean.com/files/158/205/64/5bbc3d0762e88-thumb.jpg",*/
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        }).then((result) => {
          if (result.value) {
            let link = "/";
            window.location.href = link;
          }
        });
      })
      .catch((err) => {
        throw err.response.data;
      });
  };

  const eliminarHeroe = ({ iden }) => {
    return axios
      .post("http://localhost:5000/eliminar", {
        id: id,
      })
      .then((res) => {
        console.log(res.data);
        Swal.fire({
          title: "SUPERHEROE eliminado!",
          /*text: "Se elimino correctamente",
          imageUrl:
            "https://i0.pngocean.com/files/158/205/64/5bbc3d0762e88-thumb.jpg",*/
          imageWidth: 400,
          imageHeight: 200,
          imageAlt: "Custom image",
        }).then((result) => {
          if (result.value) {
            let link = "/";
            window.location.href = link;
          }
        });
      })
      .catch((err) => {
        throw err.response.data;
      });
  };

  const body = {

    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    position: "absolute",
    minHeight: "100%",
    overflowY: "hidden",
    overflowX: "hidden",
  };

  useEffect(() => {
    encontrarHeroe();
  }, []);

  return (
    <div style={body}>
      < Nav />
      <div align="center">
        <div class="jumbotron">
          <h3 className="text-dark" align="center">MODIFICAR SUPERHEROE</h3>

          {/*<hr class="my-4" />*/}

          <div align="center">
            <form className="col-sm-4" onSubmit={modificarHeroe}>
              <div class="form-group">
                <h2 className="text-dark">{name}</h2>

                <div class="form-group">
                  <label class="text-dark" text-align="right">Nombre del Superheroe:</label>
                  <input type="text" class="form-control" required placeholder="Ingrese el nombre del Superheroe." value={name}
                    onChange={(e) => setName(e.target.value)} />
                </div>

                <div class="form-group">
                  <label class="text-dark" text-align="right">Nombre del personaje:</label>
                  <input type="text" class="form-control" /*required*/ placeholder="Ingrese el nombre personaje (si tiene)." value={character}
                    onChange={(e) => setCharacter(e.target.value)} />
                </div>

                <div class="form-group">
                  <label class="text-dark" text-align="right">Biografía del Superheroe:</label>
                  <textarea placeholder="Ingrese la biografía del Superheroe." value={biografia}
                    class="form-control"
                    id="biografi"
                    rows="3"
                    required
                    onChange={(e) => setBiografia(e.target.value)}
                  >
                    {biografia}
                  </textarea>
                </div>

              </div>

              <div class="form-group">
                <label class="text-dark" text-align="right">Seleccionar una editorial: </label>
                <select class="form-control" id="exampleFormControlSelect1" value={house} onChange={e => setHouse(e.target.value)} >
                  <option value="" disabled selected hidden>Seleccionar una editorial</option>
                  <option value="MARVEL">MARVEL</option>
                  <option value="DC">DC</option>
                </select>
              </div>

              <div class="form-group">
                <label class="text-dark" text-align="right">Año de aparición:</label>
                <input type="number" class="form-control" required placeholder="Año de aparición." value={year}
                  onChange={(e) => setYear(e.target.value)} />
              </div>

              {/*<div class="form-group">
                <input type="text" class="form-control" required placeholder="Ingrese url de la imagen."
                  onChange={(e) => handleFoto(e)} />
  </div>*/}

              <div class="form-group">
                <label class="text-dark" text-align="right">Equipamiento del Superheroe:</label>
                <input type="text" class="form-control" /*required*/ placeholder="Ingrese el equipamiento (si tiene)." value={equipamento}
                  onChange={(e) => setEquipamento(e.target.value)} />
              </div>


              <button type="submit" class="btn btn-success btn-block text-light" >
                Modificar datos del SUPERHEROE
           </button>


              {/*<button  class="btn btn-danger mr-3 btn-block" onClick={() => modificarHeroe()}>
                    MODIFICAR
                  </button>/*/}

            </form>
            < br />

            <div align="center">

              <div class="col-sm-4">
                <p className="lead">
                  <button class="btn btn-danger mr-3 btn-block" onClick={() => eliminarHeroe(iden)}>
                    Eliminar SUPERHEROE ATENCION!!! No se puede cancelar
                  </button>
                </p>
                <a href="javascript:window.history.back();" class="btn btn-primary btn-block text-light" role="button" aria-pressed="true">Cancelar Modificación/Eliminación</a>
              </div>
              {/*<a href="javascript:window.history.back();">« Volver atrás</a>*/}
            </div>




          </div>

        </div>
      </div>

    </div>
  );
}
export default ModificarHeroe;
