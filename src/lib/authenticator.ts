import { useCallback } from "react";
import { User as FirebaseUser } from "firebase/auth";
import { Authenticator } from "firecms";
import { usersCollection } from "../collections/users";
import { useDataEnhancementPlugin } from "@firecms/data_enhancement";

const CustomAuthenticator: Authenticator<FirebaseUser> = useCallback(
  async (props) => {
    if (props.user?.uid == null) return false;
    if (
      props.user?.metadata.creationTime == props.user?.metadata.lastSignInTime
    ) {
      // New User - Add to users collection
      props.dataSource.saveEntity({
        path: "users",
        collection: usersCollection,
        entityId: props.user.uid,
        values: {
          identifier: props.user.email,
        },
        status: "new",
      });

      // Do not allow cms login
      return false;
    }
    // User exists - Check role
    else {
      const user = props.dataSource.fetchEntity({
        path: "users",
        collection: usersCollection,
        entityId: props.user.uid,
      });
      if (await user.then((doc) => doc.values?.role == "admin")) return true;
    }
    return false;
  },
  []
);
export default CustomAuthenticator;

export const dataEnhancementPlugin = useDataEnhancementPlugin({
  // Paths that will be enhanced
  getConfigForPath: ({ path }) => {
    return true;
  },
});
