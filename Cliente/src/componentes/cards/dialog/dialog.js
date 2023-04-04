import React, {useState} from "react";
import Axios from "axios";
import {Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        nome: props.nome,
        value: props.valor,
        date: props.data,
    });

    const handleEdit = async () => {
        try {
            await Axios.put("http://localhost:3001/edit", {
                id: editValues.id,
                nome_conta: editValues.nome,
                valor_conta: editValues.value,
                data_vencimento: editValues.date,
            });
            handleClose();
        } catch (error) {
            console.log(error);
            alert("Ocorreu um erro ao editar o item.");
        }
    };

    const handleDelete = () => {
        const confirmation = window.confirm("Deseja realmente excluir o item?");

        if (confirmation) {
            Axios.delete(`http://localhost:3001/delete/${editValues.id}`)
                .then((response) => {
                    console.log(response);
                    alert('Item deletado com sucesso!');

                })
                .catch((error) => {
                    console.log(error);
                    alert('Ocorreu um erro ao deletar o item.');
                });
        }
    };

    const handleClickOpen = () => {
        props.setOpen(true);
    };
    const handleClose = () => {
        props.setOpen(false);
    };

    const handleChangeValues = values => {
        setEditValues(prevValue => ({
            ...prevValue,
            [values.target.id]: values.target.value,
        }));
    }

    // Função para formatar a data no formato YYYY-MM-DD
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');

        return `${year}-${month}-${day}`;
    };

    return (
        <Dialog
            open={props.open}
            onClose={handleClickOpen}
            aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title">Editar</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="nome"
                    label="Descrição de gastos"
                    defaultValue={props.nome}
                    onChange={handleChangeValues}
                    type="Text"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="date"
                    label="Data"
                    defaultValue={formatDate(props.data)}
                    onChange={handleChangeValues}
                    type="date"
                    fullWidth
                />
                <TextField
                    margin="dense"
                    id="value"
                    label="Valor da conta"
                    defaultValue={props.valor}
                    onChange={handleChangeValues}
                    type="Text"
                    fullWidth
                />
            </DialogContent>
            <DialogActions>
                <Button color="secondary" onClick={handleClose}>Cancelar</Button>
                <Button variant="contained" color="success" onClick={handleEdit}>Salvar</Button>
                <Button variant="contained" color="error" onClick={handleDelete}>Excluir</Button>
            </DialogActions>
        </Dialog>
    )
}