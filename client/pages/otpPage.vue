<template>
    <div class="flex justify-center px-20">
        <div class="bg-white shadow-md m-20 rounded mb-4 w-3/4 p-16">
      <div class="max-w-3xl mx-16 mt-10">
   
    <div class="mb-4">
      <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
        OTP
      </label>
      <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="email" placeholder="Otp" v-model="otp">
    </div>
   
    <div class="flex items-center justify-between">
      <button class="bg-blue-700 hover:bg-blue-dark text-white font-bold py-2 px-4 rounded" type="button">
      Submit
      </button>
      
    </div>
  </div>
</div>
</div>
</template>

<script>

export default {
    data(){
        return{
            otp:"",
            errorMessages:{}
        }
    },
    methods: {
        // validate otp
        validateInput(){
            this.errorMessages = {}
            if(this.otp === ""){
                this.errorMessages.otp = "OTP is required!";
            }
        },
        // submit otp
        submitOtp(){
            this.validateInput();
            console.log(otp)
            if(Object.keys(this.errorMessages).length === 0){
                // submit otp
            }
        }
    },
}
</script>