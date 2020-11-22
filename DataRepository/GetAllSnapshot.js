import React from 'react';
import { useState } from 'react';
import firebase from "../../firebase/firebase";
import { Picker } from 'react-native';
var a
export default   function GetAllSnapshot(cName) {
   
  

    a = firebase.db.collection(cName)
    return a;
    
    
}