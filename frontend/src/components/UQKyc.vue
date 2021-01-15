<template>
    <div class="font-rubik-labels">
        <q-form>
            <div class="kyc-padding">
                <div class="text-center">
                <!-- v-if="user.kyc_status == 'submitted'" -->
                <div class="text-red" v-if="user.kyc_status == 'submitted'">
                    <h5>Your KYC has been submitted. Please wait for your verification</h5>
                </div>
                <!-- v-if="user.kyc_status == 'rejected'" -->
                <div v-if="user.kyc_status == 'rejected'">
                    <h5 class="text-red">Your KYC has been rejected. Please resubmit your information</h5>
                    <q-list>
                        <q-item>
                            <q-item-section>
                                <q-item-label style="color:red;">
                                    *{{user.kyc_remarks}}
                                </q-item-label>
                            </q-item-section>
                        </q-item>
                    </q-list>
                </div>
                <!-- v-if="user.kyc_status == 'approved'" -->
                <div v-if="user.kyc_status == 'approved'">
                    <h5 class="text-green-5">Your KYC has been approved</h5>
                </div>
            </div>
                <div v-if="user.kyc_status == 'not submitted' || user.kyc_status == 'rejected'">

                    <div class="personal-info" v-if="step == 1">
                        <div class="text-center">
                            <img src="KYC_images/personal_info.png" width="180px" />
                        </div>
                        <div class="text-bold text-center" style="font-size: 20px">
                            Personal Information
                        </div>
                        <div class="text-center">
                            <label>
                                Please make sure all information below are correct before proceeding
                            </label>
                        </div>
                        <div class="kyc-inner-padding">
                            <div class="q-mt-md">
                                Items with an asterisk (*) Has to be filled out 
                            </div>
                            <div class="row">
                                <div class="col-12 q-py-sm">
                                    <q-input
                                    borderless 
                                    class="q-px-md inputs-design" 
                                    v-model="form_data.firstname"
                                    ref="firstname"
                                    label="*First Name"
                                    color="secondary" />
                                    <div class="error-field" ref="error_firstname">
                                    </div>
                                </div>
                                <div class="col-12 q-py-sm">
                                    <q-input 
                                    borderless 
                                    class="q-px-md inputs-design" 
                                    label="Middle Name" 
                                    v-model="form_data.middlename"
                                    color="secondary" />
                                    <div class="error-field" ref="error_middlename">
                                    </div>
                                </div>
                                <div class="col-12 q-py-sm">
                                    <q-input 
                                    borderless 
                                    class="q-px-md inputs-design" 
                                    label="*Last Name" 
                                    v-model="form_data.lastname"
                                    color="secondary"  />
                                    <div class="error-field" ref="error_lastname">
                                    </div>
                                </div>
                                <!-- <div class="col-12 q-py-sm">
                                    <q-select borderless class="q-px-md inputs-design" v-model="form_data.gender" :options="['Male', 'Female']" label="*Gender" color="secondary"  />
                                    <div class="error-field" ref="error_gender">

                                    </div>
                                </div> -->
                                <div class="col-12 q-py-sm">
                                    <q-input 
                                    borderless 
                                    class="q-px-md inputs-design" 
                                    label="*Birthdate" 
                                    v-model="form_data.birthdate" 
                                    type="date"
                                    stack-label 
                                    color="secondary" />
                                    <div class="error-field" ref="error_birthdate">
                                    </div>
                                </div>
                                <div class="col-12 q-py-sm">
                                    <q-select 
                                        borderless
                                        class="q-px-md q-py-none inputs-design" 
                                        label="*Select a Country"
                                        v-model="form_data.country"
                                        :options="lists.countries"
                                        :rules="[val => !!val]"
                                        option-value="name"
                                        option-label="name"
                                        @input="updateNationality"
                                        color="secondary" 
                                        behaviour="menu"
                                    >
                                        <template v-slot:prepend>
                                            <img :src="'https://www.countryflags.io/' + form_data.country.code + '/flat/32.png'" v-if="form_data.country != ''" />
                                            
                                            
                                        </template>
                                        <template v-slot:option="scope">
                                            <q-item
                                                v-bind="scope.itemProps"
                                                v-on="scope.itemEvents"
                                            >
                                            <q-item-section side>
                                                <img :src="'https://www.countryflags.io/' + scope.opt.code + '/flat/32.png'" />
                                            </q-item-section>
                                            <q-item-section>
                                                <q-item-label v-html="scope.opt.name" />
                                            </q-item-section>
                                            </q-item>

                                        </template>
                                    </q-select>
                                    <div class="error-field" ref="error_country">

                                    </div>
                                </div>
                                <div class="col-12 q-py-sm">
                                    <q-select 
                                    borderless 
                                    class="q-px-md inputs-design" 
                                    label="*Nationality" 
                                    v-model="form_data.nationality"
                                    :options="lists.nationalities"
                                    type="text"
                                    color="secondary"
                                    behaviour="menu" />
                                    <div class="error-field" ref="error_nationality">
                                    </div>
                                </div>
                                <div class="col-2">
                                    <q-select 
                                    borderless
                                    class="q-px-sm inputs-design q-py-none"
                                    v-model="form_data.contact_code"
                                    :options="lists.contact_codes"
                                    :rules="[val => !!val ]" 
                                    label="" />
                                </div>
                                <div class="col-10">
                                    <q-input 
                                    borderless 
                                    class="q-px-md q-ml-md inputs-design q-py-none"
                                    v-model="form_data.contact"
                                    type="number"
                                    placeholder="*9xx-xxx-xxxx"
                                    :rules="[ val => val && val.length == 10]" />
                                </div>
                                <div class="error-field" ref="error_contact">
                                </div>
                            </div>
                             <div align="right" class="column q-col-gutter-sm q-mt-sm">
                            <div class="col-12">
                                <q-btn color="secondary" rounded style="width: 150px" label="next" @click="confirmPersonalInfo"/>
                            </div>
                            <div class="col-12">
                                <q-btn color="secondary" flat label="reset" icon="fas fa-undo" style="width: 150px" rounded @click="clearPersonalInfo" />
                            </div>
                        </div>
                        </div>
                       
                    </div>
                    <!-- end of step 1 -->


                    <div class="personal-info" v-if="step == 2">
                        <div class="text-center">
                            <img src="KYC_images/address.png" width="180px" />
                        </div>
                        <div class="text-bold text-center" style="font-size: 20px">
                            Address Information
                        </div>
                        <div class="text-center">
                            <label>
                                Please make sure all information below are correct before proceeding
                            </label>
                        </div>
                        <div class="kyc-inner-padding">
                            <div class="q-mt-md">
                                Items with an asterisk (*) Has to be filled out 
                            </div>
                            <div class="row">
                                <div class="col-12 q-py-sm">
                                    <q-input 
                                    borderless 
                                    class="q-px-md inputs-design" 
                                    v-model="form_data.address_line" 
                                    label="*Address line" 
                                    type="text" />
                                    <div class="error-field" ref="error_address_line">

                                    </div>
                                </div>
                                <div class="col-12 q-py-sm">
                                    <q-input 
                                    borderless 
                                    class="q-px-md inputs-design" 
                                    v-model="form_data.street" 
                                    label="*Street" 
                                    type="text" />
                                    <div class="error-field" ref="error_street">

                                    </div>
                                </div>
                                <div class="col-12 q-py-sm">
                                    <q-input 
                                    borderless 
                                    class="q-px-md inputs-design" 
                                    v-model="form_data.city" 
                                    label="*City" 
                                    type="text" />
                                    <div class="error-field" ref="error_city">

                                    </div>
                                </div>
                                <div class="col-12 q-py-sm">
                                    <q-input 
                                    borderless 
                                    class="q-px-md inputs-design" 
                                    v-model="form_data.zip_code" 
                                    label="*Zip code" 
                                    type="text" />
                                    <div class="error-field" ref="error_zip_code">

                                    </div>
                                </div>
                            </div>
                             <div align="right" class="column q-col-gutter-sm q-mt-sm">
                            <div class="col-12">
                                <q-btn color="secondary" rounded style="width: 150px" label="next" @click="confirmAddressInfo"/>
                            </div>
                            <div class="col-12">
                                <q-btn color="secondary" flat label="reset" icon="fas fa-undo" style="width: 150px" rounded @click="clearAddressInfo" />
                            </div>
                        </div>
                        </div>
                    </div>
                    <!-- end of step 2 -->

                    <div class="personal-info" v-if="step == 3">
                        <div class="text-center">
                            <img src="KYC_images/verified.png" width="180px" />
                        </div>
                        <div class="text-bold text-center" style="font-size: 20px">
                            Let's get you verify
                        </div>
                        <div class="text-center">
                            <label>
                                Please make sure all information below are correct before proceeding
                            </label>
                        </div>
                        <div class="kyc-inner-padding">
                            <div class="q-mt-md">
                                Items with an asterisk (*) Has to be filled out 
                            </div>
                            <div class="text-center q-mt-md">
                                Which ID would you like to use?
                            </div>
                            <div class="row">
                                <div class="col-12 q-py-sm">
                                    <q-select class="q-px-md inputs-design" 
                                        borderless 
                                        v-model="form_data.identification_card" 
                                        :options="lists.ids" label="ID type" behaviour="menu"
                                    />
                                    <div v-if="form_data.identification_card == 'Government ID' || form_data.identification_card == 'Others (Must be a government issued ID)'" class="field q-mt-xs">
                                        <q-input borderless class="q-px-md inputs-design" v-model="form_data.specified_id"  :label="form_data.identification_card == 'Government ID' ? 'What kind of Goverment ID do you have?' : form_data.identification_card == 'Others (Must be a government issued ID)' ? 'Please specify your ID' : ''" type="text"  />
                                    </div>
                                    <div class="error-field" ref="error_id_card">

                                    </div>
                                </div>
                                <div class="col-12 q-py-sm">
                                    <q-input
                                    borderless 
                                    class="q-px-md inputs-design" 
                                    v-model="form_data.id_number" 
                                    label="ID #" 
                                    type="text"/>
                                    <div class="error-field" ref="error_id_number">

                                    </div>
                                </div>
                                <div class="col-12 q-py-sm">
                                    <q-input 
                                        borderless 
                                        class="q-px-md inputs-design" 
                                        :disable="form_data.id_has_no_expiry" 
                                        v-model="form_data.id_expiry" 
                                        label="ID expiry" 
                                        stack-label 
                                        type="date" 
                                    />
                                    <q-checkbox v-model="form_data.id_has_no_expiry" label="My ID has no expiration" color="secondary"  />
                                    <div class="error-field" ref="error_id_expiry">

                                    </div>
                                </div>
                                <div class="text-bold q-mt-md col-12">
                                    *Upload front ID image
                                </div>
                                <div class="col-12">
                                    <input type="file" @change="uploadIDImage" />
                                    <div class="error-field" ref="error_id_image">
                                    </div>
                                </div>
                                <div>
                                    <div class="text-center row" v-if="form_data.id_image != ''">
                                        <img  :src="form_data.id_image" style="width: 100%; border-radius: 10px" @click="zoomImageIn(form_data.id_image)"/>
                                    </div>
                                </div>
                                <div class="text-bold q-mt-md col-12">
                                    *Upload selfie image
                                </div>
                                <div class="col-12">
                                    <input type="file" @change="uploadSelfieImage" />
                                    <div class="error-field" ref="error_selfie_image">

                                    </div>
                                </div>
                                <div>
                                    <div class="text-center row" v-if="form_data.selfie_image != ''">
                                        <img  :src="form_data.selfie_image" style="width: 100%; border-radius: 10px" @click="zoomImageIn(form_data.selfie_image)"/>
                                    </div>
                                </div>
                            </div>
                             <div align="right" class="column q-col-gutter-sm q-mt-sm">
                            <div class="col-12">
                                <q-btn color="secondary" rounded style="width: 150px" label="next" @click="confirmIdentityInfo"/>
                            </div>
                            <div class="col-12">
                                <q-btn color="secondary" flat label="reset" icon="fas fa-undo" style="width: 150px" rounded @click="clearIndetityInfo" />
                            </div>
                        </div>
                        </div>
                    </div>
                    <!-- end of step 3 -->
