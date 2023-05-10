import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';
import { 
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
 } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCK01-MsCGC5nAZpbP9GIn4C9xyR9Ndx1w",
    authDomain: "lann-clothing-db.firebaseapp.com",
    projectId: "lann-clothing-db",
    storageBucket: "lann-clothing-db.appspot.com",
    messagingSenderId: "353560699064",
    appId: "1:353560699064:web:835cf48bbd70a046d2d44d"
  };
  
  const firebaseApp = initializeApp(firebaseConfig);

  const gprovider = new GoogleAuthProvider();

  gprovider.setCustomParameters({
    prompt: 'select_account',
  });

  export const auth = getAuth();
  export const singInWithGooglePopup = () => signInWithPopup(auth, gprovider);

  export const db = getFirestore();

  export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey);
    const batch = writeBatch(db);  

    objectsToAdd.forEach((object) => {
      const docRef = doc(collectionRef, object.title.toLowerCase());
      batch.set(docRef, object); 
    });

    await batch.commit();
    console.log('done');
  };

  export const getCategoriesAndDocments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
      const { title, items } = docSnapshot.data();
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});

    return categoryMap;
    


  }

  export const createUserDocumentFromAuth = async (userAuth, additionalInfo = {}) => {
    if(!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    // console.log(userSnapshot);
    // console.log(userSnapshot.exists());

    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInfo,
            });
        } catch (error){
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
    // if user daya does not exist
    // create/set the document with the data from userAuth in my collection

    //if user data exist


    //return userDocRef
  };

  export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return
    return await createUserWithEmailAndPassword(auth, email, password)
  };

  export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if(!email || !password) return
    return await signInWithEmailAndPassword(auth, email, password)
  };

  export const signOutUser = async () => await signOut(auth);

  export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

