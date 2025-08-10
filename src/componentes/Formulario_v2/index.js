import React, { useState } from 'react';
import Botao from '../Botao';
import CampoTexto from '../CampoTexto';
import ListaSuspensa from '../ListaSuspensa';
import './Formulario.css';
import Result from '../Result';

const Formulario = () => {
    // Campos de entrada
    const [diametroPistao, setDiametroPistao] = useState('');
    const [clampingUnit, setClampingUnit] = useState('Sim'); // agora boolean
    const [horasOperacao, setHorasOperacao] = useState('');
    const [manutencaoRealizada, setManutencaoRealizada] = useState('');
    const [temperaturaAmbiente, setTemperaturaAmbiente] = useState('');
    const [pressaoOperacaoBar, setPressaoOperacaoBar] = useState('');
    const [velocidadePistao, setVelocidadePistao] = useState('');
    const [pressaoEntrada, setPressaoEntrada] = useState('');
    const [pressaoSaida, setPressaoSaida] = useState('');
    const [sensorUmidade, setSensorUmidade] = useState('');
    const [vibracao, setVibracao] = useState('');
    const [deltaPressaoBar, setDeltaPressaoBar] = useState('');
    const [umidadeInterna, setUmidadeInterna] = useState('');
    const [cursoMm, setCursoMm] = useState('');
    const [tipoAmortecimento, setTipoAmortecimento] = useState('PPS');
    const [protecaoEspecial, setProtecaoEspecial] = useState('Nenhuma');
    const [posicaoInstalacao, setPosicaoInstalacao] = useState('Inclinada');
    const [resultado, setResultado] = useState(null);

    const aoSalvar = async (evento) => {
        evento.preventDefault();

        const dadosParaEnviar = {
            diametro_pistao: diametroPistao,
            clamping_unit: clampingUnit === 'Sim', // converte para boolean
            horas_operacao: horasOperacao,
            manutencao_realizada: manutencaoRealizada,
            curso_mm: cursoMm,
            temperatura_ambiente: temperaturaAmbiente,
            pressao_operacao_bar: pressaoOperacaoBar,
            velocidade_pistao: velocidadePistao,
            pressao_entrada: pressaoEntrada,
            pressao_saida: pressaoSaida,
            sensor_umidade: sensorUmidade,
            vibracao: vibracao,
            delta_pressao_bar: deltaPressaoBar,
            umidade_interna: umidadeInterna,
            tipo_amortecimento: tipoAmortecimento,
            protecao_especial: protecaoEspecial,
            posicao_instalacao: posicaoInstalacao,
        };

        try {
            const resposta = await fetch('http://localhost:5000/api/prever', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dadosParaEnviar)
            });

            if (!resposta.ok) {
                const erro = await resposta.json();
                alert('Erro: ' + erro.erro);
                return;
            }

            const dados = await resposta.json();
            setResultado(dados.resultado);
        } catch (error) {
            alert('Erro ao conectar com o servidor: ' + error.message);
        }
    };

    return (
        <section className="formulario">
            <form onSubmit={aoSalvar}>
                <h2>Preencha os dados para prever o comportamento do cilindro</h2>

                <div className="linha-campos">
                    <ListaSuspensa
                        obrigatorio
                        label="Tipo de Amortecimento"
                        itens={['PPS', 'PPV']}
                        valor={tipoAmortecimento}
                        aoAlterado={setTipoAmortecimento}
                    />
                    <ListaSuspensa
                        obrigatorio
                        label="Manutenção realizada"
                        itens={['0', '1']}
                        valor={manutencaoRealizada}
                        aoAlterado={setManutencaoRealizada}
                    />
                </div>

                <div className="linha-campos">
                    <ListaSuspensa
                        obrigatorio
                        label="Proteção Especial"
                        itens={['Nenhuma', 'R3', 'R8']}
                        valor={protecaoEspecial}
                        aoAlterado={setProtecaoEspecial}
                    />
                    <ListaSuspensa
                        obrigatorio
                        label="Posição da Instalação"
                        itens={['Inclinada', 'Vertical']}
                        valor={posicaoInstalacao}
                        aoAlterado={setPosicaoInstalacao}
                    />
                </div>

                <ListaSuspensa
                    obrigatorio
                    label="Clamping Unit"
                    itens={['Sim', 'Não']}
                    valor={clampingUnit}
                    aoAlterado={setClampingUnit}
                />

                <CampoTexto
                    obrigatorio
                    label="Diâmetro do pistão (mm)"
                    placeholder="Insira o diâmetro do pistão em milímetros"
                    valor={diametroPistao}
                    aoAlterado={setDiametroPistao}
                />
                <CampoTexto
                    obrigatorio
                    label="Curso (mm)"
                    placeholder="Insira o valor do curso em milímetros"
                    valor={cursoMm}
                    aoAlterado={setCursoMm}
                />
                <CampoTexto
                    obrigatorio
                    label="Horas de operação"
                    placeholder="Insira o total de horas de operação"
                    valor={horasOperacao}
                    aoAlterado={setHorasOperacao}
                />
                <CampoTexto
                    obrigatorio
                    label="Temperatura ambiente (°C)"
                    placeholder="Insira a temperatura ambiente em graus Celsius"
                    valor={temperaturaAmbiente}
                    aoAlterado={setTemperaturaAmbiente}
                />
                <CampoTexto
                    obrigatorio
                    label="Pressão de operação (bar)"
                    placeholder="Insira a pressão de operação em bar"
                    valor={pressaoOperacaoBar}
                    aoAlterado={setPressaoOperacaoBar}
                />
                <CampoTexto
                    obrigatorio
                    label="Velocidade do pistão (mm/s)"
                    placeholder="Insira a velocidade do pistão em milímetros por segundo"
                    valor={velocidadePistao}
                    aoAlterado={setVelocidadePistao}
                />
                <CampoTexto
                    obrigatorio
                    label="Pressão de entrada (bar)"
                    placeholder="Insira a pressão de entrada em bar"
                    valor={pressaoEntrada}
                    aoAlterado={setPressaoEntrada}
                />
                <CampoTexto
                    obrigatorio
                    label="Pressão de saída (bar)"
                    placeholder="Insira a pressão de saída em bar"
                    valor={pressaoSaida}
                    aoAlterado={setPressaoSaida}
                />
                <CampoTexto
                    obrigatorio
                    label="Sensor de umidade (%)"
                    placeholder="Insira o valor do sensor de umidade"
                    valor={sensorUmidade}
                    aoAlterado={setSensorUmidade}
                />
                <CampoTexto
                    obrigatorio
                    label="Vibração (mm/s)"
                    placeholder="Insira o valor da vibração em milímetros por segundo"
                    valor={vibracao}
                    aoAlterado={setVibracao}
                />
                <CampoTexto
                    obrigatorio
                    label="Delta pressão (bar)"
                    placeholder="Insira o valor da diferença de pressão"
                    valor={deltaPressaoBar}
                    aoAlterado={setDeltaPressaoBar}
                />
                <CampoTexto
                    obrigatorio
                    label="Umidade interna detectada (%)"
                    placeholder="Insira o valor da umidade interna"
                    valor={umidadeInterna}
                    aoAlterado={setUmidadeInterna}
                />


                <Botao>Prever</Botao>
                <Result resultado={resultado} />
            </form>
        </section>
    );
};

export default Formulario;
