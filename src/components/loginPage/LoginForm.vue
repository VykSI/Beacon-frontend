<template>

    <div class="container" id="container" >
        <div class="form-container sign-up">
            <form @submit.prevent="registerUser">
                <h1>Create Account</h1>
                
                <span>or use your email for registeration</span>
                <input type="text" placeholder="username" v-model="username">
                <input type="text" placeholder="Name" v-model="name">
                <input type="email" placeholder="Email" v-model="email">
                <input type="password" placeholder="Password" v-model="password">
                <input type="text" placeholder="YYYY-MM-DD" v-model="dob">
                <button>Sign Up</button>
            </form>
        </div>
        <div class="form-container sign-in">
            <form @submit.prevent="loginUser">
                <h1>Sign In</h1>
                
                <span>or use your email password</span>
                <input type="email" placeholder="Username" v-model="lusername">
                <input type="password" placeholder="Password" v-model='lpassword'>
                <a href="#">→ Forget Your Password? ←</a>
                <button @click="loginUser">Sign In</button>
            </form>
        </div>
        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button class="hidden" id="login">Sign In</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Hello, Friend!</h1>
                    <p>Register with your personal details to use all of site features</p>
                    <button class="hidden" id="register">Sign Up</button>
                </div>
            </div>
        </div>
    </div>

    

</template>

<script>
import axios from 'axios';
export default {
   mounted() {
    // Access the container, register button, and login button when the component is mounted
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // Add event listeners to the register and login buttons
    registerBtn.addEventListener('click', () => {
      container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
      container.classList.remove("active");
    });
  },
  methods: {
    registerUser(){
        axios.post('https://beacon-server.vercel.app/register', {
        username: this.username,
        password: this.password,
        name:this.name,
        email: this.email,
        dob:this.dob,
        role:"user"
      })
      .then(response => {
        if(response.status==201){
            alert('Account created successfully!');
        }
      })
      .catch(error => {
        console.error('Error registering user:', error);
    alert('Failed to create account. Please try again.');
      });
    },
  
    loginUser() {
        console.log(this.lusername);
     axios.post('https://beacon-server.vercel.app/login', {
    username: this.lusername,
    password: this.lpassword,
  })
  .then(response => {
    if (response.status === 200 && response.data.token) {
      // Store the JWT token in local storage
      localStorage.setItem('token', response.data.token);
      // Redirect or perform any other action on successful login
      // For example, you can redirect to another page:
      this.$router.push('/events');
    } else {
      // Handle invalid credentials
      console.log('Invalid username or password');
    }
  })
  .catch(error => {
    // Handle network errors or server errors
    console.error('Error logging in:', error);
  });
    }
}
}

</script>

<style scoped>
/* Add your component-specific styles here */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&display=swap');

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
}

body{
    background-color: #c9d6ff;
    background: linear-gradient(to right, #e2e2e2, #c9d6ff);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
}

.container{
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    position: relative;
    overflow: hidden;
    width: 100%;
    max-width: 100%;
    min-height: 480px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh; /* Adjust as necessary */
}

.form-container{
    position: absolute;
    top: 0;
    height: 100%;
    width:100%;
    transition: all 0.6s ease-in-out;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%; 
}
.container p{
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
}

.container span{
    font-size: 12px;
}

.container a{
    color: #333;
    font-size: 13px;
    text-decoration: none;
    margin: 15px 0 10px;
}

.container button{
    background-color: #512da8;
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
}

.container button.hidden{
    background-color: transparent;
    border-color: #fff;
}

.container form{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    height: 100%;
}

.container input{
    background-color: #eee;
    border: none;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    outline: none;
}



.sign-in{
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.active .sign-in{
    transform: translateX(100%);
}

.sign-up{
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
    transition: all 0.5s;
}

.container.active .sign-up{
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: move 0.6s;
}

@keyframes move{
    0%, 49.99%{
        opacity: 0;
        z-index: 1;
    }
    50%, 100%{
        opacity: 1;
        z-index: 5;
    }
}

.social-icons{
    margin: 20px 0;
}

.social-icons a{
    border: 1px solid #ccc;
    border-radius: 20%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 3px;
    width: 40px;
    height: 40px;
    transition: all 0.5s;
}

.social-icons a:hover{
    scale: 1.3;
    border: 1px solid #000;
}

.toggle-container{
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    border-radius: 150px 0 0 100px;
    z-index: 1000;
}

.container.active .toggle-container{
    transform: translateX(-100%);
    border-radius: 0 150px 100px 0;
}

.toggle{
    background-color: #512da8;
    height: 100%;
    background: linear-gradient(to right, #5c6bc0, #512da8);
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

.container.active .toggle{
    transform: translateX(50%);
}

.toggle-panel{
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

.toggle-left{
    transform: translateX(-200%);
}

.container.active .toggle-left{
    transform: translateX(0);
}

.toggle-right{
    right: 0;
    transform: translateX(0);
}

.container.active .toggle-right{
    transform: translateX(200%);
}
</style>
