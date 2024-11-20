import { useEffect, useState } from 'react';
import { auth } from "./firebase/firebase"
import { onAuthStateChanged } from 'firebase/auth';

export const useUserId = () => {
const [userId, setUserId] = useState(null);

useEffect(() => {
const unsubscribe = onAuthStateChanged(auth, user => {
    if (user) {
    // User is signed in, get the user ID (UID)
    setUserId(user.uid);
    } else {
    // User is not signed in, set userId to null
    setUserId(null);
    }
});

// Cleanup subscription on unmount
return () => unsubscribe();
}, []);

return userId;
};