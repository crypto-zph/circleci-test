<template>
  <div class="problems">
    <div class="container">
      <div class="problems__inner">
        <div class="problems__description font-rubik-labels">
          <b>The main goal is</b> to create a digital environment to fulfill
          electronic contracts, where a smart contract will have the same legal force if such a contract was concluded
          on paper in the presence of a notary with his seal.
        </div>
        <h2 class="title problems__title">
          <span class="title__bg font-rubik-labels">Market problems:</span>
        </h2>
        <div class="problems__items font-rubik-labels">
          <div class="row">
            <div class="problems__item col-md-4 col-12">
              <div class="problems__icon">
                <q-img src="svg-icon/problem1.svg" alt />
              </div>
              <div class="problems__text">
                it takes several days/weeks
                to legally execute a transaction on a remote basis;
              </div>
            </div>
            <div class="problems__item col-md-4 col-12">
              <div class="problems__icon">
                <q-img src="svg-icon/problem2.svg" alt />
              </div>
              <div class="problems__text">
                paper documents
                are subject to destruction and/or falsification;
              </div>
            </div>
            <div class="problems__item col-md-4 col-12">
              <div class="problems__icon">
                <q-img src="svg-icon/problem3.svg" alt />
              </div>
              <div
                class="problems__text"
              >it takes a lot of time to find a reasonable document in the “paper” register;</div>
            </div>
            <div class="problems__item col-md-4 col-12">
              <div class="problems__icon">
                <q-img src="svg-icon/problem4.svg" alt />
              </div>
              <div
                class="problems__text"
              >there is no confidentiality due to the large number of intermediaries;</div>
            </div>
            <div class="problems__item col-md-4 col-12">
              <div class="problems__icon">
                <q-img src="svg-icon/problem5.svg" alt />
              </div>
              <div class="problems__text">the difficulty of exchanging digital assets for real.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ShowCase from "./Problems.css";
export default {
  data: () => ({}),
  mounted() {},
  methods: {},
};
</script>