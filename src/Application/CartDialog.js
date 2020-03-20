import React from "react";
import { withStyles } from "@material-ui/core/styles";
import closeicon from "../assets/close.png";
import { Dialog, Grid, Button } from "@material-ui/core";
import MuiDialogContent from "@material-ui/core/DialogContent";

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(2)
  },
  button: {
    border: "none",
    background: "none",
    padding:10,
    cursor: "pointer",boxShadow:'none'
  }
}))(MuiDialogContent);

export default function CartDialog(props) {
  const classes = withStyles();
  const [qty, setQty] = React.useState(0);
  const [size, setSize] = React.useState(null);
  const [color, setcolor] = React.useState('');
  const [sizeArr, setSizeArr] = React.useState([
    "Small",
    "Medium",
    "Large",
    "X-Large"
  ]);
  const [colorArr, setColorArr] = React.useState(["red", "blue", "green","pink"]);

React.useEffect(() => {
  return () => {
  setcolor(props.cartItem.color)
  };
},[]);


  const handleEditClick = () => {
    let item = props.cartItem;
    props.handleClose();
    props.handleItemSize(size, item);
    props.handleItemQty(qty, item);
    props.handleItemColor(color,item);
  };

  const handleQtyChange = e => {
    let qnty = e.target.value;
    e.preventDefault();
    setQty(qnty);
  };
  const handleSizeChange = e => {
    let Size = e.target.value;
    e.preventDefault();
    setSize(Size);
  };
  const handleColor = e => {
    let Color = e.target.value;
    e.preventDefault();
    setcolor(Color)
  };
  return (
    <div>
      <Dialog
        onClose={props.handleClose}
        aria-labelledby="customized-dialog-title"
        open={props.open}
      >
        <div align="right" style={{ margin: 10 }}>
          <img
            onClick={props.handleClose}
            width="20px"
            height="20px"
            src={closeicon}
          ></img>
        </div>
        <DialogContent>
          <Grid xs={12} container>
            <Grid item xs={6} style={{ paddingBottom: 10 }}>
              <div style={{ borderBottom: "7px solid grey" }}></div>
              <div align="center">
                <div style={{ paddingTop: 20, fontSize: 24 }}>
                  {props.cartItem.name}
                </div>
                <div style={{ paddingTop: 10 }}>
                  <b>$</b>
                  <span style={{ fontSize: 24 }}>
                    <b>{props.cartItem.price}.00</b>
                  </span>
                </div>
                <div style={{ paddingTop: 10 }}>{props.cartItem.style}</div>
                <div style={{ paddingTop: 15 }}>
                  {colorArr.map(color=>{
                    return(
                      <button
                      onClick={e => handleColor(e)}
                      className={classes.button}
                      value={color}
                      style={{backgroundColor:color,width:35,height:17}}
                    >
                    </button> 
                    )
                  })}
                  
                </div>
                <div>
                  Color: {color}
                </div>
                <div style={{ paddingTop: 15 }}>
                  <select
                    onChange={e => handleSizeChange(e)}
                    defaultValue={props.cartItem.size}
                    style={{
                      width: "60px",
                      height: "25px",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      border: "1px solid #CACACA",
                      borderRadius: "4px",
                      marginRight: 30,
                      opacity: 1
                    }}
                  >
                    {sizeArr.map(sarr => {
                      return <option value={sarr}>{sarr}</option>;
                    })}
                  </select>
                  <input
                    onChange={e => handleQtyChange(e)}
                    defaultValue={props.cartItem.qty}
                    style={{
                      width: "20px",
                      height: "20px",
                      background: "#FFFFFF 0% 0% no-repeat padding-box",
                      border: "1px solid #CACACA",
                      borderRadius: "4px",
                      opacity: 1,
                      paddingLeft:10
                    }}
                  ></input>
                </div>
                <Button
                  onClick={handleEditClick}
                  variant="contained"
                  style={{
                    boxShadow: "none",
                    marginTop: 15,
                    marginLeft: 20,
                    color: "white",
                    width:150,
                    borderRadius: "unset",
                    backgroundColor: "blue"
                  }}
                >
                  EDIT
                </Button>
                <div style={{ paddingTop: 10 }}>
                  <a href="" style={{ fontSize: 13, color: "black" }}>
                    Check Product Details
                  </a>
                </div>
              </div>
            </Grid>
            <Grid item xs={6} style={{ paddingLeft: 20, paddingRight: 40 }}>
              <img
                src={props.cartItem.photo}
                width="200px"
                height="280px"
              ></img>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </div>
  );
}
