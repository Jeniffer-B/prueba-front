<template>
    <div class="containerComponent">
         <MyNav />
        <div class="formBox">
            <div v-if="formIsValid === false">
                <strong>El formulario tiene algun error!</strong>
            </div>
            <div class="formContainer" id="hideForm">
                <h3> Información Personal</h3>
                <form @submit.prevent="savePersonalInfo" class="myForm">
                    <input v-model="email" type="email" required="required" placeholder="Email">
                    <input v-model="name" type="text" minlength="5" required="required" placeholder="Nombre completo">
                    <textarea class="textArea" v-model="message" placeholder="Cuéntanos algo sobre tí."></textarea>
                    <input v-model="country" required="required" type="text" placeholder="País">
                    <input v-model="city" required="required" type="text" placeholder="Ciudad">
                    <button type="submit"  value="savePersonalInfo">Guardar</button>
                </form>
            </div>
            <div class="formContainer">
                <h3> Información Laboral</h3>
                <form @submit.prevent="saveWorkInfo" class="myForm">
                    <input v-model="experience" required="required" type="number" placeholder="Años de experiencia">
                    <select v-model="sector" required="required" class="SelectInput">
                        <option disabled value="">Seleccione un sector</option>
                        <option>Front</option>
                        <option>Back</option>
                        <option>Mobile</option>
                        <option>Data</option>
                    </select>
                    <input v-model="skill" type="text"  placeholder="Tus Skills" class="skills">
                        <button @click.prevent="addSkills" class="buttonAddSkill">
                             Add
                        </button>
                    <button type="submit" value="saveWorkInfo">Crear perfil</button>
                </form> 
            </div>
           <div class="textInformationNewUser">
                <p v-for="skill in skills" :key="skill.id"> # {{ skill }}</p>
            </div>
        </div>
    </div>
</template>
<script>
import MyNav from '../components/MyNav.vue'
export default {
    name: 'FormNewProfile',
    components: {
        MyNav
    },
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
            formTwoIsValid: null,
            formIsValid: null,
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
                personalInfo.color = this.getRandomColor()
                this.createNewUser(personalInfo)
            }
            this.hideForm()
        },
        hideForm() {
            var formDiv = document.getElementById('hideForm');
            if (formDiv.style.display === 'none') {
                formDiv.style.display = 'block';
            } else {
                formDiv.style.display = 'none';
            }
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
                this.completeNewProfile(profesionalInfo)
                this.$router.push('/Profile')
            }
        },
        completeNewProfile(profesionalInfo) {
            this.$store.dispatch('completeProfile', profesionalInfo)
        },
        getRandomColor() {
            let letters = '0123456789ABCDEF'.split('');
            let color = '#';
            for (let i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        }
}  }
</script>
<style scoped>
    .formBox{
        height:100vh;
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #ECECEC;
    }
    .textInformationNewUser{
        width: 20%;
        height: auto;
        text-align: initial;
        border-left: #d8918d 3px solid;
    }
    .textInformationNewUser p{
        padding: 1% 1%;
        margin: 0.5% 2%;
    }
    .formContainer{
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        width: 30%;
        height: auto;
        padding: 2% 2%;
        margin: 5% 3%;
        border-radius: 66px;
        background: #d5b1af;
        box-shadow:  20px 20px 66px #b39b9b,
                    -20px -20px 66px #ffffff;
    }

    .myForm ,
    .myForm div{
        width: 80%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    input ,
    .SelectInput {
        width: 100%;
        height: 6%;
        padding: 4% 4%;
        margin: 4% 4%;
        border-radius: 2%;
        border-style: none;
    }
    .buttonAddSkill{
        width: 20%;
        height: 20px;
        margin: 3% 3%;
    }
    .textArea{
        width: 100%;
        padding: 4% 4%;
        margin: 4% 4%;
        height: 10%;
    }
    button {
        background-color: #eee;
        border: none;
        font-size: 1rem;
        width: 80%;
        height: 50px;
        margin: 2%;
        border-radius: 1rem;
        color:#d8918d;
        box-shadow: 0 0.4rem #dfd9d9;
        cursor: pointer;
    }
  button:active {
    color: white;
    box-shadow: 0 0.2rem #dfd9d9;
    transform: translateY(0.2rem);
  }

  button:hover:not(:disabled) {
    background: #BB7E91;
    color: white;
    text-shadow: 0 0.1rem #bcb4b4;
  }

  button:disabled {
    cursor: auto;
    color: grey;
  }
  @media (max-width: 800px) {
    .formBox{
      flex-direction: column;
    }
    .textInformationNewUser{
    width: 90%;
    height: auto;
    font-size: 1em;
    border-bottom: #d8918d 3px solid;
  }
  .textInformationNewUser p{
    padding: 2% 2%;
    margin: 1% 1%;
    text-align: justify;
  }
  .formContainer{
    display: flex;
    flex-direction: column;
    width: 90%;
    margin: 4% 2%;
  }
  input{
    width: 100%;
    height: 40px;
    padding: 2% 2%;
    margin: 2% 2%;
  }
  button {
    height: 30px;
  }
  }
</style>
