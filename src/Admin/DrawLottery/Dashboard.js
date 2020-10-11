import React, {useState} from 'react';
import {  Persona, PersonaSize, DefaultButton } from 'office-ui-fabric-react';
import { useFirebase } from '../../useFirebase';
import BlikModal from '../BlikModal/BlikModal';
import RemainingEntries from './RemainingEntries';
import Stats from './Stats';

const { api } = useFirebase();


function Dashboard({ user }) {
    const [currentUser, setCurrentUser] = useState(null);

    const logout = () => {
        api.auth().signOut()
    }
    const hideModal = () => {
        setCurrentUser(null);
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
            <RemainingEntries setCurrentUser={setCurrentUser} />
            {!!currentUser && <BlikModal hideModal={hideModal} currentUser={currentUser} />}
        </div>
    );
}

export default Dashboard;
