<template>
  <v-row class="px-0 mx-0">
    <v-col cols="12" md="6" class="align-sm-center">
      <v-card class="px-3 px-sm-8 px-md-6 px-lg-8 px-xl-12 mt-4 mt-md-8 mb-2 rounded-lg d-flex flex-column"
        elevation="0">

        <!-- Title text -->
        <v-slide-x-transition appear>
          <v-card-title class="mx-0 px-0">
            <h1 class="text-h4 text-sm-h3 text-md-h3 text-lg-h3 text-xl-h1 font-weight-bold">
              Poistná kalkulačka
            </h1>
          </v-card-title>
        </v-slide-x-transition>

        <!-- Subtitle text -->
        <v-slide-x-transition appear>
          <v-card-subtitle class="px-0 py-2 py-md-4 pb-4 text-lg-body-1 text-xl-h5">
            Vypočítajte si cenu za Vaše cestovné poistenie.
          </v-card-subtitle>
        </v-slide-x-transition>
        <v-form class="mb-6">
          <!-- Insurance variant and bundle selection -->
          <v-row class="my-0 justify-space-between">

            <!-- Variant selection -->
            <v-slide-x-transition appear>
              <v-col cols="12" sm="5">
                <InputLabel text="Variant poistenia" :mandatory="true" />
                <v-radio-group @change="calculateAmount()" dense v-model="insurance.variant" class="pa-0 ma-0">
                  <v-radio v-for="(option,i) in Variants" :key="option.toString()+i.toString()" dense
                    :value="option.value">
                    <template #label>
                      <span class="text-body-2 text-sm-body-1 text-xl-h6 font-weight-xl-regular black--text">{{
                          option.text
                      }}</span>
                    </template>
                  </v-radio>
                </v-radio-group>
              </v-col>
            </v-slide-x-transition>

            <!-- Bundle selector/radio buttons -->
            <v-slide-x-transition appear>
              <v-col cols="12" sm="5" md="5">
                <InputLabel text="Balík" :mandatory="true" />
                <v-select v-model="insurance.bundle" :items="Bundles" placeholder="Vyberte balík"
                  class="text-body-2 text-sm-body-1 text-xl-h6" outlined :dense="$vuetify.breakpoint.xl? false:true"
                  @change="calculateAmount()">
                </v-select>
              </v-col>
            </v-slide-x-transition>

            <!-- Date picker -->
            <v-slide-x-transition appear>
              <v-col cols="12" sm="5" md="5">
                <InputLabel text="Začiatok poistenia" :mandatory="true" />
                <v-menu ref="startPickerMenu" v-model="startDatePicker" :close-on-content-click="false"
                  :return-value.sync="insurance.startDate" transition="slide-x-transition" min-width="auto">
                  <template #activator="{on,attrs}">
                    <v-text-field class="text-body-2 text-sm-body-1 text-xl-h6" outlined
                      :dense="$vuetify.breakpoint.xl? false:true" v-model="insurance.startDate"
                      placeholder="Vyberte dátum" prepend-inner-icon="mdi-calendar-today" readonly v-bind="attrs"
                      v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker v-model="insurance.startDate" scrollable @change="calculateAmount()"
                    :min="getStartDate()" :max="insurance.endDate">
                    <v-spacer></v-spacer>
                    <v-btn outlined color=" primary" @click="startDatePicker=false">Zrušiť</v-btn>
                    <v-btn color="primary" @click="$refs.startPickerMenu.save(insurance.startDate)">Uložiť</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-slide-x-transition>

            <!-- Date picker -->
            <v-slide-x-transition>
              <v-col cols="12" sm="5" md="5" v-if="insurance.variant==Variants[0].value">
                <InputLabel text="Koniec poistenia" :mandatory="true" />
                <v-menu ref="endPickerMenu" v-model="endDatePicker" :close-on-content-click="false"
                  :return-value.sync="insurance.endDate" transition="slide-x-transition" min-width="auto">
                  <template #activator="{on,attrs}">
                    <v-text-field class="text-body-2 text-sm-body-1 text-xl-h6" outlined
                      :dense="$vuetify.breakpoint.xl? false:true" v-model="insurance.endDate"
                      placeholder="Vyberte dátum" prepend-inner-icon="mdi-calendar" readonly v-bind="attrs" v-on="on">
                    </v-text-field>
                  </template>
                  <v-date-picker v-model="insurance.endDate" scrollable @change="calculateAmount()"
                    :min="(this.insurance.startDate!=undefined)? insurance.startDate:getStartDate()">
                    <v-spacer></v-spacer>
                    <v-btn outlined color="primary" @click="endDatePicker=false">Zrušiť</v-btn>
                    <v-btn color="primary" @click="$refs.endPickerMenu.save(insurance.endDate)">Uložiť</v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>
            </v-slide-x-transition>

            <!-- Number of people -->
            <v-slide-x-transition appear>
              <v-col cols="12" sm="5" md="5" class="justify-start">
                <InputLabel text="Počet osôb" :mandatory="true" />
                <v-btn-toggle v-model="insurance.numOfPeople" :dense="$vuetify.breakpoint.xl? false:true"
                  active-class="primary white--text" color="primary" class="rounded" mandatory
                  @change="calculateAmount()">
                  <v-btn v-for="value in [1,2,3]" :key="value" :value="value"
                    class="pa-5 px-6 pa-xl-6 ma-0 text-body-1 text-xl-h6 font-weight-medium">
                    {{ value}}
                  </v-btn>
                </v-btn-toggle>
              </v-col>
            </v-slide-x-transition>

            <!-- Extras -->
            <v-slide-x-transition appear>
              <v-col cols="12" sm="5" md="5">
                <InputLabel text="Pripoistenia" :mandatory="false" />
                <v-checkbox v-for="(item,i) in Extras" :key="i" v-model="insurance.extras[i]"
                  :dense="$vuetify.breakpoint.xl? false:true" hide-details class="my-1 text-caption"
                  :value="insurance.extras[i]" @change="calculateAmount()">
                  <template #label>
                    <span class="text-body-2 text-sm-body-1 text-xl-h6 font-weight-xl-regular black--text">{{
                        item.text
                    }}</span>
                  </template>
                </v-checkbox>
              </v-col>
            </v-slide-x-transition>

            <!-- Summary (total amount) -->
            <v-slide-y-transition hide-on-leave appear>
              <v-col cols="12" sm="12" md="12">
                <v-row id="totalAmount" class="d-flex flex-row align-baseline justify-space-between pt-5 pt-xl-8 mx-1">
                  <div class="text-h5 text-xl-h3 font-weight-medium">Celková suma</div>
                  <v-slide-y-transition hide-on-leave>
                    <div :key="insurance.amount" class="text-h4 text-xl-h3 font-weight-medium text-right">
                      {{ insurance.amount}} €
                    </div>
                  </v-slide-y-transition>
                </v-row>
              </v-col>
            </v-slide-y-transition>
          </v-row>
        </v-form>
      </v-card>
    </v-col>

    <!-- Image displayed on desktop view -->
    <v-col cols="12" md="6" sm="12" class="d-none flex-column justify-center align-center d-sm-none d-md-flex">
      <v-scroll-x-reverse-transition appear>
        <img class="justify-self-center" width="100%" max-height="700px" src="../assets/off-to-vacation.svg"
          alt="Man travelling, inside airport">
      </v-scroll-x-reverse-transition>
    </v-col>
  </v-row>
