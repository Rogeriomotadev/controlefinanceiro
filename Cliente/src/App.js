import React, {useState, useEffect,} from "react";
import './App.css';
import Axios from "axios";
import Card from "./componentes/cards/cards";

function App() {
    const [values, setValues] = useState({name: '', date: '', value: ''});
    const [listFinancas, setListFinancas] = useState([]);

    const handleChangeValues = (event) => {
        let newValue = event.target.value;

        if (event.target.name === 'value') {
            if (!isNaN(newValue)) {
                newValue = parseFloat(newValue).toFixed(2);
            }

        }

        setValues((prevValue) => ({
            ...prevValue,
            [event.target.name]: newValue,

        }));
    };

    const handleClickButton = async () => {
        if (values.name.trim() === '' || values.date.trim() === '' || values.value.trim() === '') {
            alert('Preencha todos os campos antes de salvar.');
            return;
        }
        try {
            const result = await Axios.post("http://localhost:3001/register", {
                nome_conta: values.name,
                data_vencimento: values.date,
                valor_conta: values.value,
            });

            alert(result.data);
            await refreshList();
            setValues({name: '', date: '', value: ''});
        } catch (error) {
            console.log(error);
            alert("Ocorreu um erro ao tentar cadastrar a conta. Verifique os dados e tente novamente.")
        }
    };

    const refreshList = async () => {
        try {
            const result = await Axios.get("http://localhost:3001/getCards");
            setListFinancas(result.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        refreshList();
    }, []);

    return (

        <div className="App-container">
            <div className='register-container'>
                <h1 className='lancamento'>Lançamento de Contas</h1>

                <h2 className='informação'>Descrição do Lançamento</h2>
                <input type='text'
                       name='name'
                       placeholder="Descrição"
                       className='register-input descricao'
                       onChange={handleChangeValues}
                       value={values.name}
                /><br/>

                <h2 className='dia'>Data de Vencimento</h2>
                <input
                    type='date'
                    name='date'
                    placeholder='01/01/2023'
                    className='register-input data'
                    onChange={handleChangeValues}
                    value={values.date}
                />

                <h2 className='conta'>Valor da Conta</h2>
                <input type='text'
                       name='value'
                       placeholder='R$'
                       className='register-input valor'
                       onChange={handleChangeValues}
                       value={values.value}
                /><br/>

                <button type='button' className='salvar'
                        onClick={() => handleClickButton()}
                >
                    Salvar
                </button>
            </div>
            {listFinancas.map((item) => (
                <Card
                    key={item.id}
                    listFinancas={listFinancas}
                    setListFinancas={setListFinancas}
                    id={item.id}
                    nome_conta={item.nome_conta}
                    data_vencimento={item.data_vencimento}
                    valor_conta={item.valor_conta}
                />
            ))}

        </div>

    );
}

export default App;
