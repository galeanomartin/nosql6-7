import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Swal from "sweetalert2";

import Nav from "./Navbar";

function Agregar() {
  const [biografia, setBiografia] = useState("");
  const [imagenes, setCantidad] = useState("");
  const [character, setCharacter] = useState("");
  const [house, setHouse] = useState("");
  const [images, setImages] = useState([]);
  const [year, setYear] = useState("");
  const [name, setName] = useState("");
  const [equipamento, setEquipamento] = useState("");

  //Peticion para agregar un super Heroe

  const agregarHeroe = (e) => {
    e.preventDefault();
    return axios
      .post("http://localhost:5000/agregarHeroe", {
        biography: biografia,
        name: name,
        character: character,
        year: year,
        house: house,
        images: images,
        equipamento: equipamento,
        cantidad_imagenes: imagenes,
      })
      .then((res) => {
        console.log(res.data);
        
        Swal.fire({
          title: "SUPERHEROE agregado!",
          /*text: "Se agrego correctamente",
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

  const handleFoto = (e) => {
    let url = e.target.value;
    console.log(url);
    let arrayAux = [];
    arrayAux.push(url);
    setImages(arrayAux);
    setCantidad(images.length);
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

  useEffect(() => { }, []);

  return (

    <div style={body}>
      < Nav />
      <div align="center">
        <div class="jumbotron">
          <h3 className="text-dark" align="center">AGREGAR SUPERHEROE</h3>

          {/*<hr class="my-4" />*/}

          <div align="center">
            <form className="col-sm-4" onSubmit={agregarHeroe}>
              <div class="form-group">
                <h2 className="text-dark">{name}</h2>

                <div class="form-group">
                  <input type="text" autoFocus class="form-control" required placeholder="Ingrese el nombre del Superheroe."
                    onChange={(e) => setName(e.target.value)} />
                </div>

                <div class="form-group">
                  <input type="text" class="form-control" /*required*/ placeholder="Ingrese el nombre personaje (si tiene)."
                    onChange={(e) => setCharacter(e.target.value)} />
                </div>

                <div class="form-group">
                
                  <textarea placeholder="Ingrese la biografía del Superheroe."
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
                <select class="form-control" id="exampleFormControlSelect1" onChange={e => setHouse(e.target.value)} >
                  <option value="" disabled selected hidden>Seleccionar una editorial</option>
                  <option value="MARVEL">MARVEL</option>
                  <option value="DC">DC</option>
                </select>
              </div>

              <div class="form-group">
                <input type="number" class="form-control" required placeholder="Año de aparición."
                  onChange={(e) => setYear(e.target.value)} />
              </div>

              <div class="form-group">
                <input type="text" class="form-control" required placeholder="Ingrese url de la imagen."
                  onChange={(e) => handleFoto(e)} />
              </div>

              <div class="form-group">
                <input type="text" class="form-control" /*required*/ placeholder="Ingrese el equipamiento (si tiene)."
                  onChange={(e) => setEquipamento(e.target.value)} />
              </div>

              <button type="submit" class="btn btn-success btn-lg text-light">
                Agregar SUPERHEROE
          </button>
            </form>

          </div>

        </div>
      </div>

    </div>
  );
}
export default Agregar;