</template>

<style scoped>
/** Themed underline */
#totalAmount::after {
  content: "";
  background: #7B8CDE;
  height: 3px;
  width: 100%;
  border-radius: 1px;
  bottom: -0.25rem;
}
</style>

<script>
import {InsuranceData} from '../util/calculator';
import {Utils} from '../util/utils';

import InputLabel from '../common/inputLabel.vue';

export default {
  components: {
    InputLabel
  },

  data() {
    return {
      insurance: new InsuranceData(), // <---- insurance data instance

      // datepicker helpers
      startDatePicker: false,
      endDatePicker: false,

      /** 
       * DATA DEFINTION
       * 
       * value -- acts as an index to the array of Fees and ExtraFees
       * text -- defines the label on the input type
       * 
      */
      Variants: [
        {value: 0,text: "Krátkodobé poistenie"},
        {value: 1,text: "Celoročné poistenie"},
      ],
      Bundles: [
        {value: 0,text: "Základný"},
        {value: 1,text: "Rozšírený"},
        {value: 2,text: "Extra"},
      ],
      Extras: [
        {value: 0,text: "Storno cesty"},
        {value: 1,text: "Športové aktivity"},
      ],

      // Sadzby -> [Bundle.value, Variant.value]
      Fees: [
        [1.2,39],
        [1.8,49],
        [2.4,59],
      ],

      // Prirazka k sadzbe -> [Variant.value, Extras.value]
      ExtraFees: [
        [0.5,0.2],
        [0.3,0.1],
      ],
    }
  },

  methods: {

    /**
     * Return base fee for selected insurance variant and bundle
     */
    getBaseFee() {
      return this.Fees[this.insurance.bundle][this.insurance.variant];
    },

    /**
     * Extra fee for additional insurance
     */
    getExtraFeeMultiplier() {
      var totalExtraFee=0.0;
      for(var i=0;i<this.insurance.extras.length;i++) {
        totalExtraFee+=
          (this.insurance.extras[i]===true)
            ? this.ExtraFees[i][this.insurance.variant]
            :0;
      }
      console.log("ExtraFee multiplier",1+totalExtraFee);

      return 1+totalExtraFee;
    },

    /**
     * Function that decides whether to start the calculation
     * or addiotional data is needed
     */
    allowCalculation() {
      if(this.insurance.variant!=undefined) {
        if(this.insurance.variant==this.Variants[0].value) {
          return (
            this.insurance.variant!=undefined&&
            this.insurance.bundle!=undefined&&
            this.insurance.startDate!=undefined&&
            this.insurance.endDate!=undefined
          );
        }
        return (
          this.insurance.variant!=undefined&&
          this.insurance.bundle!=undefined&&
          this.insurance.startDate!=undefined
        );
      }

    },

    /**
     * Calculate total insurance fee
     */
    calculateAmount() {
      if(!this.allowCalculation()) {
        this.insurance.amount="--"
        return;
      };

      // SHORT TERM
      if(this.insurance.variant==this.Variants[0].value) {
        this.insurance.amount=(
          Utils.getDifferenceInDays(this.insurance.startDate,this.insurance.endDate)*  // Number of days
          this.getBaseFee()*                                                           // Bundle fee
          this.getExtraFeeMultiplier()*                                                // Extras multiplier
          this.insurance.numOfPeople).toFixed(2);                                      // People count
      }

      // YEARLY
      else {
        this.insurance.amount=(
          (+this.getBaseFee())*                         // Bundle fee per year
          (+this.getExtraFeeMultiplier())*              // Extras multiplier
          (+this.insurance.numOfPeople)).toFixed(2);    // People count
      }
    },

    /**
     * Return current date, formatted
     */
    getStartDate() {
      return new Date().toISOString().slice(0,10);
    },
  },
}
</script>