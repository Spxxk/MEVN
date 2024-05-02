<template>
  <div class="columns is-centered section">
    <div class="column is-half">
      <div class="login-container card">
        <header class="card-header has-background-danger">
          <h1 class="subtitle" style="padding-top: 10px; padding-left: 10px; color: black">Login</h1>
        </header>
        <form @submit.prevent="login" style="padding-top: 10px">
          <div class="form-group">
            <label for="email"><strong>Email</strong></label>
            <input type="email" id="email" v-model="email" required>
          </div>
          <div class="form-group">
            <label for="password"><strong>Password</strong></label>
            <input type="password" id="password" v-model="password" required>
          </div>
          <button type="submit" class="has-background-danger" style="color: black">Login</button>
        </form>
        <p v-if="loginError" class="error-message">{{ loginError }}</p>
      </div>
    </div>
  </div>
</template>

  
  <script>
  import { mapActions } from 'vuex';

  export default {
    data() {
      return {
        email: '',
        password: '',
        loginError: null
      };
    },
    methods: {
      ...mapActions(['loginUser']),
      async login() {
        try {
          
          // await this.loginUser({ email: this.email, password: this.password });
          await this.$store.dispatch('loginUser', { email: this.email, password: this.password });
          console.log(this.$store.state.user.email);

          // If login successful, redirect to dashboard or desired page
          this.$router.push({ name: 'home' });
        } catch (error) {
          console.log(error);
          this.loginError = 'Failed to login. Please check your credentials and try again.';
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .login-container {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .form-group {
    margin-bottom: 15px;
  }
  
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .error-message {
    color: red;
  }
  </style>
  