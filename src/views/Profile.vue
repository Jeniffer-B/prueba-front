<template>
<div>
  <MyNav />
   <div class="profile">
    <h2>Perfil completo</h2>
    <div class="informationContainer">
      <div class="textContainer">
        <h3>Información personal:</h3>
      <div class="userPicture">{{this.$store.state.newUserProfile.color}}</div>
      <div> <strong>Nombre : {{this.$store.state.newUserProfile.name}}</strong></div>
      <div> <strong>Email : {{this.$store.state.newUserProfile.email}}</strong></div>
      <div> <strong>País : {{this.$store.state.newUserProfile.country}}</strong></div>
      <div> <strong>Ciudad : {{this.$store.state.newUserProfile.city}}</strong></div>
      <div> <strong>Descripción : {{this.$store.state.newUserProfile.name}}</strong></div>
      <h3>Información laboral:</h3>
      <div> <strong>Años de experiencia : {{this.$store.state.newUserProfile.infoWork.experiece}}</strong></div>
      <div> <strong>Sector : {{this.$store.state.newUserProfile.infoWork.sector}}</strong></div>
      <div> <strong>Skills : {{userSkills}}</strong></div>   
      </div>
    </div>
  </div>
</div>
 
</template>
<script>
import MyNav from '../components/MyNav.vue'
export default {
  name: 'Profile',
  components: {
    MyNav
  },
  computed: {
    userSkills() {
      if (this.$store.state.newUserProfile.infoWork.skills.length === 0) {
        return []
      }
      return this.$store.state.newUserProfile.infoWork.skills.join(', ')
    }
    }
  }
</script>
<style scoped>
  .profile { 
    height:100vh;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #ECECEC;
  }
  .informationContainer{
    width: 40%;
    text-align: left;
    border-radius: 91px;
    background: #B9D5D9;
    box-shadow:  5px 5px 0px #758689,
                -5px -5px 0px #fdffff;
  }
  .userPicture {
    border-radius: 50%;
    min-width: 60px;
  }
  .textContainer{
    padding: 2% 2%;
    margin: 3% 7%;
    color: #474554;
  }
  .textContainer div {
    margin: 4% 4%;
  }
  h3{
    letter-spacing: 0.2em;
  }
  @media (max-width: 800px) {
    .informationContainer {
      width: 80%;
    }
    .textContainer{
    padding: 1% 1%;
    margin: 2% 3%;
    color: #474554;
  }
  .textContainer div {
    margin: 2% 2%;
  }
  h3{
    letter-spacing: 0.1em;
  }
  }

</style>

