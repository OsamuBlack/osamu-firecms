import { useMemo, useState } from "react";

import { GoogleAuthProvider } from "firebase/auth";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";

import "typeface-rubik";
import "@fontsource/ibm-plex-mono";

import {
  Authenticator,
  CircularProgressCenter,
  createCMSDefaultTheme,
  FirebaseAuthController,
  FirebaseLoginView,
  FireCMS,
  ModeControllerProvider,
  NavigationRoutes,
  Scaffold,
  SideDialogs,
  SnackbarProvider,
  useBuildModeController,
  useFirebaseAuthController,
  useFirebaseStorageSource,
  useFirestoreDataSource,
  useInitialiseFirebase,
  useValidateAuthenticator,
} from "firecms";
import { firebaseConfig } from "./firebase-config";
import DynamicCollections from "./collections/dynamicCollections";
import { AppProvider } from "./lib/context";
import { useDataEnhancementPlugin } from "@firecms/data_enhancement";
import { User, usersCollection } from "./collections/users";

const DEFAULT_SIGN_IN_OPTIONS = [GoogleAuthProvider.PROVIDER_ID];

/**
 * This is an example of how to use the components provided by FireCMS for
 * a better customisation.
 * @constructor
 */
export default function App() {
  const signInOptions = DEFAULT_SIGN_IN_OPTIONS;
  const dataEnhancementPlugin = useDataEnhancementPlugin({
    // Paths that will be enhanced
    getConfigForPath: ({ path }) => {
      return true;
    },
  });

  const {
    firebaseApp,
    firebaseConfigLoading,
    configError,
    firebaseConfigError,
  } = useInitialiseFirebase({ firebaseConfig });

  const authController: FirebaseAuthController = useFirebaseAuthController({
    firebaseApp,
    signInOptions,
  });

  const dataSource = useFirestoreDataSource({
    firebaseApp,
    // You can add your `FirestoreTextSearchController` here
  });

  const storageSource = useFirebaseStorageSource({ firebaseApp });

  const modeController = useBuildModeController();
  const theme = useMemo(
    () => createCMSDefaultTheme({ mode: modeController.mode }),
    [modeController.mode]
  );
  const [collectionsLoading, setCollectionsLoading] = useState(true);
  const { authLoading, canAccessMainView, notAllowedError } =
    useValidateAuthenticator({
      authController,
      authentication: async (props) => {
        if (props.user?.uid == null) return false;
        if (
          props.user?.metadata.creationTime ==
          props.user?.metadata.lastSignInTime
        ) {
          // New User - Add to users collection
          await props.dataSource.saveEntity({
            path: "users",
            collection: usersCollection,
            entityId: props.user.uid,
            values: {
              identifier: props.user.email,
            },
            status: "new",
          });

          props.authController.authError =
            "You do not have permissions to access this site.";

          // Do not allow cms login
          return false;
        }
        // User exists - Check role
        else {
          const res = props.dataSource.fetchEntity({
            path: "users",
            collection: usersCollection,
            entityId: props.user.uid,
          });
          const user = await res;
          if (user.values?.isAdmin) {
            props.authController.setExtra({
              role: "admin",
            });
            return true;
          } else if (user.values?.isEditor) {
            props.authController.setExtra({
              role: "editor",
            });
            return true;
          }
        }
        props.authController.authError =
          "You do not have permissions to access this site.";
        return false;
      },
      dataSource,
      storageSource,
    });

  if (configError) {
    return <div> {configError} </div>;
  }

  if (firebaseConfigError) {
    return (
      <div>
        It seems like the provided Firebase config is not correct. If you are
        using the credentials provided automatically by Firebase Hosting, make
        sure you link your Firebase app to Firebase Hosting.
      </div>
    );
  }

  if (firebaseConfigLoading || !firebaseApp) {
    return <CircularProgressCenter />;
  }

  return (
    <Router>
      <SnackbarProvider>
        <ModeControllerProvider value={modeController}>
          <FireCMS
            plugins={[dataEnhancementPlugin]}
            authController={authController}
            collections={
              canAccessMainView
                ? (props) => DynamicCollections(props, setCollectionsLoading)
                : []
            }
            dataSource={dataSource}
            storageSource={storageSource}
            entityLinkBuilder={({ entity }) =>
              `https://console.firebase.google.com/project/${firebaseApp.options.projectId}/firestore/data/${entity.path}/${entity.id}`
            }
          >
            {({ context, loading }) => {
              let component;
              if (loading || authLoading) {
                component = <CircularProgressCenter />;
              } else if (!canAccessMainView) {
                component = (
                  <FirebaseLoginView
                    allowSkipLogin={false}
                    signInOptions={signInOptions}
                    firebaseApp={firebaseApp}
                    authController={authController}
                    notAllowedError={notAllowedError}
                  />
                );
              } else if (collectionsLoading) {
                component = <CircularProgressCenter />;
              } else {
                component = (
                  <AppProvider>
                    <Scaffold
                      logo={import.meta.env.VITE_SITELOGO}
                      name={"Edraak Partners Program"}
                    >
                      <NavigationRoutes />
                      <SideDialogs />
                    </Scaffold>
                  </AppProvider>
                );
              }

              return (
                <ThemeProvider theme={theme}>
                  <CssBaseline />
                  {component}
                </ThemeProvider>
              );
            }}
          </FireCMS>
        </ModeControllerProvider>
      </SnackbarProvider>
    </Router>
  );
}