<!--  -->
                    <div class="personal-info" v-if="step == 4">
                        <div class="text-center">
                            <img src="KYC_images/question.png" width="180px" />
                        </div>
                        <div class="text-bold text-center" style="font-size: 20px">
                            Secret Question
                        </div>
                        <div class="text-center">
                            <label>
                                Please make sure all information below are correct before proceeding
                            </label>
                        </div>
                        <div class="kyc-inner-padding">
                            <div class="q-mt-md">
                                Items with an asterisk (*) Has to be filled out 
                            </div>
                            <div class="text-center q-mt-md">
                                Which ID would you like to use?
                            </div>
                            <div class="row">
                                <div class="col-12 q-py-sm">
                                    <q-select borderless class="q-px-md inputs-design" v-model="form_data.security_question" label="Security question" :options="lists.security_questions" behaviour="menu" />
                                    <div v-if="form_data.security_question == '(Personalize your own question)'" class="field q-mt-xs">
                                        <q-input borderless class="q-px-md inputs-design" v-model="form_data.specified_security_question" label="Personalize your security question here"  />
                                    </div>
                                    <div class="error-field" ref="error_security_question">

                                    </div>
                                </div>
                                <div class="col-12 q-py-sm">
                                    <q-input borderless class="q-px-md inputs-design" v-model="form_data.security_answer" :type="form_data.security_answer_is_pwd ? 'password' : 'text'" label="Security answer">
                                    <template v-slot:append>
                                        <q-icon
                                        :name="form_data.security_answer_is_pwd ? 'visibility_off' : 'visibility'"
                                        class="cursor-pointer"
                                        @click="form_data.security_answer_is_pwd = !form_data.security_answer_is_pwd"
                                        />
                                    </template>
                                    </q-input>
                                    <div class="error-field" ref="error_security_answer">

                                    </div>
                                </div>
                            </div>
                              <div align="right" class="column q-col-gutter-sm q-mt-sm">
                            <div class="col-12">
                                <q-btn color="secondary" rounded style="width: 150px" label="next" @click="confirmSecurity" />
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
                <!-- end of step 4 -->
            </div>
        </q-form>


