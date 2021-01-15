<template>
    <div >
        <div class="component q-ma-lg" :class="!$q.dark.isActive? 'text-black':'bg-black'" style="border-radius: 10px">
            <div class="">
                <u-q-admin-setting @success="success()"></u-q-admin-setting>
            </div>
        </div>
    </div>
</template>

<script>
import UQAdminSetting from '../../components/admin/UQAdminSetting'

export default
{
    data:() =>
    ({
    }),
    components: { UQAdminSetting },
    mounted()
    {
    },
    methods:
    {
        success()
        {
            this.$q.dialog({ title: `Registration  Successful!`, message:  'The account has been succesfully updated!' });
        }
    },
}
</script>
