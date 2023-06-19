const axios = require('axios');

const state = {
    feedbacks: [],
    feedback:{}
}

const getters ={
    getFeedback : state => state.feedback,
    getFeedbacks : state => state.feedbacks
}
const actions = {
    async fetchFeedbacks({commit}, id){
        try {
            const res = await axios.get(`http://localhost:5000/api/feedback/getFeedbacks/${id}`);
            console.log(res.data.feedbacks);
            commit('setFeedbacks',res.data.feedbacks);
            return res.data.feedbacks;
        }
        catch(err){
            return err.response.data;
        }
    },
    async fetchFeedback({commit}, id){
        try {
            const res = await axios.get(`http://localhost:5000/api/feedback/getFeedback/${id}`);
            commit('setFeedback',res.data.feedbacks);
            return res.data.feedbacks;
        }
        catch(err){
            return err.response.data;
        }
    },
    async addFeedback({commit},feedback){
        try {
            console.log("here",feedback.id)
            console.log(feedback);
            const res = await axios.post(`http://localhost:5000/api/feedback/addFeedback/${feedback.id}`, feedback.feedback)
            return res.status;
        } catch (error) {
            return err.response.data;
        }
    },
    async editFeedback({commit}, feedback){
        try {
            
            const res = await axios.post(`http://localhost:5000/api/feedback/editFeedback/${feedback.id}`,feedback.feedback);
            return res.status;

        } catch (error) {
            return error.response.data;
        }
    }
}

const mutations ={
    setFeedback : (state, feedback) => (state.feedback = feedback),
    setFeedbacks : (state, feedbacks) => (state.feedbacks = feedbacks),

}
export default{
    state,
    getters,
    actions,
    mutations

}