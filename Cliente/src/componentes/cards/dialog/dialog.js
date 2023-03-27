import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { useState } from "react";
import Axios from "axios";

export default Function ;{FormDialog} (props) => {
    const [editValues, setEditValues] = useState({
        id: props.id,
        nome: props.nome,
        value: props.value,
        date:props.value,
    });


    const handleEdit = () => {
        
        Axios.put("http://localhost:3001/edit", {
            id: editValues.id,
            nome: editValues.nome,
            value: editValues.value,
            date:editValues.value,
        });
        handleClose();
    };

    const hadleDelet = () => {
        Axios.delete(`http://localhost:3001/delete/${editValues.id}`)
    };
    

    const handleClickOpen = () => {
        props.setOpen(true);
    };
    const handleClose = ()=> {
       props.setOpen(false);
    };

    const handleChangeValues = values => {
        setEditValues(prevValues => {{
            prevValues, 
            [value.target.id]; 
            value.target.value
        }})
    }

    return (
            <Dialog>
                open={props.open}
                onClose={handleClose}
                aria-Labelledby="form-dialog-title"
            
                <DialogTitle id="form-dialog-title">Editar</DialogTitle>
                <DialogContent>
                    <TextField 
                        autofocus
                        margin = "dense"
                        id = "name"
                        Label = "Descrição de gastos"
                        defaultValue={props.name}
                        onChange={handleChangeValues}
                        type = "Text"
                        fullwidth
                    />
                    <TextField 
                        autofocus
                        margin = "dense"
                        id = "date"
                        Label = "Data de Vencimento"
                        defaultValue={props.date}
                        onChange={handleChangeValues}
                        type = "Date"
                        fullwidth
                    />
                    <TextField 
                        autofocus
                        margin = "dense"
                        id = "value"
                        Label = "Valor da conta"
                        defaultValue={props.value}
                        onChange={handleChangeValues}
                        type = "Text"
                        fullwidth
                    />
                    </DialogContent>
                    <DialogActions>
                        <Button onCliclk = {handleClose} color="primary">
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