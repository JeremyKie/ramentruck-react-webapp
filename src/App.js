import React, { useState } from "react";

import { AuthenticatedTemplate, UnauthenticatedTemplate, useMsal } from "@azure/msal-react";
import Button from "react-bootstrap/Button";

import { PageLayout } from "./components/PageLayout";
import { ProfileData } from "./components/ProfileData";
import { loginRequest } from "./authConfig";
import { RamenOrders } from "./components/RamenOrders";
import { callMsGraph } from "./graph";
import { callRamenTruckService } from "./ramen";

function ProfileContent() {
  const { instance, accounts } = useMsal();
  const [graphData, setGraphData] = useState(null);
  const [ramenData, setRamenData] = useState(null);

  const name = accounts[0] && accounts[0].name;

  function RequestProfileData() {
      const request = {
          ...loginRequest,
          account: accounts[0]
      };

      // Silently acquires an access token which is then attached to a request for Microsoft Graph data
      instance.acquireTokenSilent(request).then((response) => {
          callMsGraph(response.accessToken).then(response => setGraphData(response));
      }).catch((e) => {
          instance.acquireTokenPopup(request).then((response) => {
              callMsGraph(response.accessToken).then(response => setGraphData(response));
          });
      });
  }

  function RequestRamenData() {
    const request = {
      ...loginRequest,
      account: accounts[0]
    };

    instance.acquireTokenSilent(request).then((response) => {
      callRamenTruckService(response.accessToken).then(response => setRamenData(response));
    }).catch((e) => {
      instance.acquireTokenPopup(request).then((response) => {
        callRamenTruckService(response.accessToken).then(response=> setRamenData(response));
      });
    });
  }

  return (
      <>
          <h5 className="card-title">Welcome {name}</h5>
          {graphData ? 
              <ProfileData graphData={graphData} />
              :
              <Button variant="secondary" onClick={RequestProfileData}>Request Profile Information</Button>
          }
          {ramenData ?
              <RamenOrders ramenData={ramenData} />
              :
              <Button variant="secondary" onClick={RequestRamenData}>Request Ramen Orders</Button>
          }
      </>
  );
};


function App() {
  return (
    <PageLayout>
      <AuthenticatedTemplate>
        <ProfileContent />
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <p>You are not signed in! Please sign in.</p>
      </UnauthenticatedTemplate>
    </PageLayout>
  );
}

export default App;