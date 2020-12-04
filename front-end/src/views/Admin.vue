<template>
  <div class="main">
    <div v-if="user && user.role === 'admin'">
      <h1>Administrator Page</h1>
      <h2>On this page you change a user's role and/or remove user accounts.</h2>
      <div v-for="user in users" v-bind:key="user.username">
        <div class="actions">
          <p>
            username: <b><em>{{user.username}}</em></b> |
            firstname: <b><em>{{user.firstName}}</em></b> |
            lastname: <b><em>{{user.lastName}}</em></b> |
            role: <input v-model="user.role">
          </p>
          <button @click="deleteUser(user.username)">Delete</button>
          <button @click="changeUserRole(user)">Edit</button>
        </div>
      </div>
    </div>
    <Home v-else />
  </div>
</template>

<script>
import axios from 'axios';
import Home from '@/views/Home.vue'
export default {
  name: 'Admin',
  data() {
    return {
      users: [],
    }
  },
  components: {
    Home,
  },
  computed: {
    user() {
      return this.$root.$data.user;
    },
  },
  created() {
    this.getUsers();
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    async getUsers() {
      try {
        let response = await axios.get("/api/users/all");
        this.users = response.data.users;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteUser(username) {
      console.log(username)
      debugger
      try {
        await axios.delete("/api/users/" + username);
        this.getUsers();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async changeUserRole(user) {
      try {
        await axios.put("/api/users/" + user.username, {
          role: user.role,
        });
        this.getUsers();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>

<style scoped>

</style>