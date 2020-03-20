import React, { Component } from "react";
import CartTable from "./CartTable";
import { Grid, Typography, Button } from "@material-ui/core";
import secure from "../assets/secure.png";
import Photo1 from "../assets/photo1.jpg";
import Photo2 from "../assets/photo2.jpg";
import Photo3 from "../assets/photo3.jpg";
import Photo4 from "../assets/photo4.jpg";

export default class Cart extends Component {
  constructor() {
    super();
    this.state = {
      totalAmount: 0,
      promotionCode: "AJ10",
      applyCode: "AJ10",
      promoteAmount: 5.9,
      itemsList: [
        {
          name: "Print girls tshirt",
          style: "MSRY25K58",
          photo: Photo1,
          color: "pink",
          size: "Large",
          qty: 1,
          price: 17
        },
        {
          name: "Flower Pattern shirt",
          style: "YGHY2875K",
          photo: Photo2,
          color: "blue",
          size: "Medium",
          qty: 1,
          price: 18
        },
        {
          name: "Check pattern tshirt",
          style: "UGRY89K58",
          photo: Photo3,
          color: "red",
          size: "Small",
          qty: 1,
          price: 22
        },
        {
          name: "Cotton tshirt",
          style: "FISRY2I85",
          photo: Photo4,
          color: "green",
          size: "Small",
          qty: 1,
          price: 19
        }
      ]
    };
  }
  componentDidMount() {
    const { itemsList } = this.state;
    try {
      const total = itemsList.reduce((a, b) => ({ price: a.price + b.price }));
      this.setState({ totalAmount: total.price });
    } catch (e) {
      console.log(e.message);
    }
  }
  handleClick = () => {
    const { promotionCode } = this.state;
    this.setState({ applyCode: promotionCode });
  };
  handlePromotion = e => {
    this.setState({ promotionCode: e.target.value });
  };
  handleItemDelete = index => {
    const { itemsList } = this.state;
    try{
    if (index > -1) {
      itemsList.splice(index, 1);
      this.setState({ itemsList });
      if(itemsList.length !==0){
      const total = itemsList.reduce((a, b) => ({ price: a.price + b.price }));
      this.setState({ totalAmount: total.price });
      }
      else{
        this.setState({totalAmount:0})
        this.setState({promoteAmount:0})
      }
    }
  }catch(e){
    console.log(e.message)
  }
  };
  handleItemQty = (qty, item) => {
    const { itemsList } = this.state;
    const len = itemsList.length;
    try {
      for (var i = 0; i <= len; i++) {
        if (itemsList[i].style === item.style) {
          itemsList[i].qty = qty;
          itemsList[i].price=qty* itemsList[i].price
          this.setState({ itemsList });
            const total = itemsList.reduce((a, b) => ({ price: a.price + b.price }));
            this.setState({ totalAmount: total.price });
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  handleItemSize = (size, item) => {
    const { itemsList } = this.state;
    const len = itemsList.length;
    try {
      for (var i = 0; i <= len; i++) {
        if (itemsList[i].style === item.style) {
          itemsList[i].size = size;
          this.setState({ itemsList });
        }
      }
    
    } catch (e) {
      console.log(e.message);
    }
  };
  handleItemColor = (color, item) => {
    const { itemsList } = this.state;
    const len = itemsList.length;
    try {
      for (var i = 0; i <= len; i++) {
        if (itemsList[i].style === item.style) {
          itemsList[i].color = color;
          this.setState({ itemsList });
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const { itemsList, totalAmount, promoteAmount } = this.state;
    return (
      <div style={{ marginLeft: 10 }}>
        <h1>YOUR SHOPPING CART</h1>
        <p>
          If the cart is completely empty then we shall again add back the
          products for you
        </p>
        <CartTable
          handleItemDelete={this.handleItemDelete}
          itemsList={itemsList}
          handleItemQty={this.handleItemQty}
          handleItemSize={this.handleItemSize}
          handleItemColor={this.handleItemColor}
        />
        <div style={{ borderBottom: "6px solid grey", marginBottom: 15 }}></div>
        <Grid container xs={12}>
          <Grid item xs={5}>
            <Typography style={{ marginBottom: "20px" }}>
              <b>Need help or have questions?</b>
            </Typography>
            <Typography style={{ marginBottom: "20px" }}>
              Call Customer Service at
            </Typography>
            <Typography>1-800-555-555</Typography>
            <div style={{ marginBottom: "20px" }}>
              <a href="">Chat with one of our Stylist</a>
            </div>
            <a href="" style={{ marginBottom: "20px" }}>
              See Return or Exchange policy
            </a>
          </Grid>
          <Grid item xs={7}>
            <Grid container xs={12}>
              <Grid item xs={6}>
                ENTER PROMOTION CODE OR GIFT CARD
              </Grid>
              <Grid item xs={6} align="right">
                <input
                  placeholder={this.state.promotionCode}
                  style={{ height: "30px" }}
                  onChange={e => this.handlePromotion(e)}
                ></input>
                <Button
                  variant="outlined"
                  onClick={this.handleClick}
                  style={{ marginLeft: 5, borderRadius: "unset" }}
                >
                  APPLY
                </Button>
              </Grid>
            </Grid>
            <div
              style={{
                borderBottom: "1px solid grey",
                marginTop: 10,
                marginBottom: 10
              }}
            ></div>
            <Grid container xs={12} style={{ marginTop: 15 }}>
              <Grid item xs={6}>
                SUB TOTAL
              </Grid>
              <Grid item xs={6} align="right">
                ${totalAmount.toFixed(2)}
              </Grid>
            </Grid>
            <Grid container xs={12} style={{ marginTop: 20 }}>
              <Grid item xs={6}>
                PROMOTION CODE {""}
                {!this.handleClick
                  ? this.state.promotionCode
                  : this.state.applyCode}{" "}
                {""}
                APPLIED
              </Grid>
              <Grid item xs={6} align="right">
                $ {promoteAmount.toFixed(2)}
              </Grid>
            </Grid>
            <Grid container xs={12} style={{ marginTop: 20 }}>
              <Grid item xs={6}>
                ESTIMATED SHIPPING*
                <div style={{ fontSize: 14 }}>
                  You qualify for free shipping because your order is over $50{" "}
                </div>
              </Grid>
              <Grid item xs={6} align="right">
                FREE
              </Grid>
            </Grid>
            <div
              style={{
                borderBottom: "1px solid grey",
                marginTop: 20,
                marginBottom: 20
              }}
            ></div>
            <Grid container xs={12}>
              <Grid item xs={6}>
                <div style={{ fontSize: 20, fontWeight: 500 }}>
                  ESTIMATED TOTAL
                </div>
                <div style={{ fontSize: 14 }}>
                  Tax will be applied during checkout
                </div>
              </Grid>
              <Grid
                item
                xs={6}
                align="right"
                style={{ fontSize: 20, fontWeight: 500 }}
              >
                ${totalAmount - promoteAmount.toFixed(2)}
              </Grid>
            </Grid>
            <div
              style={{
                borderBottom: "5px solid grey",
                marginTop: 20,
                marginBottom: 20
              }}
            ></div>

            <Grid align="right">
              <a href="" style={{ fontSize: 13, color: "black" }}>
                CONTINUE SHOPPING
              </a>
              <Button
                variant="contained"
                style={{
                  boxShadow: "none",
                  marginLeft: 20,
                  color: "white",
                  borderRadius: "unset",
                  backgroundColor: "blue"
                }}
              >
                CHECKOUT
              </Button>
            </Grid>
            <Grid align="right" style={{ marginBottom: 20 }}>
              <img src={secure} width="20px" height="20px"></img>
              <span style={{ fontSize: 16, color: "grey" }}>
                Secure Checkout. shopping is always safe and secure
              </span>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
