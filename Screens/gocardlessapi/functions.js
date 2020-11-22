import axios from 'axios';

export default function createNewCustomer(
    email,
    given_name,
    family_name,
    address_line1,
    address_line2,
    city,
    postal_code,
    country_code,
    UserId 
) {
    console.log("in functions")
    axios.post('https://us-central1-mm-burial.cloudfunctions.net/createCustomer', null, {
        params: {
            email: email,
            given_name: given_name,
            family_name: family_name,
            address_line1: address_line1,
            address_line2: address_line2,
            city: city,
            postal_code: postal_code,
            country_code: country_code,
            UserId: UserId 
        }
    })
        .then(function (response) {
            return response
        })
        .catch(function (error) {
            return error;
        });
};