<q-form v-if="user.kyc_status == 'not submitted' || user.kyc_status == 'rejected'">
    <!-- Personal information -->
            <!-- <div v-if="step == 1">
            
                <div class="field q-mt-md">
                    <q-input outlined v-model="form_data.firstname" label="*Firstname" ref="firstname" />
                    <div class="error-field" ref="error_firstname">
                    </div>
                </div>
                <div class="field q-mt-md">
                    <q-input outlined v-model="form_data.middlename" label="Middlename" />
                    <div class="error-field" ref="error_middlename">

                    </div>
                </div>
                <div class="field q-mt-md">
                    <q-input outlined v-model="form_data.lastname" label="*Lastname" />
                    <div class="error-field" ref="error_lastname">

                    </div>
                </div>
                <div class="field q-mt-md">
                    <q-select outlined v-model="form_data.gender" :options="['Male', 'Female']" label="*Gender" />
                    <div class="error-field" ref="error_gender">

                    </div>
                </div>
                <div class="field q-mt-md">
                    <q-input outlined v-model="form_data.birthdate" type="date" label="*Birthdate" stack-label />
                    <div class="error-field" ref="error_birthdate">

                    </div>
                </div>
                <div class="field q-mt-md">
                    <q-select
                        v-model="form_data.country"
                        label="*Select a country"
                        :options="lists.countries"
                        outlined
                        :rules="[val => !!val]"
                        option-value="name"
                        option-label="name"
                        @input="updateNationality"
                    >
                        <template v-slot:prepend>
                            <img :src="'https://www.countryflags.io/' + form_data.country.code + '/flat/32.png'" v-if="form_data.country != ''" />
                            
                            
                        </template>
                        <template v-slot:option="scope">
                            <q-item
                                v-bind="scope.itemProps"
                                v-on="scope.itemEvents"
                            >
                                <q-item-section side>
                                    <img :src="'https://www.countryflags.io/' + scope.opt.code + '/flat/32.png'" />
                                </q-item-section>
                                <q-item-section>
                                    <q-item-label v-html="scope.opt.name" />
                                </q-item-section>
                            </q-item>

                        </template>
                    </q-select>
                    <div class="error-field" ref="error_country">

                    </div>
                </div>
                <div class="field q-mt-md">
                    <q-select outlined v-model="form_data.nationality" :options="lists.nationalities" type="text" label="*Nationality" />
                    <div class="error-field" ref="error_nationality">

                    </div>
                </div>
                <div class="field q-mt-md">
                    <div class="row">
                        <div class="col-3 q-pr-xs">
                            <q-select
                                label=""
                                v-model="form_data.contact_code"
                                :options="lists.contact_codes"
                                outlined
                                :rules="[val => !!val ]"
                            />
                        </div>
                        <div class="col-9">
                            <q-input
                                label=""
                                v-model="form_data.contact"
                                type="number"
                                placeholder="*9xx-xxx-xxxx"
                                outlined
                                :rules="[ val => val && val.length == 10]"
                            ></q-input>
                        </div>
                    </div>
                </div>
                <div class="error-field" ref="error_contact">

                </div>
            --> 
           
            <!-- </div> -->
            <!-- Identity information -->
            <!-- dito sa baba v-if="step == 2" -->
            <!-- <div > -->
                <!-- <div class="field q-mt-md">
                    <q-input outlined v-model="form_data.address_line" label="*House #" type="text" />
                    <div class="error-field" ref="error_address_line">

                    </div>
                </div>
                <div class="field q-mt-md">
                    <q-input outlined v-model="form_data.street" label="*Street" type="text" />
                    <div class="error-field" ref="error_street">

                    </div>
                </div>
                <div class="field q-mt-md">
                    <q-input outlined v-model="form_data.city" label="*City" type="text" />
                    <div class="error-field" ref="error_city">

                    </div>
                </div>
                <div class="field q-mt-md q-field--with-bottom">
                    <q-input outlined v-model="form_data.zip_code" label="*Zip code" type="text" />
                    <div class="error-field" ref="error_zip_code">

                    </div>
                </div> -->
                
            <!-- </div> -->

            <!-- dito sa baba v-if="step == 3" -->
            <div>
               <!--  <div class="field q-mt-md">
                    <q-select outlined v-model="form_data.identification_card" :options="lists.ids" label="ID type" />
                    <div v-if="form_data.identification_card == 'Government ID' || form_data.identification_card == 'Others (Must be a government issued ID)'" class="field q-mt-xs">
                        <q-input outlined v-model="form_data.specified_id"  :label="form_data.identification_card == 'Government ID' ? 'What kind of Goverment ID do you have?' : form_data.identification_card == 'Others (Must be a government issued ID)' ? 'Please specify your ID' : ''" type="text"  />
                    </div>
                    <div class="error-field" ref="error_id_card">

                    </div>
                </div> -->
            <!--     <div class="field q-mt-md">
                    <q-input outlined v-model="form_data.id_number" label="ID #" type="text"  />
                    <div class="error-field" ref="error_id_number">

                    </div>
                </div>
                <div class="field q-mt-md">
                    <q-input outlined :disable="form_data.id_has_no_expiry" v-model="form_data.id_expiry" label="ID expiry" stack-label type="date"  />
                    <q-checkbox v-model="form_data.id_has_no_expiry" label="My ID has no expiration" />
                    <div class="error-field" ref="error_id_expiry">

                    </div>
                </div>
                <div class="field q-mt-md">
                    <div>
                        <label>ID Image</label>
                    </div>
                    <input type="file" @change="uploadIDImage" />
                    <div class="text-center row" v-if="form_data.id_image != ''">
                        <img  :src="form_data.id_image" style="width: 100%;" @click="zoomImageIn(form_data.id_image)"/>
                    </div>
                    <div class="error-field" ref="error_id_image">

                    </div>
                </div>
                <div class="field q-mt-md q-field--with-bottom">
                    <div>
                        <label>Selfie Image</label>
                    </div>
                    <input type="file" @change="uploadSelfieImage" />
                    <div class="text-center row" v-if="form_data.selfie_image != ''">
                        <img  :src="form_data.selfie_image" style="width: 100%;" @click="zoomImageIn(form_data.selfie_image)"/>
                    </div>
                    <div class="error-field" ref="error_selfie_image">

                    </div>
                </div> -->
                
            </div>
            <!-- Security -->
            <!-- eto ilalagay sa baba v-if="step == 4" -->
            <div>
               <!--  <div class="field q-mt-md">
                    <q-select outlined v-model="form_data.security_question" label="Security question" :options="lists.security_questions" />
                    <div v-if="form_data.security_question == '(Personalize your own question)'" class="field q-mt-xs">
                        <q-input outlined v-model="form_data.specified_security_question" label="Personalize your security question here"  />
                    </div>
                    <div class="error-field" ref="error_security_question">

                    </div>
                </div>
                <div class="field q-mt-md q-field--with-bottom">
                    <q-input outlined v-model="form_data.security_answer" :type="form_data.security_answer_is_pwd ? 'password' : 'text'" label="Security answer">
                        <template v-slot:append>
                            <q-icon
                            :name="form_data.security_answer_is_pwd ? 'visibility_off' : 'visibility'"
                            class="cursor-pointer"
                            @click="form_data.security_answer_is_pwd = !form_data.security_answer_is_pwd"
                            />
                        </template>
                    </q-input>
                    <div class="error-field" ref="error_security_answer">

                    </div>
                </div>-->
              
            </div>
        </q-form>
        <u-q-modal :modal_data="kyc_confirmation_modal" ref="kyc_confirmation_modal" style="overflow-x: hidden !important">
            <template v-slot:body>
                <q-list bordered separator>
                    <q-item>
                        <q-item-section>
                            <q-item-label>
                                <q-input color="secondary" label="*Firstname" type="text" v-model="form_data.firstname" outlined />
                                <div class="error-field" ref="error_modal_firstname">

                                </div>
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>
                            <q-item-label><q-input color="secondary" label="*Middlename" type="text" v-model="form_data.middlename" outlined /></q-item-label>
                            <div class="error-field" ref="error_modal_middlename">

                            </div>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>    
                            <q-item-label><q-input color="secondary" label="*Lastname" type="text" v-model="form_data.lastname" outlined /></q-item-label>
                            <div class="error-field" ref="error_modal_lastname">

                            </div>
                        </q-item-section>
                    </q-item>
                    <!-- <q-item>
                        <q-item-section>    
                            <q-item-label><q-select color="secondary" outlined v-model="form_data.gender" :options="['Male', 'Female']" label="*Gender" /></q-item-label>
                            <div class="error-field" ref="error_modal_gender">

                            </div>
                        </q-item-section>
                    </q-item> -->
                    <q-item>
                        <q-item-section>    
                            <q-item-label>
                                <q-input color="secondary" outlined v-model="form_data.birthdate" type="date" label="*Birthdate" stack-label />
                                <div class="error-field" ref="error_modal_birthdate">

                                </div>
                            </q-item-label>
                        </q-item-section>
                    </q-item>
                    <q-item>
                        <q-item-section>    
                            <q-item-label>
                                <q-select
                                v-model="form_data.country"
                                label="*Select a country"
                                :options="lists.countries"
                                outlined
                                :rules="[val => !!val]"
                                @input="updateNationality"
                                option-value="name"
                                option-label="name" color="secondary"
                                >
                                <template v-slot:prepend>
                                    <img :src="'https://www.countryflags.io/' + form_data.country.code + '/flat/32.png'" v-if="form_data.country != '' || form_data.country != {}" />
                                    
                                    
                                </template>
                                <template v-slot:option="scope">
                                    <q-item
                                    v-bind="scope.itemProps"
                                    v-on="scope.itemEvents"
                                    >
                                    <q-item-section side>
                                        <img :src="'https://www.countryflags.io/' + scope.opt.code + '/flat/32.png'" />
                                    </q-item-section>
                                    <q-item-section>
                                        <q-item-label v-html="scope.opt.name" />
                                    </q-item-section>
                                </q-item>

                            </template>
                        </q-select>
                        <div class="error-field" ref="error_modal_country">
                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>    
                    <q-item-label>
                        <q-select color="secondary" outlined v-model="form_data.nationality" :options="lists.nationalities" type="text" label="*Nationality" />
                        <div class="error-field" ref="error_modal_nationality">

                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>    
                    <q-item-label>
                        <div class="row">
                            <div class="col-3 q-pr-xs">
                                <q-select
                                label=""
                                v-model="form_data.contact_code"
                                :options="lists.contact_codes"
                                outlined
                                :rules="[val => !!val ]" color="secondary"
                                />
                            </div>
                            <div class="col-9">
                                <q-input
                                label=""
                                v-model="form_data.contact"
                                type="number"
                                placeholder="*9xx-xxx-xxxx"
                                outlined
                                :rules="[ val => val && val.length == 10]" color="secondary"
                                ></q-input>
                            </div>
                        </div>
                        <div class="error-field" ref="error_modal_contact">
                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>    
                    <q-item-label>
                        <q-input color="secondary" outlined v-model="form_data.address_line" label="*House #" type="text" />
                        <div class="error-field" ref="error_modal_address_line">
                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>    
                    <q-item-label>
                        <q-input color="secondary" outlined v-model="form_data.street" label="*Street" type="text" />
                        <div class="error-field" ref="error_modal_street">

                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>    
                    <q-item-label>
                        <q-input color="secondary" outlined v-model="form_data.city" label="*City" type="text" />
                        <div class="error-field" ref="error_modal_city">

                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>    
                    <q-item-label>
                        <q-input color="secondary" outlined v-model="form_data.zip_code" label="*Zip code" type="text" />
                        <div class="error-field" ref="error_modal_zip_code">

                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>    
                    <q-item-label>
                        <q-select color="secondary" outlined v-model="form_data.identification_card" :options="lists.ids" label="ID type" />
                        <div v-if="form_data.identification_card == 'Government ID' || form_data.identification_card == 'Others (Must be a government issued ID)'" class="field q-mt-xs">
                            <q-input color="secondary" outlined v-model="form_data.specified_id"  :label="form_data.identification_card == 'Government ID' ? 'What kind of Goverment ID do you have?' : form_data.identification_card == 'Others (Must be a government issued ID)' ? 'Please specify your ID' : ''" type="text"  />
                        </div>
                        <div class="error-field" ref="error_modal_id_card">

                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>    
                    <q-item-label>
                        <q-input color="secondary" outlined v-model="form_data.id_number" label="ID #" type="text"  />
                        <div class="error-field" ref="error_modal_id_number">

                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>    
                    <q-item-label>
                        <q-input color="secondary" outlined :disable="form_data.id_has_no_expiry" v-model="form_data.id_expiry" label="ID expiry" stack-label type="date"  />
                        <q-checkbox color="secondary" v-model="form_data.id_has_no_expiry" label="My ID has no expiration" />
                        <div class="error-field" ref="error_modal_id_expiry">

                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>    
                    <q-item-label>
                        <div>
                            <label>ID Image</label>
                        </div>
                        <input type="file" @change="uploadIDImage" />
                        <div class="text-center row q-mt-sm" v-if="form_data.id_image != ''">
                            <img :src="form_data.id_image" class="images__prev" @click="zoomImageIn(form_data.id_image)"/>
                        </div>
                        <div class="error-field" ref="error_modal_id_image">

                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>    
                    <q-item-label>
                        <div>
                            <label>Selfie Image</label>
                        </div>
                        <input type="file" @change="uploadSelfieImage" />
                        <div class="text-center row q-mt-sm" v-if="form_data.selfie_image != ''">
                            <img  :src="form_data.selfie_image" class="images__prev" @click="zoomImageIn(form_data.selfie_image)"/>
                        </div>
                        <div class="error-field" ref="error_modal_selfie_image">

                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>    
                    <q-item-label>
                        <q-select color="secondary" outlined v-model="form_data.security_question" label="Security question" :options="lists.security_questions" />
                        <div v-if="form_data.security_question == '(Personalize your own question)'" class="field q-mt-xs">
                            <q-input color="secondary" outlined v-model="form_data.specified_security_question" label="Personalize your security question here"  />
                        </div>
                        <div class="error-field" ref="error_modal_security_question">

                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
            <q-item>
                <q-item-section>    
                    <q-item-label>
                        <q-input color="secondary" outlined v-model="form_data.security_answer" :type="form_data.security_answer_is_pwd ? 'password' : 'text'" label="Security answer">
                            <template v-slot:append>
                                <q-icon
                                :name="form_data.security_answer_is_pwd ? 'visibility_off' : 'visibility'"
                                class="cursor-pointer"
                                @click="form_data.security_answer_is_pwd = !form_data.security_answer_is_pwd"
                                />
                            </template>
                        </q-input>
                        <div class="error-field" ref="error_modal_security_answer">

                        </div>
                    </q-item-label>
                </q-item-section>
            </q-item>
        </q-list>
    </template>
    <template v-slot:footer>
        <div align="right" class="column">
            <div class="col-12">
                <q-btn label="confirm" @click="confirmAll" style="width: 90px;" rounded color="secondary" class="q-mr-sm" />
            </div>
            <div class="col-12">
                <q-btn label="cancel" flat style="width: 90px;" rounded @click="closeModal('kyc_confirmation_modal')" color="secondary" class="q-mr-sm" />
                </div>
        </div>
    </template>
