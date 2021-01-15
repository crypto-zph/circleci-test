<template>
    <q-layout class="main" view="hHh Lpr lFf">
        <q-page-container>
                 
            <router-view />
            
        </q-page-container>
    </q-layout>
</template>
<script>
import navigation       from '../references/nav'

export default
{
    name: 'FrontLayout',
    data: () =>
	({
		leftDrawerOpen: false,
        navigation: [],
    }),

    mounted()
    {
        this.navigation = navigation;
    },
    methods:
    {
    },
}
</script>