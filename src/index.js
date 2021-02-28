import { navigate } from "custom-card-helpers"

// There is probably a better way to grab the config, and this will probrably break but ¯\_(ツ)_/¯
// Grab the lovelace configuration out of the DOM
const lovelaceConfiguration = document.querySelector("home-assistant").shadowRoot.querySelector("home-assistant-main").shadowRoot.querySelector("ha-panel-lovelace").lovelace.config;

// Grab home assistant to retrieve states and other values
let homeAssistant = null;
document.querySelector("home-assistant").provideHass({
    /**
     * @param {any} value
     */
    set hass(value) {
        homeAssistant = value;
    }
});

function checkRedirect() {
    // Check if configuration is present
    if (typeof lovelaceConfiguration.zone_redirect !== 'undefined') {
        // Loop over each defined redirect
        lovelaceConfiguration.zone_redirect.forEach(redirect => {
            // Loop over each user affected by this redirect
            redirect.users.forEach(user => {
                // Does this redirect contain the current logged in user
                if (homeAssistant.states[user].attributes.user_id == homeAssistant.user.id) {
                    // User match for this redirect definition, check if they are in any of these zones
                    redirect.zones.forEach(zone => {
                        if (homeAssistant.states[user].state.toLowerCase() == homeAssistant.states[zone].attributes.friendly_name.toLowerCase()) {
                            // Navigate as the user is in this zone
                            navigate(window, redirect.path);
                        }
                    });
                }
            });
        });
    }
}

// Try to detect focus gain on the app (which has previously been opened, so the initial check has happened in the past and wouldn't run again)
const timeout = 20000;
let lastTime = (new Date()).getTime();
setInterval(function() {
    let currentTime = (new Date()).getTime();
    if (currentTime > (lastTime + timeout + 2000)) {
        checkRedirect();
    }
    lastTime = currentTime;
}, timeout);

checkRedirect();