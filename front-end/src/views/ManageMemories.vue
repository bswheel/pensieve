<template>
  <div>
    <!--    <Admin v-if="user && user.role === 'admin'" />-->
    <Memory v-if="user" />
    <Login v-else />
  </div>
</template>

<script>
import axios from 'axios'
// import Admin from '@/components/Admin.vue';
import Login from '@/components/Login.vue'
import Memory from '@/components/Memory.vue'
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
    Memory,
    // Admin
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>
