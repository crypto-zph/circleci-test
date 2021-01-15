<template>
  <u-q-add-to-cart></u-q-add-to-cart>
</template>
<script>
import { getSavedItems, deleteFromCart, deleteAllFromCart, postBarter, getConversion } from "../../references/url";
import UQAddToCart from "../../../src/components/UQAddToCart"
import Cart from "./Cart.css";

export default {
  
  components: {
    UQAddToCart
  },
};
</script>

<style>
.mobile__align {
  text-align: right;
}
.padding__main {
  padding: 50px 200px
}
.btn__widthSize {
  width: 250px
}
@media (max-width: 1347px) {
  .margin__title {
    margin-left: 50px;
  }
}
@media (max-width: 1107px) {
  .padding__main {
    padding: 50px 100px
  }
}
@media (max-width: 920px) {
  .padding__main {
    padding: 50px 40px
  }
}
@media (max-width: 808px) {
  .padding__main {
    padding: 50px 10px
  }
}
@media (max-width: 696px) {
  .column__title {
    text-align: center
  }
}
@media (max-width: 527px) {
  .btn__widthSize {
    width: 100%;
  }
}
@media (max-width: 1023px) {
  .mobile__hideBtn {
    display: none;
  }
  .mobile__align {
  text-align: center;
  }
  .padding__onTop {
    margin-top: 10px;
  }
  .BRT__titleMobile {
    display: none
  }
}
</style>