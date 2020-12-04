<template>
  <div class="home">
<!--    <div class="banner">-->
<!--      <p></p>-->
<!--    </div>-->
    <img v-if="items.length > 0" id="pour-memory" src="/pouring-memory-pensieve.jpg" alt="pouring-memory.jpg"/>
    <section v-if="!items.length > 0" class="image-gallery">
      <div class="image" v-for="item in items" :key="item.id">
        <h2>{{item.title}}</h2>
        <img :src="item.path" />
        <p><em>{{item.description}}</em></p>
      </div>
    </section>
    <h2 v-if="items.length === 0">Manage memories to make the magic happen.</h2>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      items: [],
    }
  },
  created() {
    this.getItems();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    async getItems() {
      try {
        let response = await axios.get("/api/items");
        this.items = response.data;
        console.log(this.items.length > 0)
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
/*.banner {*/
/*  padding-top: 100px;*/
/*  background-image: url("/pouring-memory-pensieve.jpg");*/
/*  content: "";*/
/*  background-size: 100%;*/
/*  background-repeat: no-repeat;*/
/*  top: 0;*/
/*  left: 0;*/
/*  bottom: 0;*/
/*  right: 0;*/
/*  position: absolute;*/
/*  z-index: -1;*/
/*}*/

#pour-memory {
  width: 100%;
  height: 400px;
}

h2 {
  color: palegoldenrod;
  font-family: Perpetua;
}

.image h2 {
  color: palegoldenrod;
}

.image p {
  color: palegoldenrod;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}

.image-gallery {
  column-gap: 1.5em;
  padding: 15px;
}

.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}

/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}

/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>