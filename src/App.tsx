import { useCallback } from "react";

import { useDataEnhancementPlugin } from "@firecms/data_enhancement";

import { User as FirebaseUser } from "firebase/auth";
import { Authenticator, FirebaseCMSApp } from "firecms";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

import { firebaseConfig } from "./firebase-config.ts";
import { usersCollection } from "./collections/users.tsx";
import { initializeApp } from "firebase/app";
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { pageCollection } from "./collections/pages.tsx";
import { AppProvider } from "./lib/context.tsx";
import { settingsCollection } from "./collections/settings.tsx";

export default function App() {
  const myAuthenticator: Authenticator<FirebaseUser> = useCallback(
    async ({ user, authController }) => {
      if (user?.uid == null) return false;
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const collectionRef = collection(db, "users");
      const docRef = doc(collectionRef, user?.uid);
      if (user?.metadata.creationTime == user?.metadata.lastSignInTime) {
        // New User - Add to users collection
        await setDoc(docRef, {
          identifier: user?.email,
          role: "user",
        });

        // Do not allow cms login
        return false;
      }
      // User exists - Check role
      else if (await getDoc(docRef).then((doc) => doc.data()?.role != "admin"))
        return false;
      return true;
    },
    []
  );

  const dataEnhancementPlugin = useDataEnhancementPlugin({
    // Paths that will be enhanced
    getConfigForPath: ({ path }) => {
      return true;
    },
  });

  return (
    // Wrapin app with the Context provider
    <AppProvider>
      <FirebaseCMSApp
        name={"Flow Apps"}
        plugins={[dataEnhancementPlugin]}
        authentication={myAuthenticator}
        collections={[pageCollection, usersCollection, settingsCollection]}
        firebaseConfig={firebaseConfig}
      />
    </AppProvider>
  );
}
