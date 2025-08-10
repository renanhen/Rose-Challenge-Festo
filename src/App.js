import { useState } from 'react';
import Banner from './componentes/Banner';
import Formulario_v2 from './componentes/Formulario_v2';
import Header from './componentes/Header';

function App() {

  const [colaboradores, setColaboradores] = useState([])

  const aoNovoColaboradorAdicioando = (colaborador) => {
    console.log(colaborador)
    setColaboradores([...colaboradores, colaborador])

  }

  return (
    <div className="App">
      <Banner /> 
      <Header />
      <Formulario_v2 aoColaboradorCadastrado={colaborador => aoNovoColaboradorAdicioando(colaborador)}/>
    </div>
  );
}

export default App;
