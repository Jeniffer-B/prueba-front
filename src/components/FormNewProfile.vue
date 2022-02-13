<template>
    <div>
        <div class="formBox">
            <div v-if="formIsValid === false">
                <strong>El formulario tiene algun error!</strong>
            </div>
           <h3> Información Personal</h3>
            <form @submit.prevent="savePersonalInfo">
                <input v-model="email" type="email" required="required" placeholder="Email">
                <input v-model="name" type="text" minlength="5" required="required" placeholder="Nombre completo">
                <textarea v-model="message" placeholder="Cuentanos algo sobre tí."></textarea>
                <input v-model="country" required="required" type="text" placeholder="País">
                <input v-model="city" required="required" type="text" placeholder="Ciudad">
                <button type="submit"  value="savePersonalInfo">Guardar</button>
            </form>
            <div v-if="formIsValid === true">
                <form @submit.prevent="saveWorkInfo">
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
                    <p v-for="skill in skills" :key="skill.id">{{ skill }}</p>
                    <button type="submit" value="saveWorkInfo">Crear perfil</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'PersonalInformationForm',
    data(){
        return{
            email: '',
            name: '',
            message: '',
            country: '',
            city: '',
            experience:'',
            sector: '',
            skills: [],
            skill:'',
            formIsValid: null,
            formTwoIsValid: null
        }
    },
    methods: {
        addSkills(){
            this.skills.push(this.skill);
            this.skill = '';
        },
        savePersonalInfo(){
            const personalInfo = {
                email: this.email,
                name: this.name,
                message: this.message,
                country: this.country,
                city: this.city,
            }
            this.validateForm(personalInfo)
            if (this.formIsValid !== false) {
                this.formIsValid = true
            }
            if(this.formIsValid == true){
                this.createNewUser(personalInfo)
            }
            console.log(personalInfo);
        },
        validateForm(personalInfo){
            this.validateEmail(personalInfo.email)
            this.validateName(personalInfo.name)
        },
        validateEmail(email) {
            const regEx = /\S+@\S+\.\S+/
            if (regEx.test(email) === false) {
                this.formIsValid = false
            }
        },
        validateName(name){
            if (name.length < 4) {
                this.formIsValid = false
            }
        },
        createNewUser (personalInfo) {
            this.$store.dispatch('registeredUser', personalInfo)
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
                // this.$router.push('/About')
            }
        },
        completeNewProfile(profesionalInfo) {
            this.$store.dispatch('completeProfile', profesionalInfo)
        }
        
        
    }
}    
</script>
