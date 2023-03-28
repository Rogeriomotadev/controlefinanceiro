import React, {useState} from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Axios from "axios";

export default function FormDialog(props) {
    const [editValues, setEditValues] = useState({
        id: props.id,
        nome: props.nome,
        value: props.value,
        date: props.value,
    });


    const handleEdit = () => {
        Axios.put("http://localhost:3001/edit", {
            id: editValues.id,
            nome: editValues.nome,
            value: editValues.value,
            date: editValues.value,
        });
        handleClose();
    };

    const handleDelete = () => {
        Axios.delete(`http://localhost:3001/delete/${editValues.id}`)
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

    return (
        <Dialog
            open={props.open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title">

            <DialogTitle id="form-dialog-title">Editar</DialogTitle>
            <DialogContent>
                <TextField
                    autofocus
                    margin="dense"
                    id="name"
                    label="Descrição de gastos"
                    defaultValue={props.name}
                    onChange={handleChangeValues}
                    type="Text"
                    fullwidth={true}
                />
                <TextField
                    autofocus
                    margin="dense"
                    id="date"
                    label="Data de Vencimento"
                    defaultValue={props.date}
                    onChange={handleChangeValues}
                    type="Date"
                    fullwidth={true}
                />
                <TextField
                    autofocus
                    margin="dense"
                    id="value"
                    label="Valor da conta"
                    defaultValue={props.value}
                    onChange={handleChangeValues}
                    type="Text"
                    fullwidth={true}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleEdit} color="primary">
                    Salvar
                </Button>
                <Button onClick={handleDelete} color="primary">
                    Excluir
                </Button>
            </DialogActions>
        </Dialog>
    )
}