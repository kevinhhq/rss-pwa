import {observable, action, decorate} from 'mobx';
import firebase from 'firebase';
import axios from "axios";

class UserStore {
    user = {isAnonymous: true, channels:{}, readNews:{}};
    state = {loading: true};

    fetchUserState() {
        this.state.loading = true;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
                this.user.channels = {};
                this.user.readNews = {};
                axios.get(`http://localhost:3000/api/user/${this.user.uid}`).then(
                    res => {
                        console.log(res);
                        this.user.channels = res.data.channel;
                        this.user.readNews = res.data.recentread;
                        this.state.loading = false;
                    }
                )
            } else {
                console.log("Not login");
                // No user is signed in.
                this.state.loading = false;
            }

        });
    }


    signUp(email, password) {
        this.error = {
            code: 0,
            message: "",
        };
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
            this.user = res.data;
        });
    }


    signIn(email, password) {
        this.error = {
            code: 0,
            message: "",
        };
        return firebase.auth().signInWithEmailAndPassword(email, password).then(res => {
            this.user = res.user;
            this.user.channels = {};
            this.user.readNews = {};
        }).then(res => {
            axios.get(`http://localhost:3000/api/user/${this.user.uid}`).then(
                res => {
                    this.user.channels = res.data.channel;
                    this.user.readNews = res.data.recentread;
                }
            )
        });
    }

    signOut() {
        this.error = {
            code: 0,
            message: "",
        };
        return firebase.auth().signOut().then(res => {
            this.user = {isAnonymous: true};
        }).catch(error => {
            this.state = error;
        });
    }
}
decorate(UserStore, {
    user: observable,
    state: observable,
    fetchUserState: action,
    signUp: action,
    signIn: action,
    signOut: action,
});

export default new UserStore()