import { LogLevel } from "@azure/msal-browser"

export const msalConfig = {
    auth: {
        clientId: '9e973ab9-4e90-43ae-94bb-cf1fd44a5f61',
        authority: 'https://login.microsoftonline.com/7ba9c958-eedf-4ac5-884b-470b3765ec9e/',
        redirectUri: 'http://localhost:3000'
    },
    cache: {
      cacheLocation: "sessionStorage", // This configures where your cache will be stored
      storeAuthStateInCookie: false, // Set this to "true" if you are having issues on IE11 or Edge
    },
    system: {
        loggerOptions: {
            loggerCallback: (level, message, containsPii) => {
                if (containsPii) {
                    return;
                }
                switch (level) {
                    case LogLevel.Error:
                        console.error(message);
                        break;
                    case LogLevel.Info:
                        console.info(message);
                        break;
                    case LogLevel.Verbose:
                        console.debug(message);
                        break;
                    case LogLevel.Warning:
                        console.warn(message);
                        break;
                    default:
                        console.log(message);
                }
            }
        }
    }
  };
  
  // Add scopes here for ID token to be used at Microsoft identity platform endpoints.
  export const loginRequest = {
   scopes: ["User.Read"]
  };
  
  // Add the endpoints here for Microsoft Graph API services you'd like to use.
  export const graphConfig = {
      graphMeEndpoint: "https://graph.microsoft.com/v1.0/me"
  };

  export const ramenConfig = {
    ramenTruckEndpoint: "http://localhost:8080/ramen-truck-service/v1/orders"
  }