import React, { useEffect, useState } from "react";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

//navigator.geolocation.getCurrentPosition
function App() {
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

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
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
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img
                src="https://avatars1.githubusercontent.com/u/39064364?s=460&v=4"
                alt="Thallys Braz"
              />
              <div className="user-info">
                <strong>Thallys Braz</strong>
                <span>Node.js, React</span>
              </div>
            </header>
            <p>
              Student of Software Engineering at the University of Brasília -
              FGA
            </p>
            <a href="https://github.com/thallysbraz">
              Acessar perfil no Github
            </a>
          </li>

          <li className="dev-item">
            <header>
              <img
                src="https://avatars1.githubusercontent.com/u/39064364?s=460&v=4"
                alt="Thallys Braz"
              />
              <div className="user-info">
                <strong>Thallys Braz</strong>
                <span>Node.js, React</span>
              </div>
            </header>
            <p>
              Student of Software Engineering at the University of Brasília -
              FGA
            </p>
            <a href="https://github.com/thallysbraz">
              Acessar perfil no Github
            </a>
          </li>

          <li className="dev-item">
            <header>
              <img
                src="https://avatars1.githubusercontent.com/u/39064364?s=460&v=4"
                alt="Thallys Braz"
              />
              <div className="user-info">
                <strong>Thallys Braz</strong>
                <span>Node.js, React</span>
              </div>
            </header>
            <p>
              Student of Software Engineering at the University of Brasília -
              FGA
            </p>
            <a href="https://github.com/thallysbraz">
              Acessar perfil no Github
            </a>
          </li>

          <li className="dev-item">
            <header>
              <img
                src="https://avatars1.githubusercontent.com/u/39064364?s=460&v=4"
                alt="Thallys Braz"
              />
              <div className="user-info">
                <strong>Thallys Braz</strong>
                <span>Node.js, React</span>
              </div>
            </header>
            <p>
              Student of Software Engineering at the University of Brasília -
              FGA
            </p>
            <a href="https://github.com/thallysbraz">
              Acessar perfil no Github
            </a>
          </li>
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
