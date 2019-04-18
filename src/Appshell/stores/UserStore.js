import {observable, action, decorate} from 'mobx';
import firebase from 'firebase';

class UserStore {
    user = {isAnonymous: true};
    state = {loading: false};


    fetchUserState() {
        this.state.loading = true;
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
            } else {
                console.log("Not login");
                // No user is signed in.
            }
            this.state.loading = false;
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
            console.log(res.user);
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