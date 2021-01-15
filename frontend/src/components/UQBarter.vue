<template>
    <div>

	    <!-- content -->
	    <div class="q-pa-md">
            <q-select class="field q-mb-md" outlined behavior="menu" v-model="selected" :options="options" @input="getItemByStatus_()" />

            <div class="q-col-gutter-md row responsive">
                <div class="col-4" v-for="(item , index) in items" :key="index">
                    <q-card>
                        <q-card-section class="card-add-user">
                            <div class="field q-mt-md">
                                <label>{{ item.item_name }}</label>
                            </div>
                            <div class="field q-mt-md">
                                <label> Price: 1 BRT </label>
                            </div>
                            <div :class="(selected == 'available') ? 'show_me' : 'hide_me'">
                                <div class="q-mt-lg">
                                  <q-btn color="primary" unelevated class="full-width" @click="barter()">Barter</q-btn>
                                </div>
                            </div>
                            <div :class="(selected == 'escrowed') ? 'show_me' : 'hide_me'">
                                <div class="q-mt-sm">
                                  <q-btn color="primary" unelevated class="full-width" @click="barter()">Release</q-btn>
                                </div>
                                <div class="q-mt-sm">
                                  <q-btn color="primary" unelevated class="full-width" @click="barter()">Reject</q-btn>
                                </div>
                            </div>
                        </q-card-section>
                    </q-card>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { getItemByStatus } from "../references/url";

export default
{
    data:() =>(
    {
        selected: 'available', // must be static
        options: ['pending', 'rejected', 'available', 'escrowed', 'bartered'], // must be static
        items: [],
    }),
    async mounted()
    {
        await this.getItemByStatus_();
    },
    methods:
    {
        async getItemByStatus_() 
        {
            let item_info =
            {
                status: this.selected,
            }

            this.$q.loading.show();
            let item = await this.$_post(getItemByStatus, item_info); 
            if(item)
            {
                this.items = item.data;
                console.log(this.items);
            }
            this.$q.loading.hide();
        },

        async barter()
        {
            alert('hello');
        }
    }
}
</script>

<style>
.hide_me {
  display: none;
}

.show_me {
  display: block;
}
</style>