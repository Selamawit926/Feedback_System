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
            <th class="py-2 px-4 border-b">Status</th>
            <th class="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in filteredUsers" :key="user.id">
            <td class="py-2 px-4 border-b">{{ user.name }}</td>
            <td class="py-2 px-4 border-b">{{ user.email }}</td>
            <td class="py-2 px-4 border-b">
              <span class="bg-green-500 text-white rounded py-1 px-2">{{ user.status }}</span>
            </td>
            <td class="py-2 px-4 border-b">
              <button class="bg-blue-500 text-white px-4 py-2 rounded mr-2" @click="editUser(user.id)">Edit</button>
              <button class="bg-red-500 text-white px-4 py-2 rounded" @click="deleteUser(user.id)">Delete</button>
            </td>
          </tr>
          <tr v-if="filteredUsers.length === 0">
            <td class="py-2 px-4 border-b" colspan="4">No users found.</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        users: [], // Array of user objects
        searchQuery: '', // Search query string
      };
    },
    computed: {
      filteredUsers() {
        // Filter users based on the search query
        return this.users.filter((user) =>
          user.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      },
    },
    methods: {
      fetchUsers() {
        // TODO: Fetch users from backend and populate the users array
      },
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
    mounted() {
      // Fetch users when the component is mounted
      this.fetchUsers();
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
  