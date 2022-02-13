<template>
    <div>
        <div class="formContainer">
            <form @submit.prevent="saveWorkInfo" class="myForm">
                        <h3> Información Laboral</h3>
                        <input v-model="experience" required="required" type="number" placeholder="Años de experiencia">
                        <select v-model="sector" required="required">
                            <option disabled value="">Seleccione un sector</option>
                            <option>Front</option>
                            <option>Back</option>
                            <option>Mobile</option>
                            <option>Data</option>
                        </select>
                        <input v-model="skill" type="text"  placeholder="Tus Skills"> <button @click.prevent="addSkills">Añadir skills</button>
                        <p v-for="skill in skills" :key="skill.id"> # {{ skill }}</p>
                        <button type="submit" value="saveWorkInfo">Crear perfil</button>
                    </form>
        </div>
    </div>
</template>
<script>
export default {
    name : 'FormInfoWork',
    data(){
        return{
            experience:'',
            sector: '',
            skills: [],
            skill:'',
            formTwoIsValid: null
        }        
    },
    methods: {
        addSkills(){
            this.skills.push(this.skill);
            this.skill = '';
        },
        saveWorkInfo(){
            const profesionalInfo = {
                experience: this.experience,
                sector: this.sector,
                skills: this.skills,
            }
            console.log(profesionalInfo)
            this.validateWorkForm(profesionalInfo)
            if (this.formTwoIsValid !== false) {
                this.formTwoIsValid = true
                this.completeProfile(profesionalInfo)
            }
        },
        validateWorkForm(profesionalInfo) {
            this.validateWorkYears(profesionalInfo.experience)
            this.ValidateSector(profesionalInfo.sector)
            this.validateSkills(profesionalInfo.skills)
        },
        validateWorkYears(experience) {
            if(experience <1){
                this.formTwoIsValid = false
            }
        },
        ValidateSector(sector) {
            if(sector == ''){
                this.formTwoIsValid = false
            }
        },
        validateSkills(skills) {
            if (skills == []){
                this.formTwoIsValid = false
            }
        },
        completeProfile(profesionalInfo){
            if(this.formIsValid == true && this.formTwoIsValid == true) {
                console.log('todo true')
                this.completeNewProfile(profesionalInfo)
                this.$router.push('/Profile')
            }
        },
        completeNewProfile(profesionalInfo) {
            this.$store.dispatch('completeProfile', profesionalInfo)
        }   
    }
}
</script>