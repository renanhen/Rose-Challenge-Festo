import { useState } from 'react';
import Banner from './componentes/Banner';
import Formulario from './componentes/Formulario';
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
      <Formulario aoColaboradorCadastrado={colaborador => aoNovoColaboradorAdicioando(colaborador)}/>
    </div>
  );
}

export default App;
