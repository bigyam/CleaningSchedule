<template>
    <v-container>
        <v-form ref="registerForm">
            <v-card elevation="2" outlined tile class="mx-auto m-12" max-width="40%">
                <v-img
                    id="profile-img"
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    class="profile-img-card"
                />
                <v-card-title>Register</v-card-title>
                <v-card-text>
                    <v-text-field
                        v-model="user.username"
                        :rules="usernameRules"
                        label="Username"
                        required></v-text-field>
                    <v-text-field 
                        v-model="user.password" 
                        label="Password"
                        :rules="passwordRules"
                        required/>
                    <v-text-field
                        v-model="user.email"
                        :rules="emailRules"
                        label="Email"
                        required/>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="handleRegister">Register</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
import User from '../components/models/user';

export default {
    name: 'Register',
    data() {
        return {
            user: new User('', '', ''),
            submitted: false,
            successful: false,
            message: '',
            usernameRules: [],
            passwordRules: [],
            emailRules: []
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        }
    },
    mounted() {
        if (this.loggedIn) {
            this.$router.push('/profile');
        }
    },
    methods: {
        handleRegister() {
            this.usernameRules = [
                v => !!v || 'Username is required',
                v => v.length <= 10 && v.length >= 3 || 'Username length must be between 3 and 10 characters inclusive'
            ];
            this.passwordRules = [
                v => !!v || 'Password is required'
            ];
            this.emailRules = [
                v => !!v || 'Email is required'
            ];
            this.message = '';
            this.submitted = true;
            let self = this;
            setTimeout(function() {            
                if (self.$refs.registerForm.validate()) {
                    if (self.user.username && self.user.password && self.user.email) {
                        self.$store.dispatch('auth/register', self.user).then(
                            () => {
                                self.successful = true;
                                self.$router.push("/login");
                            },
                            error => { //TODO: error is rando code.  not used
                                self.message =
                                    (error.response && error.response.data) ||
                                    error.message ||
                                    error.toString();
                                self.successful = false;
                            }
                        );
                    }
                }
            });
        }
                
    }
}
</script>

<style scoped>
    .profile-img-card {
        width: 96px;
        height: 96px;
        margin: 0 auto 10px;
        display: block;
        -moz-border-radius: 50%;
        -webkit-border-radius: 50%;
        border-radius: 50%;
    }
</style>