import React, { useEffect, useState } from "react";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

//importando arquivo para fazer chamada a API
import api from "./services/api";

//navigator.geolocation.getCurrentPosition
function App() {
  /* ----- Estados dos componentes ----- */

  //estado pra armazenar lista de Devs
  const [devs, setDevs] = useState([]);

  //estado pra armazenar github_username e techs
  const [github_username, setGithubUsername] = useState("");
  const [techs, setTechs] = useState("");

  //estado pra armazenar valor de latitude e longitude
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  /* ----- Codigo/Funções ----- */

  //função para pegar as coordenadas de latitude e longitude
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;
        setLatitude(latitude);
        setLongitude(longitude);
      },
      err => {
        console.log(err);
      },
      {
        timeout: 30000
      }
    );
  }, []);

  //função para buscar Dev na API
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs"); //chamada a API na rota /devs
      setDevs(response.data); //armazenando dados
    }
    loadDevs();
  }, []);

  //função para salvar dev na aplicação.
  async function handleAddDev(e) {
    e.preventDefault();

    const response = await api.post("/devs", {
      github_username,
      techs,
      latitude,
      longitude
    });
    setGithubUsername("");
    setTechs("");
  }

  return (
    <div id="app">
      {/* Aside para fazer o form */}
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
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
      </aside>
      {/* Main para mostrar lista */}
      <main>
        <ul>
          {devs.map(dev => (
            <li key={dev._id} className="dev-item">
              <header>
                <img src={dev.avatar_url} alt={dev.name} />
                <div className="user-info">
                  <strong>{dev.name}</strong>
                  <span>{dev.techs.join(", ")}</span>
                </div>
              </header>
              <p>{dev.bio}</p>
              <a
                target="_blank"
                href={`https://github.com/${dev.github_username}`}
              >
                Acessar perfil no Github
              </a>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

// Componente
// Estado
// Propriedade

// Componente: Bloco isolado de HTML, CSS E JS, o qual não interfere no restante da aplicação
// Propriedade: Informações que um componente PAI pasa para o componente FILHO
// Estado: Informações mantidas pelo componente (Lembrar: imutabilidade)
