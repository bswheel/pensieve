<template>
  <div class="page-container">
      <div id="menu">
        <div id="side1">
          <router-link v-if="user" to="/manage" class="menu-spacing">
            <div class="menu-item">
              <h2>Manage Memories</h2>
            </div>
          </router-link>
          <router-link v-if="user && user.role === 'admin'" to="/admin" class="menu-spacing">
            <div class="menu-item">
              <h2>Admin</h2>
            </div>
          </router-link>
<!--          <router-link to="/about" class="menu-spacing">-->
<!--            <div class="menu-item">-->
<!--              <h2>About</h2>-->
<!--            </div>-->
<!--          </router-link>-->
        </div>
        <div id="brand">
          <router-link to="/">
            <h1 class="brand-name">Personal Pensieve</h1>
          </router-link>
        </div>
        <div id="side">
          <div class="menu-item">
            <h2 v-if="user">Logged in as: {{user.firstName}} {{user.lastName}}
              <button @click="logout" class="pure-button pure-button-primary">Logout</button>
            </h2>
          </div>
        </div>
      </div>
    <div class="content-wrap">
      <div class="content">
        <router-view />
      </div>
    </div>
    <div class="footer">
      <hr>
      <a href="https://github.com/bswheel/pensieve">GitHub</a>
      <router-link v-if="user" to="/manage">Manage Memories</router-link>
      <router-link v-if="user && user.role === 'admin'" to="/admin">Admin</router-link>
      <a v-if="user" @click="logout">Logout</a>
    </div>
  </div>

</template>

<script>
import axios from 'axios';
export default {
  name: 'App',
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async logout() {
      try {
        await axios.delete("/api/users");
        this.$root.$data.user = null;
      } catch (error) {
        this.$root.$data.user = null;
      }
    }
  }
}
</script>


<style>
html {
  box-sizing: border-box;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: slategrey;
  padding: 0px;
  margin: 0px;
}

.brand-name {
  font-weight: bold;
  font-family: "serif";
  color: goldenrod;
}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 5px;
  background-color: darkred;
  height: 90px;
}

#menu a {
  /*color: #B84901;*/
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
  font-size: 12pt;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}

#side img {
  width: 50px;
}

#side1 {
  grid-area: none;
  display: flex;
  justify-content: flex-start;
}

.menu-item {
  display: flex;
  flex-direction: row;
  margin-right: 2%;
  color: goldenrod;
  font-size: 14pt;
}

a {
  text-decoration: None;
  color: goldenrod;
}

a:link{
  text-decoration: none;
}

a:visited{
  text-decoration: none;
}

a:hover{
  text-decoration: underline;
  color: gold;
}

.menu-item p {
  margin: auto;
}

.menu-item h2 {
  margin: 10%;
  font-size: 15pt;
}

.menu-spacing {
  margin: 2%;
}

.footer {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding-bottom: 5px;
  background-color: darkslategray;
}

.footer a {
  padding-right: 50px;
  color: goldenrod;
}

.footer a:link {
  text-decoration: none;
  color: gold;
}

.footer a:visited {
  text-decoration: none;
}

.footer a:hover {
  text-decoration: underline;
  color: gold;
}

.page-container {
  position: relative;
  min-height: 100vh;
  width: 100vw;
}

.content-wrap {
  padding-bottom: 100px;
  width: 100%
}
</style>
