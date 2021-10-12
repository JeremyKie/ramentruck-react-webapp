import { ramenConfig } from "./authConfig";

/**
 * Attaches a given access token to a Microsoft Graph API call. Returns information about the user
 */
export async function callRamenTruckService(accessToken) {
    const headers = new Headers();
    const bearer = `Bearer ${accessToken}`;

    headers.append("Authorization", bearer);

    const options = {
        method: "GET",
        headers: headers
    };
    console.log(options)
    return fetch(ramenConfig.ramenTruckEndpoint, options)
        .then(response => response.json())
        .catch(error => console.log(error));
}