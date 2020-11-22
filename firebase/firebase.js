import app from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import firebaseConfig from "./config";

class Firebase {
  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
    this.db = app.firestore();
  }

    async register(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    await newUser.user.updateProfile({
        displayName: name,
        
    });
      return newUser;
  }

    async registerAdmin(name, email, password) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    const created =  await newUser.user.updateProfile({
        displayName: name,
        photoURL: "12"


    });
        console.log(created);
        await this.auth.signOut();
  }

  async login(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
    }
    async loginAdmin(email, password) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }

  async logout() {
    debugger
    await this.auth.signOut();
    
  }

  async resetPassword(email) {
    await this.auth.sendPasswordResetEmail(email);
  }
}

const firebase = new Firebase();
export default firebase;
