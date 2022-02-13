<template>
  <div class="profile">
    <h2>Perfil completo</h2>
    <div>
      <h3>Información personal:</h3>
      <div> <strong>Nombre : {{this.$store.state.newUserProfile.name}}</strong></div>
      <div> <strong>Email : {{this.$store.state.newUserProfile.email}}</strong></div>
      <div> <strong>País : {{this.$store.state.newUserProfile.country}}</strong></div>
      <div> <strong>Ciudad : {{this.$store.state.newUserProfile.city}}</strong></div>
      <div> <strong>Descripción : {{this.$store.state.newUserProfile.name}}</strong></div>
      <h3>Información laboral:</h3>
      <div> <strong>Años de experiencia : {{this.$store.state.newUserProfile.infoWork.experiece}}</strong></div>
      <div> <strong>Sector : {{this.$store.state.newUserProfile.infoWork.sector}}</strong></div>
      <div> <strong>Skills : {{this.$store.state.newUserProfile.infoWork.skills}}</strong></div>   
    </div>
  </div>
</template>
<script>
export default {
  name: 'Profile'
}
</script>

