<template>
  <div>
<!--    <Admin v-if="user && user.role === 'admin'" />-->
    <Pensieve v-if="user" />
    <Login v-else />
  </div>
</template>

<script>
  import axios from 'axios'
  // import Admin from '@/components/Admin.vue';
  import Login from '@/components/Login.vue'
  import Pensieve from '@/components/Pensieve.vue'
  export default {
    name: 'home',
    async created() {
      try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    components: {
      Login,
      Pensieve,
      // Admin
    },
    computed: {
      user() {
        return this.$root.$data.user;
      }
    }
  }
</script>
