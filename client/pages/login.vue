<template>
    <!-- component -->
    <div class="flex justify-center px-20">
      <div class="bg-white shadow-md m-20 rounded mb-4 w-3/4 p-16">
        <div class="max-w-3xl mx-16 mt-10">
          <div class="text-center text-4xl text-blue-700 mb-10">
            LOGIN
          </div>
          <div class="mb-4">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
              Email
            </label>
            <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Email" v-model="email">
            <div v-if="errorMessages.email" class="text-red-500">{{ errorMessages.email }}</div>
          </div>
          <div class="mb-6">
            <label class="block text-grey-darker text-sm font-bold mb-2" for="password">
              Password
            </label>
            <input class="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="*********" v-model="password">
            <div v-if="errorMessages.password" class="text-red-500">{{ errorMessages.password }}</div>
          </div>
          <div class="flex items-center justify-between">
            <button @click="signIn" class="bg-blue-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">
              Sign In
            </button>
            <a class="inline-block align-baseline font-bold text-sm text-blue-700 hover:text-blue-400" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
<script>
import { mapActions } from 'vuex';

export default{
    data (){
        return{
            email:"",
            password:"",
            errorMessages:{}
        }
    },
   methods:{
    ...mapActions(['login']),
    // input validation
    validateInput(){
        this.errorMessages = {}
        if(this.email === ""){
            // check email format
            this.errorMessages.email = "Email is required!";
        }else {
            // Email format validation using regular expression
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(this.email)) {
            this.errorMessages.email = "Invalid email!";
            }
        }
        if(this.password === ""){
            this.errorMessages.password = "Password is required!";

        }else if (this.password.length < 8) {
            this.errorMessages.password = "Password should be at least 8 characters long!";
        }

    },
    // sign in function
    signIn(){
        this.validateInput()
        // if(this.errorMessages.length == 0){
        //     this.login({email:this.email, password:this.password})
        //         .then((response)=>{
        //             if(response.status == 200){
        //                 this.$router.push({name:'otpPage'})
        //             }
        //     })
        // }

    }

   }
}
</script>