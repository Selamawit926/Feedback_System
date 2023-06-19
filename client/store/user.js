// call from .env file

import dotenv from 'dotenv';
dotenv.config();

const axios = require('axios')
const { API_URL } = process.env;

const state = {
    user:{},
    users:[]
}

const getters = {
    getUser: state => state.user,
    getUsers: state => state.users
}

const actions = {

    async register({commit},user){
        try{
          
            const res = await axios.post('http://localhost:5000/api/user',user);
      
            if (res.status == 200){

                commit('setUser',res);
            }
            return res.status;
       
        }catch(err){
            // throw err;
            return err;
        }
    },
    async login({commit},user){
        try{
           
            const res = await axios.post('http://localhost:5000/api/user/login',user);
          
            return res;

        }catch(err){
            // throw err;
            return err.response;
        }
    },
    // verifyOTP
    async verifyOtp({commit},otpInfo){
        try {
         
            const res = await axios.post(`http://localhost:5000/api/user/verify-otp/${otpInfo.id}`,otpInfo);
            return res.status;

        } catch (error) {
            return error.response.data;
        }
    },
    // forgotPassword
    // all users
    async getAllUsers({commit}){
        try {
            const res = await axios.get('http://localhost:5000/api/user/allUsers');
     
            commit('setUser',res.data.users);
            return res.data.users;

        } catch (error) {
            return error.response.data;
        }
    },

}

const mutations = {
    setUser: (state,user) => (state.user = user),
    setUsers: (state,users) => (state.users = users)
}

export default {
    state,
    getters,
    actions,
    mutations
}