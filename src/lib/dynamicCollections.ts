import { AuthController, DataSource, EntityCollection, User } from "firecms";
import { usersCollection } from "../collections/users";
import { settingsCollection } from "../collections/settings";
import { formResponsesCollections } from "../collections/formResponses";
import { pageCollection } from "../collections/pages";
import { forms } from "../collections/forms";
import { recordCollection } from "../collections/recordsCollection";

export const dynamicCollections = async (props: {
  user: User;
  authController: AuthController;
  dataSource: DataSource;
}, setLoading: (loading: boolean) => void) => {
  const collections: EntityCollection[] = [
    pageCollection,
    forms
  ];

  const formCollections = await formResponsesCollections(props);

  formCollections.forEach((collection) => {
    collections.push(collection)
  })

  if (props.authController.extra?.role === "admin") {
    collections.push(usersCollection);
    collections.push(settingsCollection);
    collections.push(recordCollection)
  }

  setLoading(false)

  return collections;
}