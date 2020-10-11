import React from 'react';
import {  Persona, PersonaSize, DefaultButton } from 'office-ui-fabric-react';
import { useFirebase } from '../../useFirebase';
import RemainingEntries from './RemainingEntries';
import Stats from './Stats';

const { api } = useFirebase();


function Dashboard({ user }) {

    const logout = () => {
        api.auth().signOut()
    }

    return (
        <div>
            <div className="Flex_row">
                <Persona
                    imageUrl={user.photoURL}
                    text={user.displayName}
                    secondaryText={user.email}
                    size={PersonaSize.size56}
                />
                <DefaultButton text="Logout" onClick={logout} />
            </div>
            <Stats />
            <RemainingEntries />
        </div>
    );
}

export default Dashboard;
