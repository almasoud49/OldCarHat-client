import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import {  createContext, useEffect, useState } from "react";
import app from "../firebase/firebase.config";
import useAxiosPublic from "../hooks/useAxiosPublic"

export const AuthContext = createContext(null)
const auth = getAuth(app);


const AuthProvider = (  {children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (profileData) => {
		setLoading(true);
		return updateProfile(auth.currentUser, profileData);
	};

    const logOut = () => {
		setLoading(true)
		return signOut(auth);
	};

    useEffect(()=>{
        const unsubscribe = onAuthStateChanged(auth,currentUser =>{
            setUser(currentUser);
            if(currentUser){
                const userInfo = {uid:currentUser.uid};
                axiosPublic.post("/jwt", userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false);
                    }
                })
            }else{
                localStorage.removeItem('access-token');
                setLoading(false);
            }
            
        });
        return ()=> {
            unsubscribe();
        }
    },[axiosPublic])


    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        updateUserProfile,
        logOut
    }

    return (
        <AuthContext.Provider value={authInfo}>
              {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;