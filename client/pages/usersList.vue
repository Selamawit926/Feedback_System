<template>
    <div class="container mx-auto p-4">
      <h2 class="text-2xl font-bold mb-4">User List</h2>
      <div class="flex justify-between items-center mb-4">
        <div></div>
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
            <th class="py-2 px-4 border-b">Name</th>
            <th class="py-2 px-4 border-b">Email</th>
           
            <th class="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in usersList" :key="user.id">
            <td class="py-2 px-4 border-b">{{ user.name }}</td>
            <td class="py-2 px-4 border-b">{{ user.email }}</td>
            
            <td class="py-2 px-4 border-b">
             <button class="bg-red-500 text-white px-4 py-2 rounded" @click="deleteUser(user.id)">Disable</button>
            </td>
          </tr>
          <!-- <tr v-if="users.length === 0">
            <td class="py-2 px-4 border-b" colspan="4">No users found.</td>
          </tr> -->
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
    import { mapGetters, mapActions } from 'vuex';
  export default {
    data() {
      return {
        usersList: [],
        searchQuery: '', // Search query string
      };
    },
    computed: {
        ...mapGetters('user', ['getUsers']),
        users() {
          
            return this.getUsers;
        }
        
    },
    async created() {
        this.usersList =await this.getAllUsers();
    },
    methods: {
        ...mapActions('user', ['getAllUsers']),
        searchUsers() {
            this.getAllUsers();
        }

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
  