const fetch = require('cross-fetch');
const date = new Date();

// Set these parameters
var district_id = 395
// var age = 18  // Can be either 18 or 45
var age = 45  // Can be either 18 or 45

// First check state_id: https://cdn-api.co-vin.in/api/v2/admin/location/states
// Then check district_id: https://cdn-api.co-vin.in/api/v2/admin/location/districts/21

if (date.getDate() > 9) {
    var today = `${date.getDate()}-0${(date.getMonth()) + 1}-${date.getFullYear()}`
} else {
    var today = `0${date.getDate()}-0${(date.getMonth()) + 1}-${date.getFullYear()}`
}

const url = `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=${district_id}&date=${today}`

async function fetchit() {
    fetch(url)
        .then(res => {
            if (res.status >= 400) {
                throw new Error("Bad response from server");
            }
            return res.json();
        })
        .then(data => {
            var payload = data.sessions
            // console.log(payload)
            let i = 0
            for (let batchh of payload) {
                if (data.sessions[i].available_capacity == 0) {
                    // console.log(`No vaccine available at ${data.sessions[i].name}`)
                } else if (data.sessions[i].available_capacity > 0 && data.sessions[i].min_age_limit == age) {
                    console.log(`Vaccine now available at ${data.sessions[i].name}. Number of vaccines available is ${data.sessions[i].available_capacity}`)
                }
                i++
            }

        })
        .catch(err => {
            console.error(err);
        });
};

fetchit()