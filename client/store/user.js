// call from .env file

import dotenv from 'dotenv';
dotenv.config();

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
            const res = await axios.post(`${API_URL}/api/user`,user);
            commit('setUser',res.data);
            return res.data;
        }catch(err){
            // throw err;
            return err.response.data;
        }
    },
    async login(user){
        try{
            const res = await axios.post(`${API_URL}/api/user/login`,user);
            
            return res.status;

        }catch(err){
            // throw err;
            return err.response.data;
        }
    },
    // verifyOTP
    async verifyOTP(otp,id){
        try {
            
            const res = await axios.post(`${API_URL}/api/user/verify-otp/${id}`,otp);
            return res.status = 200;

        } catch (error) {
            return error.response.data;
        }
    },
    // forgotPassword
    // all users
    async getAllUsers({commit}){
        try {
            const res = await axios.get(`${API_URL}/api/user/allUsers`);
            commit('setUser',res.data);
            return res;

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