</u-q-modal>
</div>
</template>

<script>
import moment               from "moment";
import imageCompression     from 'browser-image-compression';
import UQModal              from "../components/UQModal";
import nationalities        from "../references/nationalities";
import countries            from "../references/countries";
import contact_codes        from "../references/contact_codes";
import security_questions   from "../references/security_questions";
import ids                  from "../references/ids";
import { putUpdateKyc, postfetchUserKyc }     from "../references/url";
export default {
    name: 'UQKyc',
    components: { UQModal },
    data: () => ({
        moment          : moment,
        imageCompression: imageCompression,
        step            : 1,
        maxImageMBSize  : 10,
        user        : {},
        lists       : {
            countries,
            nationalities,
            contact_codes,
            security_questions,
            ids,
        },
        kyc_confirmation_modal: {
            title: 'Please confirm your KYC information',
            data: {}
        },
        form_data   : {
            firstname       : '',
            middlename      : '',
            lastname        : '',
            birthdate       : '',
            country         : {},
            nationality     : '',
            contact_code    : '',
            contact         : '',

            address_line    : '',
            street          : '',
            city            : '',
            zip_code        : '',

            has_other_id    : false,
            identification_card : '',
            specified_id    : '',
            id_number       : '',
            id_has_expiry   : true,
            id_has_no_expiry: false,
            id_expiry           : null,
            id_image            : null,
            id_image_file       : null,
            id_image_size       : 0,
            selfie_image        : null,
            selfie_image_file   : null,
            selfie_image_size   : 0,

            has_other_security_question : false,
            specified_security_question : '',
            security_question           : '',
            security_answer             : '',

            security_answer_is_pwd      : true,
            errors                      : []
        }
    }),
    async mounted()
    {
        let auth = await this.isUserLoggedIn();
        
        if(auth.status == 'not authenticated')
        {
            this.$router.push({ name: 'documentation_login'});
        }
        else
        {
            this.user = {
                ...this.user,
                ...auth.user
            };
        }

        let user_loc_info           = await this.$_locateUser();
        // let user_country            = await this.$_getUserCountryInfo(user_loc_info.data.country_name);
        let date                    = new Date();
        let today                   = moment(date.now).format('YYYY-MM-DD');

        // this.user                   = await this.fetchUserKyc();
        console.log(user_loc_info);


        this.form_data.id_expiry    = today;
        console.log(this.form_data.country)
        this.form_data.country.code         = 'AD';
        this.form_data.country.name         = 'Andorra';
        // this.form_data.country.currencyCode = user_loc_info.data.currency;
        // this.form_data.nationality  = user_country.data[0].demonym;
        this.lists.nationalities    = this.lists.nationalities.sort();
        this.lists.contact_codes    = this.lists.contact_codes.sort();
        // this.form_data.contact_code = user_loc_info.data.country_calling_code;

        // this.form_data.city         = user_loc_info.data.city.replace('City', '').replace('city', '').trim();
        // this.form_data.zip_code     = user_loc_info.data.postal;
    },

    methods: {
        async isUserLoggedIn()
        {
            let auth_result = await this.$_isUserAuthenticated();

            return auth_result.data;
        },
        async fetchUserKyc()
        {
            const kyc_res_obj = await this.$_post(postfetchUserKyc);
            console.log(kyc_res_obj.data.kyc)
            return kyc_res_obj.data.kyc;
        },
        async updateNationality()
        {
            // let user_country            = await this.$_getUserCountryInfo(this.form_data.country.name);
            // this.form_data.nationality  = user_country.data[0].demonym;
            // this.form_data.contact_code = `+${user_country.data[0].callingCodes[0]}`;
        },

        byteToMb(byte) {
            const megabyte = 0.000001;
            return byte * megabyte;
        },

        async uploadIDImage(file)
        {
            console.log(this.byteToMb(file.target.files[0].size));
            this.form_data.id_image_file    = file.target.files[0];
            this.form_data.id_image_size    = this.byteToMb(file.target.files[0].size);
            this.form_data.id_image         = URL.createObjectURL(event.target.files[0]);

            if(this.form_data.id_image_size > this.maxImageMBSize)
            {
                this.$refs['error_id_image'].innerHTML  = '*image size must no be exceed to 10mb';
                this.form_data.errors.push('*image size must no be exceed to 10mb');
            }
            else
            {
                let compression_options_obj = {
                    maxSizeMB       : 10,
                    maxWidthOrHeight: 1920,
                    useWebWorker    : true,
                    onProgress      : this.imageCompressionProgress,
                };
            

                let compressedImage_file    = await this.imageCompression(
                    this.form_data.id_image_file,
                    compression_options_obj
                );

                this.form_data.id_image_file = compressedImage_file;
                console.log(this.form_data.id_image_file);
            }
        },

        async uploadSelfieImage(file)
        {
            console.log(this.byteToMb(file.target.files[0].size));
            this.form_data.selfie_image_file    = file.target.files[0];
            this.form_data.selfie_image_size    = this.byteToMb(file.target.files[0].size);
            this.form_data.selfie_image         = URL.createObjectURL(event.target.files[0]);

            if(this.form_data.selfie_image_size > this.maxImageMBSize)
            {
                this.$refs['error_id_image'].innerHTML  = '*image size must no be exceed to 10mb';
                this.form_data.errors.push('*image size must no be exceed to 10mb');
            }
            else
            {
                let compression_options_obj = {
                    maxSizeMB       : 10,
                    maxWidthOrHeight: 1920,
                    useWebWorker    : true,
                    onProgress      : this.imageCompressionProgress,
                };
            

                let compressedImage_file    = await this.imageCompression(
                    this.form_data.selfie_image_file,
                    compression_options_obj
                );

                this.form_data.selfie_image_file = compressedImage_file;
                console.log(this.form_data.selfie_image_file);
            }
        },

        async imageCompressionProgress(progress)
        {
            console.log(progress)
        },

        async confirmPersonalInfo()
        {
            this.form_data.errors = [];
            if (this.form_data.firstname == '')
            {
                this.$refs['error_firstname'].innerHTML = '*firstname must not be empty';
                this.form_data.errors.push('*firstname must not be empty');
            }
            else
            {
                this.$refs['error_firstname'].innerHTML = '';
            }

            if (this.form_data.lastname == '')
            {
                this.$refs['error_lastname'].innerHTML  = '*lastname must not be empty';
                this.form_data.errors.push('*lastname must not be empty');
            }
            else
            {
                this.$refs['error_lastname'].innerHTML = '';
            }

            // if (this.form_data.gender == '' || this.form_data.gender == undefined)
            // {
            //     this.$refs['error_gender'].innerHTML          = '*gender must not be empty';
            //     this.form_data.errors.push('*gender must not be empty');
            // }
            // else
            // {
            //     this.$refs['error_gender'].innerHTML = '';
            // }

            let today                       = new Date();
            today.setHours(0, 0, 0, 0);
            let today_mmt                   = moment(today);
            let birthdate                   = this.form_data.birthdate;
            birthdate                       = new Date(birthdate);
            birthdate.setHours(0, 0, 0, 0);
            let birthdate_mmt               = moment(birthdate);
            let age                         = today_mmt.diff(birthdate_mmt, 'years');
            console.log(age)
            if (this.form_data.birthdate == '')
            {
                this.$refs['error_birthdate'].innerHTML       = '*birthdate must not be empty';
                this.form_data.errors.push('*birthdate must not be empty');
            }
            else
            if (age <= 12)
            {
                this.$refs['error_birthdate'].innerHTML       = '*14 below are not allowed';
                this.form_data.errors.push('*18 below are not allowed');
            }
            else
            {
                this.$refs['error_birthdate'].innerHTML = '';
            }

            if (this.form_data.country == '')
            {
                this.$refs['error_country'].innerHTML         = '*country must not be empty';
                this.form_data.errors.push('*country must not be empty');
            }
            else
            {
                this.$refs['error_country'].innerHTML = '';
            }

            if (this.form_data.nationality == '')
            {
                this.$refs['error_nationality'].innerHTML     = '*nationality must not be empty';
                this.form_data.errors.push('*nationality must not be empty');
            }
            else
            {
                this.$refs['error_nationality'].innerHTML = '';
            }

            if (this.form_data.contact == '')
            {
                this.$refs['error_contact'].innerHTML         = '*contact must not be empty';
                this.form_data.errors.push('*contact must not be empty');
            }
            else
            if(this.form_data.contact.length != 10)
            {
                this.$refs['error_contact'].innerHTML         = '*invalid contact';
                this.form_data.errors.push('*invalid contact');
            }
            else
            {
                this.$refs['error_contact'].innerHTML = '';
            }
            console.log(this.form_data.errors)
            this.form_data.errors.length > 0 ? '' : this.step = 2 | window.scrollTo(0,0);

        },

        async closeModal(modalRef)
        {
            this.$refs[modalRef].hide();
        },

        async confirmAddressInfo()
        {
            this.form_data.errors = [];
            if (this.form_data.address_line == '')
            {
                this.$refs['error_address_line'].innerHTML  = '*address line must not be empty';
                this.form_data.errors.push('*address line must not be empty');
            }
            else
            {
                 this.$refs['error_address_line'].innerHTML  = '';
            }

            if (this.form_data.street == '')
            {
                this.$refs['error_street'].innerHTML        = '*street must not be empty';
                this.form_data.errors.push('*street must not be empty');
            }
            else
            {
                this.$refs['error_street'].innerHTML        = '';

            }

            if (this.form_data.city == '')
            {
                this.$refs['error_city'].innerHTML          = '*city must not be empty';
                this.form_data.errors.push('*city must not be empty');
            }
            else
            {
                this.$refs['error_city'].innerHTML          = '';
            }

            if (this.form_data.zip_code == '')
            {
                this.$refs['error_zip_code'].innerHTML      = '*zip code must not be empty';
                this.form_data.errors.push('*zip code must not be empty');
            }
            else
            {
                this.$refs['error_zip_code'].innerHTML      = '';
            }

            console.log(this.form_data.errors)

            this.form_data.errors.length > 0 ? '' : this.step = 3 | window.scrollTo(0,0);
        },

        async confirmIdentityInfo()
        {
            this.form_data.errors = [];
            // id type
            if (this.form_data.identification_card == '')
            {
                this.$refs['error_id_card'].innerHTML   = '*id type must not be empty';
                this.form_data.errors.push('*id type must not be empty');
            }
            else
            if((this.form_data.identification_card == 'Government ID' || this.form_data.identification_card == 'Others (Must be a government issued ID)') && this.form_data.specified_id == '')
            {
                this.$refs['error_id_card'].innerHTML   = '*id type must not be empty';
                this.form_data.errors.push('*id type must not be empty')
            }
            else
            {
                
                this.$refs['error_id_card'].innerHTML   = '';
            }
            // id number
            if (this.form_data.id_number == '')
            {
                this.$refs['error_id_number'].innerHTML  = '*id number must not be empty';
                this.form_data.errors.push('*id number must not be empty');
            }
            else
            {
                this.$refs['error_id_number'].innerHTML  = '';
            }

            
            let today                       = new Date();
            today.setHours(0, 0, 0, 0);
            let today_mmt                   = moment(today);
            let specified_id_expiry         = this.form_data.id_expiry;
            specified_id_expiry             = new Date(specified_id_expiry);
            specified_id_expiry.setHours(23, 59, 59, 999);
            let specified_id_expiry_mmt     = moment(specified_id_expiry)
            let id_expiry_remaining_days    = specified_id_expiry_mmt.diff(today_mmt, 'days');

            console.log('specified id expiry', specified_id_expiry);
            console.log('id expiry remaining days', id_expiry_remaining_days);
            // id expiration
            if (this.form_data.id_expiry == '')
            {
                this.$refs['error_id_expiry'].innerHTML  = '*id expiry must not be empty';
                this.form_data.errors.push('*id expiry must not be empty');
            }
            else
            if (this.form_data.id_has_no_expiry == false && id_expiry_remaining_days <= 0)
            {
                this.$refs['error_id_expiry'].innerHTML  = '*your id is already expired';
                this.form_data.errors.push('*your id is already expired');
            }
            else
            {
                this.$refs['error_id_expiry'].innerHTML  = '';
            }
            // id image
            if (this.form_data.id_image == '' || this.form_data.id_image == null)
            {
                this.$refs['error_id_image'].innerHTML  = '*id image must not be empty';
                this.form_data.errors.push('*id image must not be empty');
            }
            else
            {
                this.$refs['error_id_image'].innerHTML  = '';
            }
            // selfie image
            if (this.form_data.selfie_image == '' || this.form_data.selfie_image == null)
            {
                this.$refs['error_selfie_image'].innerHTML  = '*selfie image must not be empty';
                this.form_data.errors.push('*selfie image must not be empty');
            }else
            if(this.form_data.selfie_image_size > this.maxImageMBSize)
            {
                this.$refs['error_id_image'].innerHTML  = '*image size must no be exceed to 10mb';
                this.form_data.errors.push('*image size must no be exceed to 10mb');
            }
            else
            {
                this.$refs['error_selfie_image'].innerHTML  = '';
            }

            if(this.form_data.errors.length == 0)
            {
                this.step = 4 | window.scrollTo(0,0);
            }
        },

        async confirmSecurity()
        {
            this.form_data.errors = [];
            if (this.form_data.security_question == '')
            {
                this.$refs['error_security_question'].innerHTML  = '*security question must not be empty';
                this.form_data.errors.push('*security question must not be empty');
            }else
            if (this.form_data.security_question == '(Personalize your own question)' && this.form_data.specified_security_question == '')
            {
                this.$refs['error_security_question'].innerHTML  = '*security question must not be empty';
                this.form_data.errors.push('*security question must not be empty');
            }
            else
            {
                this.$refs['error_security_question'].innerHTML  = '';
            }

            if (this.form_data.security_answer == '')
            {
                this.$refs['error_security_answer'].innerHTML  = '*security question must not be empty';
                this.form_data.errors.push('*security question must not be empty');
            }
            else
            {
                this.$refs['error_security_answer'].innerHTML  = '';
            }

            console.log(this.form_data.errors)
            
            // this.form_data.errors.length > 0 ? '' : this.$refs['kyc_confirmation_modal'].show();
            if(this.form_data.errors.length == 0)
            {
                this.kyc_confirmation_modal.data = this.form_data;
                console.log(this.form_data);
                console.log(this.kyc_confirmation_modal.data);
                this.$refs['kyc_confirmation_modal'].show();
            }
            // this.form_data.errors.length > 0 ? '' : this.submitKyc();
            
        },

        async confirmAll()
        {
            let errors = [];
            if (this.form_data.firstname == '')
            {
                this.$refs['error_modal_firstname'].innerHTML = '*firstname must not be empty';
                errors.push('*firstname must not be empty');
            }
            else
            {
                this.$refs['error_modal_firstname'].innerHTML = '';
            }

            if (this.form_data.lastname == '')
            {
                this.$refs['error_modal_lastname'].innerHTML  = '*lastname must not be empty';
                errors.push('*lastname must not be empty');
            }
            else
            {
                this.$refs['error_modal_lastname'].innerHTML = '';
            }

            // if (this.form_data.gender == '' || this.form_data.gender == undefined)
            // {
            //     this.$refs['error_modal_gender'].innerHTML          = '*gender must not be empty';
            //     errors.push('*gender must not be empty');
            // }
            // else
            // {
            //     this.$refs['error_modal_gender'].innerHTML = '';
            // }

            let today                       = new Date();
            today.setHours(0, 0, 0, 0);
            let today_mmt                   = moment(today);
            
            let birthdate                   = this.form_data.birthdate;
            birthdate                       = new Date(birthdate);
            birthdate.setHours(0, 0, 0, 0);
            let birthdate_mmt               = moment(birthdate);
            let age                         = today_mmt.diff(birthdate_mmt, 'years');

            if (this.form_data.birthdate == '')
            {
                this.$refs['error_modal_birthdate'].innerHTML       = '*birthdate must not be empty';
                errors.push('*birthdate must not be empty');
            }
            else
            if (age <= 18)
            {
                this.$refs['error_modal_birthdate'].innerHTML       = '*18 below are not allowed';
                errors.push('*18 below are not allowed');
            }
            else
            {
                this.$refs['error_modal_birthdate'].innerHTML = '';
            }

            if (this.form_data.country == '')
            {
                this.$refs['error_modal_country'].innerHTML         = '*country must not be empty';
                errors.push('*country must not be empty');
            }
            else
            {
                this.$refs['error_modal_country'].innerHTML = '';
            }

            if (this.form_data.nationality == '')
            {
                this.$refs['error_modal_nationality'].innerHTML     = '*nationality must not be empty';
                errors.push('*nationality must not be empty');
            }
            else
            {
                this.$refs['error_modal_nationality'].innerHTML = '';
            }

            if (this.form_data.contact == '')
            {
                this.$refs['error_modal_contact'].innerHTML         = '*contact must not be empty';
                errors.push('*contact must not be empty');
            }
            else
            if(this.form_data.contact.length != 10)
            {
                this.$refs['error_modal_contact'].innerHTML         = '*invalid contact';
                errors.push('*invalid contact');
            }
            else
            {
                this.$refs['error_modal_contact'].innerHTML = '';
            }
            
            if (this.form_data.address_line == '')
            {
                this.$refs['error_modal_address_line'].innerHTML  = '*address line must not be empty';
                errors.push('*address line must not be empty');
            }
            else
            {
                 this.$refs['error_modal_address_line'].innerHTML  = '';
            }

            if (this.form_data.street == '')
            {
                this.$refs['error_modal_street'].innerHTML        = '*street must not be empty';
                errors.push('*street must not be empty');
            }
            else
            {
                this.$refs['error_modal_street'].innerHTML        = '';

            }

            if (this.form_data.city == '')
            {
                this.$refs['error_modal_city'].innerHTML          = '*city must not be empty';
                errors.push('*city must not be empty');
            }
            else
            {
                this.$refs['error_modal_city'].innerHTML          = '';
            }

            if (this.form_data.zip_code == '')
            {
                this.$refs['error_modal_zip_code'].innerHTML      = '*zip code must not be empty';
                errors.push('*zip code must not be empty');
            }
            else
            {
                this.$refs['error_modal_zip_code'].innerHTML      = '';
            }
            // id type
            console.log(this.form_data.identification_card)
            if (this.form_data.identification_card == '')
            {
                this.$refs['error_modal_id_card'].innerHTML   = '*id type must not be empty';
                errors.push('*id type must not be empty');
            }
            else
            if((this.form_data.identification_card == 'Government ID' || this.form_data.identification_card == 'Others (Must be a government issued ID)') && this.form_data.specified_id == '')
            {
                this.$refs['error_modal_id_card'].innerHTML   = '*id type must not be empty';
                errors.push('*id type must not be empty')
            }
            else
            {
                
                this.$refs['error_modal_id_card'].innerHTML   = '';
            }
            // id number
            if (this.form_data.id_number == '')
            {
                this.$refs['error_modal_id_number'].innerHTML  = '*id number must not be empty';
                errors.push('*id number must not be empty');
            }
            else
            {
                this.$refs['error_modal_id_number'].innerHTML  = '';
            }

            let specified_id_expiry         = this.form_data.id_expiry;
            specified_id_expiry             = new Date(specified_id_expiry);
            specified_id_expiry.setHours(23, 59, 59, 999);
            let specified_id_expiry_mmt     = moment(specified_id_expiry)
            let id_expiry_remaining_days    = specified_id_expiry_mmt.diff(today_mmt, 'days');
            // id expiration
            if (this.form_data.id_expiry == '')
            {
                this.$refs['error_modal_id_expiry'].innerHTML  = '*id expiry must not be empty';
                errors.push('*id expiry must not be empty');
            }
            else
            if (this.form_data.id_has_no_expiry == false && id_expiry_remaining_days <= 0)
            {
                this.$refs['error_modal_id_expiry'].innerHTML  = '*your id is already expired';
                errors.push('*your id is already expired');
            }
            else
            {
                this.$refs['error_modal_id_expiry'].innerHTML  = '';
            }
            // id image
            if (this.form_data.id_image == '' || this.form_data.id_image == null)
            {
                this.$refs['error_modal_id_image'].innerHTML  = '*id image must not be empty';
                errors.push('*id image must not be empty');
            }
            else
            {
                this.$refs['error_modal_id_image'].innerHTML  = '';
            }
            // selfie image
            if (this.form_data.selfie_image == '' || this.form_data.selfie_image == null)
            {
                this.$refs['error_modal_selfie_image'].innerHTML  = '*selfie image must not be empty';
                errors.push('*selfie image must not be empty');
            }else
            if(this.form_data.selfie_image_size > this.maxImageMBSize)
            {
                this.$refs['error_modal_id_image'].innerHTML  = '*image size must no be exceed to 10mb';
                errors.push('*image size must no be exceed to 10mb');
            }
            else
            {
                this.$refs['error_modal_selfie_image'].innerHTML  = '';
            }


            if (this.form_data.security_question == '')
            {
                this.$refs['error_modal_security_question'].innerHTML  = '*security question must not be empty';
                errors.push('*security question must not be empty');
            }else
            if (this.form_data.security_question == '(Personalize your own question)' && this.form_data.specified_security_question == '')
            {
                this.$refs['error_modal_security_question'].innerHTML  = '*security question must not be empty';
                errors.push('*security question must not be empty');
            }
            else
            {
                this.$refs['error_modal_security_question'].innerHTML  = '';
            }

            if (this.form_data.security_answer == '')
            {
                this.$refs['error_modal_security_answer'].innerHTML  = '*security question must not be empty';
                errors.push('*security question must not be empty');
            }
            else
            {
                this.$refs['error_modal_security_answer'].innerHTML  = '';
            }
            
            // this.form_data.errors.length > 0 ? '' : this.$refs['kyc_confirmation_modal'].show();
            if(errors.length == 0)
            {
                this.submitKyc();
                this.$refs['kyc_confirmation_modal'].hide();
            }
        },

        async submitKyc()
        {
            if(this.form_data.identification_card == 'Others (Must be a government issued ID)')
            {
                this.form_data.has_other_id = true;
                this.form_data.identification_card    = this.form_data.specified_id;
            }

            if(this.form_data.security_question == '(Personalize your own question)')
            {
                this.form_data.has_other_security_question  = true;
                this.form_data.security_question            = this.form_data.specified_security_question;
            }
            
            if(this.form_data.id_has_expiry == false)
            {
                this.form_data.id_expiry = null;
            }

            const fd = new FormData();

            fd.append('firstname'           , this.form_data.firstname);
            fd.append('middlename'          , this.form_data.middlename);
            fd.append('lastname'            , this.form_data.lastname);
            fd.append('birthdate'           , this.form_data.birthdate);
            fd.append('country'             , this.form_data.country.name);
            fd.append('nationality'         , this.form_data.nationality);
            fd.append('contact_code'        , this.form_data.contact_code);
            fd.append('contact'             , this.form_data.contact);

            fd.append('address_line'        , this.form_data.address_line);
            fd.append('street'              , this.form_data.street);
            fd.append('city'                , this.form_data.city);
            fd.append('zip_code'            , this.form_data.zip_code);

            fd.append('has_other_id'        , this.form_data.has_other_id);
            fd.append('identification_card' , this.form_data.identification_card);
            fd.append('id_number'           , this.form_data.id_number);
            fd.append('id_has_expiry'       , this.form_data.id_has_expiry);
            fd.append('id_expiry'           , this.form_data.id_expiry);
            fd.append('id_image'            , this.form_data.id_image_file);
            fd.append('selfie_image'        , this.form_data.selfie_image_file);

            fd.append('has_other_security_question' , this.form_data.has_other_security_question);
            fd.append('security_question'           , this.form_data.security_question);
            fd.append('security_answer'             , this.form_data.security_answer);


            let kyc_res_obj = await this.$_put(putUpdateKyc, fd);
            this.user.kyc_status = kyc_res_obj.data.kyc.kyc_status;
            // this.$forceUpdate();
        },

        clearPersonalInfo()
        {
            this.form_data.firstname    = ''
            this.form_data.middlename   = ''
            this.form_data.lastname     = ''
            this.form_data.birthdate    = ''
            this.form_data.contact      = ''
        }
    }
}
</script>

