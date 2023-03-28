import React from "react";
import "./card.css";
import FormDialog from "./dialog/dialog";

export default function Card(props) {

    const [open, setOpen] = React.useState(false);

    const handleClickCard = () => {
        setOpen(true);
    };

    return (
        <div>
            <FormDialog 
            open={open}
            setOpen={setOpen} 
            nome={props.name} 
            data={props.date}
            valor={props.value}
            listFinancas
            setListFinancas
            />
        <div className="card-financas" onClick={() => 
        handleClickCard()}>
        <h1 className="card-descricao">{props.nome}</h1>
        <p className="car-data">{props.date}</p>
        <p className="car-valor">{props.value}</p>
        </div>
    </div>
    );
}