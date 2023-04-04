import React from "react";
import "./card.css";
import FormDialog from "./dialog/dialog";

export default function Card(props) {
    const {nome_conta, data_vencimento, valor_conta} = props;
    const [open, setOpen] = React.useState(false);

    const handleClickCard = () => {
        setOpen(true);
    };

    return (
        <div>
            <FormDialog
                open={open}
                setOpen={setOpen}
                id={props.id}
                nome={props.nome_conta}
                data={props.data_vencimento}
                valor={props.valor_conta}
                listFinancas={props.listFinancas}
                setListFinancas={props.setListFinancas}
            />

            <div className="card-financas" onClick={() => handleClickCard()}>
                <h1 className="card-conta">Descrição: {nome_conta}</h1>
                <p className="car-data">Data: {data_vencimento}</p>
                <p className="car-valor"> Valor da Conta: {valor_conta}</p>
            </div>


        </div>
    );
}