<style scoped>

    form > div:nth-child(1) > div.field:nth-child(6) label,
    form > div:nth-child(1) > div.field:nth-child(8) label
    {
        padding-bottom: 0 !important;
    }
    div.error-field
    {
        color: red;
        margin-top: 6px;
        margin-left: 4px;
    }
</style>


<style>
    .images__prev {
        width: 370px; 
        border-radius: 10px;
    }

    .personal-info {
        background: white;
        box-shadow: 0px 0px 20px 2px #e0e0e0;
        border-radius: 20px;
    }
    .kyc-padding {
        padding: 50px 300px;
    }
    .kyc-inner-padding {
        padding: 20px 100px;
    }
    .inputs-design {
        border: 1px solid #e0e0e0; 
        border-radius: 10px;
        transition: 1s;
    }
    .inputs-design:focus-within {
        border: 1px solid #9b68ad;
    }
</style>


<!-- reponsive -->
<style>
    @media (max-width: 1148px) {
            .kyc-padding {
            padding: 50px 100px;
        }
    }
    @media (max-width: 801px) {
            .kyc-padding {
            padding: 50px 10px;
        }
    }
    @media (max-width: 579px) {
            .kyc-inner-padding {
            padding: 20px 10px;
        }
    }
    @media (max-width: 499px) {
            .images__prev {
            width: 100%; 
        }
    }
     @media (max-width: 414px) {
            .kyc-inner-padding {
            padding: 20px 0px;
        }
        .kyc-padding {
            padding: 50px 0px;
        }
        .personal-info {
        box-shadow: 0px 0px 0px 0px #e0e0e0;
       }
    }
</style>