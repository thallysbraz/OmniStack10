import React, { useState, useEffect } from "react";

import "./style.css"; // Importando CSS

function DevForm({ onSubmit }) {
  //estado pra armazenar github_username e techs
  const [github_username, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");

  //estado pra armazenar valor de latitude e longitude
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  //função para pegar as coordenadas de latitude e longitude
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude); //atualizando valor da latitude
        setLongitude(longitude); ////atualizando valor da longitude
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  async function handleSubmit(e) {
    e.preventDefault(); //previnir evento -> redirect de página

    await onSubmit({
      // submetendo dados
      github_username,
      techs,
      latitude,
      longitude
    });
    //atualizando valores
    setGithubUsername("");
    setTechs("");
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Input github_username */}
      <div className="input-block">
        <label htmlFor="github_username">Usuário do Github</label>
        <input
          name="github_username"
          id="github_username"
          required
          value={github_username}
          onChange={e => setGithubUsername(e.target.value)}
        />
      </div>

      {/* Input Technologias */}
      <div className="input-block">
        <label htmlFor="techs">Tecnologias</label>
        <input
          name="techs"
          id="techs"
          required
          value={techs}
          onChange={e => setTechs(e.target.value)}
        />
      </div>

      {/* Input latitude e longitude */}
      <div className="input-group">
        <div className="input-block">
          <label htmlFor="latitude">Latitude</label>
          <input
            type="number"
            name="latitude"
            id="latitude"
            required
            value={latitude}
            onChange={e => setLatitude(e.target.value)}
          />
        </div>

        <div className="input-block">
          <label htmlFor="longitude">Longitude</label>
          <input
            type="number"
            name="longitude"
            id="longitude"
            required
            value={longitude}
            onChange={e => setLongitude(e.target.value)}
          />
        </div>
      </div>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default DevForm;
