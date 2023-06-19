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
          <tr v-for="user in users" :key="user.id">
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
      
        searchQuery: '', // Search query string
      };
    },
    computed: {
        ...mapGetters(['getUsers']),
        users() {
        return this.getUsers;
        }
    },
    mounted() {
        // Fetch the list of users when the component is mounted
        this.getAllUsers();
    },
    methods: {
        ...mapActions(['getAllUsers']),
       
      searchUsers() {
        // Perform search based on the searchQuery
        // Here you can call the backend API to search for users
        // and update the users array accordingly
      },
      editUser(userId) {
        // TODO: Handle editing user logic
      },
      deleteUser(userId) {
        // TODO: Handle deleting user logic
      },
    },
    
  };
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
  