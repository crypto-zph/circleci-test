<template>
    <div class="admin__login__container">
        <div class="login full-width absolute-center" align="center">
            <div>
                <u-q-admin-login></u-q-admin-login>
            </div>
        </div>               
        <div class="row justify-center admin__pic"> 
            <div class="col-3 first">
                <img src="admin-login/3.png" alt="" class="login__images" >
            </div>
            <div class="col-3 second text-right">
                <img src="admin-login/Layer1.png" alt=""  class="login__images">
            </div>
        </div>
    </div>
</template>

<script>
import UQAdminLogin from "../../components/UQAdminLogin"
export default {
    components: { UQAdminLogin },
    data () {
        return {
            email: '',
            password: '',
           isPwd: true,
        }
    },
}
</script>

<style  scoped>
.q__form {
    background: linear-gradient(40deg, #311E6E, #8156C6);
    padding: 12% 5%;
    border-radius: 15px
}
.admin__login__container{
    background: url("../../../public/admin-login/adminbg.png");
    height: 100vh;
    background-repeat: no-repeat;
    position: relative;
}
.first{
    position: absolute;
    bottom: 0px;
    left: 230px;
}
.second{
    position: absolute;
    bottom: 0px;
    right: 250px;
}
.login{

}
.login__images{
    height: 400px; 
    width: 400px;
}
  @media (max-width: 1686px) {
        .first{
            left: 150px;
        }
        .second{
            right: 200px;
        }
    }
      @media (max-width: 1494px) {
        .first{
            left: 70px;
        }
        .second{
            right: 150px;
        }
    }
    @media (max-width: 1354px) {
        .first{
            left: 0px;
        }
        .second{
            right: 90px;
        }
    }
    @media (max-width: 1258px) {
        .first{
            display: none;
        }
        .second{
            display: none;
        }
    }
</style>