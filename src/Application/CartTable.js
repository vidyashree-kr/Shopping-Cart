import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CartDialog from "./CartDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  },
  button: {
    border: "none",
    background: "none",
    cursor: "pointer"
  }
});

export default function CartTable(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [cartItem, setcartItem] = React.useState("");

  const handleCartItem = item => {
    setcartItem(item);
  };

  const handleClickOpen = (e, item) => {
    e.preventDefault();
    setOpen(true);
    handleCartItem(item);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = (e, index) => {
    e.preventDefault();
    props.handleItemDelete(index);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>{props.itemsList.length} ITEMS</TableCell>
              <TableCell align="right">SIZE</TableCell>
              <TableCell align="right">QTY</TableCell>
              <TableCell align="right">PRICE</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.itemsList.map((row, index) => (
              <TableRow key={row.name} style={{ cursor: "pointer" }}>
                <TableCell
                  component="th"
                  scope="row"
                  style={{ width: "450px" }}
                >
                  <div style={{ display: "inline", float: "left" }}>
                    <div>
                      <img src={row.photo} width="100px" height="100px" />
                    </div>
                  </div>
                  <div
                    style={{
                      display: "inline",
                      float: "left",
                      marginLeft: "10px"
                    }}
                  >
                    <div>
                      <b>{row.name.toUpperCase()}</b>
                    </div>
                    <div>Style #: {row.style}</div>
                    <div>Color: {row.color}</div>
                    <div style={{ marginTop: "20px" }}>
                      <button
                        onClick={e => handleClickOpen(e, row)}
                        className={classes.button}
                      >
                        EDIT
                      </button>
                      |
                      <button
                        onClick={e => handleDelete(e, index)}
                        className={classes.button}
                      >
                        X REMOVE
                      </button>
                      |
                      <button
                        onClick={e => handleDelete(e, index)}
                        className={classes.button}
                      >
                        SAVE FOR LATER
                      </button>
                    </div>
                  </div>
                </TableCell>
                <TableCell align="right">{row.size}</TableCell>
                <TableCell align="right">{row.qty}</TableCell>
                <TableCell align="right">
                  <div style={{ fontSize: 18 }}>
                    <b>$ {(row.price).toFixed(2)}</b>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <CartDialog
        handleClose={handleClose}
        open={open}
        cartItem={cartItem}
        handleClickOpen={handleClickOpen}
        handleItemQty={props.handleItemQty}
        handleItemSize={props.handleItemSize}
        handleItemColor={props.handleItemColor}
      />
    </div>
  );
}
