import React, {useState, useEffect} from "react"
import './App.css';
import Axios from "axios";
import Card from "./componentes/cards/cards";

function App() {
  const [values, setValues] = useState();
  const [listFinancas, setListFinancas] = useState();
  
  const handleChangeValues = (value) => {
    setValues(prevValue => ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register", {
      nome_conta: values.name,
      data_vencimento: values.date,
      valor_conta: values.value,
    }).then((response) => {
      console.log(response);
    })
  };

  useEffect(()=> {
    Axios.get("http://localhost:3001/getCards").then((response) => {
      setListFinancas(response.data);
    });
  }, []);

  return (
    
    <div className="App-container">
      <div className='register-container'>
        <h1 className='lancamento'>Lançamento de Contas</h1>

        <h2 className='informacao'>Descrição do Lançamento</h2>
        <input type={Text} 
        name='name'
        placeholder='Descrição'
        className='register-input descricao'
        onChange={handleChangeValues}>
        </input><br></br>

        <h2 className='dia'> Data de Vencimento</h2>
        <input type={Date} 
        name='date'
        placeholder='01/01/2023'
        className='register-input data'
        onChange={handleChangeValues}>
        </input> <br></br>

        <h2 className='conta'>Valor da conta</h2>
        <input type={Text} 
        name='value'
        placeholder='R$'
        className='register-input valor'
        onChange={handleChangeValues}>
        </input><br></br>

        <button type='Submite>' className='salvar' 
        onClick={ () => handleClickButton()}
        >
          Salvar
          </button>
      </div>
      { typeof listFinancas !== "undefined" && listFinancas.map((value) => {
        return <Card key={value.id}
          listFinancas={listFinancas} setListFinancas={setListFinancas} 
          id={value.idfinancas}
          nome_conta={value.name}
          data_vencimento={value.date}
          valor_conta={value.value}
          ></Card>;
      })}
     
    </div>
    
  );
}

export default App;
