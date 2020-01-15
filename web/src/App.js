import React, { useEffect, useState } from "react";

import "./global.css";
import "./App.css";
import "./Sidebar.css";
import "./Main.css";

//importando arquivo para fazer chamada a API
import api from "./services/api";

//importando Componentes
import DevItem from "./components/DevItem/index";
import DevForm from "./components/DevForm/index";

//navigator.geolocation.getCurrentPosition -> pegar localização pelo browser
function App() {
  //estado pra armazenar lista de Devs
  const [devs, setDevs] = useState([]);

  //função para buscar Dev na API
  useEffect(() => {
    async function loadDevs() {
      const response = await api.get("/devs"); //chamada a API na rota /devs
      setDevs(response.data); //armazenando dados
    }
    loadDevs();
  }, []);

  //função para salvar dev na aplicação.
  async function handleAddDev(data) {
    const response = await api.post("/devs", data);

    //adicionando novo dev a lista para mostrar no front
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      {/* Aside para fazer o form */}
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev} />
      </aside>
      {/* Main para mostrar lista */}
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev} />
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
