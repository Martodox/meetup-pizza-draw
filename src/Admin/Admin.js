import React from "react";
import "./Admin.css";
import { useFirebase } from "../useFirebase";
import { FirebaseAuthConsumer, FirebaseAuthProvider } from "@react-firebase/auth";
import Login from "./Login";
import { Spinner, SpinnerSize } from "office-ui-fabric-react";
import Dashboard from "./DrawLottery/Dashboard";


function Admin() {

    const { api, config } = useFirebase();
    
    return (
        <div className="App">
            <FirebaseAuthProvider
                firebase={api}
                {...config}
            >
                <FirebaseAuthConsumer>
                    {({ isSignedIn, user, providerId }) => <div>
                        {!providerId && <Spinner size={SpinnerSize.large} />}
                        {providerId && !isSignedIn && <Login />}
                        {providerId && isSignedIn && <Dashboard user={user} />}

                    </div>}
                </FirebaseAuthConsumer>
            </FirebaseAuthProvider>
        </div>
    );

}

export default Admin;
