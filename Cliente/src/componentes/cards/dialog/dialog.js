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


    const handleEdit = async () => {
        try {
          await Axios.put("http://localhost:3001/edit", {
            id: editValues.id,
            nome: editValues.nome,
            value: editValues.date,
            date: editValues.value,
          });
          handleClose();
        } catch (error) {
          console.log(error);
          alert("Ocorreu um erro ao editar o item.");
        }
      };

    const handleDelete = () => {
        Axios.delete(`http://localhost:3001/delete/${editValues.id}`)
          .then((response) => {
            console.log(response);
            alert('Item deletado com sucesso!');
            
          })
          .catch((error) => {
            console.log(error);
            alert('Ocorreu um erro ao deletar o item.');
          });
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
                    fullwidth="true"
                />
                <TextField
                    margin="dense"
                    id="data"
                    label="Data"
                    defaultValue={props.date}
                    onChange={handleChangeValues}
                    type="Date"
                    fullwidth="true"
                />
                <TextField
                    margin="dense"
                    id="valor"
                    label="Valor da conta"
                    defaultValue={props.value}
                    onChange={handleChangeValues}
                    type="Text"
                    fullwidth="true"
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} className="Close" type="button" label="Cancelar"> Cancelar </Button>

                <Button onClick={handleEdit} className="Edit" type="button"label="Salvar"> Salvar </Button>

                <Button onClick={handleDelete} className="Delete" type="button"label="Excluir"> Excluir </Button>
            </DialogActions>
        </Dialog>
    )
}