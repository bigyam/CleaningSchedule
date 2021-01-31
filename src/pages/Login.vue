<template>
    <v-container>
        <v-form ref="loginForm">
            <v-card elevation="2" outlined tile class="mx-auto m-12" max-width="40%">
                <v-img
                    id="profile-img"
                    src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
                    class="profile-img-card"
                />
                <v-card-title>Login</v-card-title>
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
                        required>
                    </v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-btn @click="handleLogin">Login</v-btn>
                </v-card-actions>
            </v-card>
        </v-form>
    </v-container>
</template>

<script>
import User from "../components/models/user";

export default {
    name: "Login",
    data() {
        return {
            valid: false,
            user: new User("", ""),
            loading: false,
            message: "",
            usernameRules: [],
            passwordRules: []
        };
    },
    computed: {
        loggedIn() {
            return this.$store.state.auth.status.loggedIn;
        },
    },
    created() {
        if (this.loggedIn) {
            this.$router.push("/profile");
        }
    },
    methods: {
        handleLogin() {
            this.usernameRules = [
                v => !!v || 'Username is required',
                v => v.length <= 10 || 'Username length must be less than 10 characters'
            ];
            this.passwordRules = [v => !!v || 'Password is required'];
            this.loading = true;
            if (this.$refs.loginForm.validate()) {
                if (this.user.username && this.user.password) {
                    this.$store.dispatch("auth/login", this.user).then(
                        () => {
                            this.$router.push("/profile");
                        },
                        (error) => {
                            this.loading = false;
                            this.message =
                                (error.response && error.response.data) ||
                                error.message ||
                                error.toString();
                        }
                    );
                }
            } else {
                this.loading = false;
                return;
            }
        },
    },
};
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
