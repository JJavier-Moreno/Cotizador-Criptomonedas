import styled from "@emotion/styled"
import imagenCripto from './img/imagen-criptos.png'
import Formulario from "./components/Formulario"
import Resultado from "./components/Resultado"
import Spinner from "./components/Spinner"
import { useState, useEffect } from "react"

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width:90%;
  display: block;
  @media(min-width: 992px){
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
 max-width: 400px;
 width: 80%;
 margin: 100px auto 0 auto;
`

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align:center;
  font-weight: 700;
  margin-top:80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after {
    content: '';
    width:100px;
    height: 6px;
    background-color:#66A2FE;
    display: block;
    margin: 10px auto 0 auto;
  }
`

function App() {

  const [monedas, setMonedas] = useState({});
  const [resultado, setResultado] = useState({});
  const [cargando, setCargando]= useState(false);

  useEffect(() => {
    if(Object.keys(monedas).length > 0){
      
      const cotizarCrypto = async ()=>{

        setCargando(true);
        setResultado({});
        const {moneda, criptomoneda} = monedas;
        const url =`https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        //Para hacer una consutla dinamica a un JSON hay que incluir las variables entre corchetes.
        setResultado(resultado.DISPLAY[criptomoneda][moneda]);

        setCargando(false);
      }

      cotizarCrypto();
    }
  }, [monedas])
  

  return (
    <>
    <Contenedor>
      <Imagen
      src={imagenCripto}
      alt="Imagen criptomonedas"
      />

      <div>
      <Heading>Cotiza Criptomonedas al Instante</Heading>

      <Formulario
      setMonedas={setMonedas}
      />

      {cargando && <Spinner/>}

      {resultado.PRICE && 
      <Resultado 
        resultado={resultado}
      />}

      </div>

    </Contenedor>
    </>
  )
}

export default App
