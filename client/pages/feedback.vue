<template>
    <div class="container mx-auto p-4">
        <div v-if="isModalVisible">
        <div
          @click="openAddModal"
          class="absolute bg-black opacity-70 inset-0 z-0"
        ></div>
        <div
          class="w-full max-w-lg p-3 relative mx-auto my-auto rounded-xl shadow-lg bg-white"
        >
          <div>
            <div class="text-center p-3 flex-auto justify-center leading-6">
                <h2 v-if="isEditModal"  class="text-2xl font-bold py-4">Edit Feedback</h2>
              <h2  v-else class="text-2xl font-bold py-4">Add Feedback</h2>
         
                <div class=" mx-16 mt-10">
            
                <div class="mb-4">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="title">
                    Title 
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="title" placeholder="Otp" v-model="editTitle">
                </div>
                <div class="mb-4">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="username">
                    Comment
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="username" type="email" placeholder="Otp" v-model="editComment">
                </div>
                <div class="mb-4">
                    <label class="block text-grey-darker text-sm font-bold mb-2" for="file-upload">
                        Upload File
                    </label>
                    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker" id="file-upload" type="file">
                </div>
              
            </div>

            </div>
            <div class="p-3 mt-2 text-center space-x-4 md:block">
              <button @click="saveFeedback()"
                class="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-md hover:shadow-lg hover:bg-gray-100"
              >
                Save
              </button>
              <button
                @click="openAddModal"
                class="mb-2 md:mb-0 bg-purple-500 border border-purple-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-md hover:shadow-lg hover:bg-purple-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <h2 class="text-2xl font-bold mb-4">Feedbacks List</h2>
      <div class="flex justify-between items-center mb-4">
        <div>
            <button @click="openAddModal" class="btn bg-blue-500 text-white px-4 py-2 rounded " type="button">
                Add Feedback
            </button>
         </div>
        <div class="flex items-end">
          <input
            type="text"
            class="border border-gray-300 rounded p-2 mr-2"
            placeholder="Search..."
            v-model="searchQuery"
          />
          <button class="bg-blue-500 text-white px-4 py-2 rounded" @click="searchUsers">Search</button>
        </div>
         </div>
      <table class="w-full">
        <thead>
          <tr>
            <th class="py-2 px-4 border-b">Title</th>
            <th class="py-2 px-4 border-b">comment</th>
            <th class="py-2 px-4 border-b">Created time</th>
           
            <th class="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feedback in feedbackList" :key="feedback.id">
            <td class="py-2 px-4 border-b">{{ feedback.title }}</td>
            <td class="py-2 px-4 border-b">{{ feedback.comment }}</td>
            <td class="py-2 px-4 border-b">{{ feedback.createdAt }}</td>
            
            <td class="py-2 px-4 border-b">
             <button class="bg-green-500 text-white px-4 py-2 rounded" @click="openEditModal(feedback.id)">Edit</button>
            </td>
          </tr>
         
        </tbody>
      </table>
 
    </div>
  </template>
  
  <script>
    import { mapGetters, mapActions } from 'vuex';
 
  export default {
   
    data() {
      return {
        userId:null,
        feedbackList: [],
        searchQuery: '', // Search query string
        showModal : false,
        isEditModal: false,
        editComment: '',
        editTitle: '',
        feedbackId: null
      };
    },
   
    computed: {
        ...mapGetters('feedback', ['getfeedbacks','getFeedback']),
        feedbacks() {
          
            return this.getfeedbacks;
        },
        isModalVisible() {
            return this.showModal;
        }
        
    },
   
    async created() {
        this.userId = this.$route.query.id;
        this.feedbackList = await this.fetchFeedbacks(this.userId);
    },
    methods: {
        ...mapActions('feedback', ['fetchFeedbacks', 'fetchFeedback', 'editFeedback', 'addFeedback']),
        searchUsers() {
            this.fetchFeedbacks(this.userId);
        },

        openEditModal(id){
           
            this.isEditModal = true;
            this.feedbackId = id;
            const feedback = this.fetchFeedback(id);
            this.editComment = feedback.comment;
            this.editTitle = feedback.title;
            // call edit api from stpre

        },
        openAddModal(){
            this.showModal = !this.showModal;
 
        },
        async saveFeedback(){
            console.log(this.editComment);
            console.log(this.editTitle);
            console.log(this.feedbackId);
            if (this.isEditModal){
                const feedback = {
                    id: this.feedbackId,
                    comment: this.editComment,
                    title: this.editTitle
                }

                await this.editFeedback(feedback, this.userId);
               
            }
            else{
                const feedback = {
                    comment: this.editComment,
                    title: this.editTitle
                }
                console.log("on save",feedback);
                console.log("on save",this.userId);
                await this.addFeedback({feedback:feedback, id: this.userId});
                console.log("success")
            }
            // call edit api from store
            this.isEditModal = false;
            this.showModal = false;
        },
     

    },
    
  }
  </script>
  
  <style>
  table {
    border-collapse: collapse;
  }
  
  th,
  td {
    border: 1px solid #ddd;
  }
  </style>
  