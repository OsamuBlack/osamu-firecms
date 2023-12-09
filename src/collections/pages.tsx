import {
  buildCollection,
  buildEntityCallbacks,
  buildProperty,
  EntityReference,
  KeyValueFieldBinding,
  MapPropertyPreview,
  StringPropertyPreview,
  useDataSource,
} from "firecms";
import { localeCollection } from "./locales.tsx";
import Button from "@mui/material/Button";
import { settingsCollection } from "./settings.tsx";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config.ts";
import {
  deleteField,
  doc,
  getDoc,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { generateURI } from "../lib/generateUri.tsx";
import { pageIdSlugMapped } from "../lib/pageIdSlugMapped.tsx";

// function generateSlug(title: string) {
//   return title
//     .toLowerCase()
//     .replace(/ /g, "-")
//     .replace(/[^a-zA-Z0-9-]/g, "");
// }

export type Page = {
  title: string;
  slug: string;
  // uri: string;
  // parentUri: string;
  status: string;
  tags: string[];
  category: string;
  content: object;
  metadata: object;
  parent: EntityReference;
  dateCreated: Date;
  dateUpdated: Date;
};

export const pageCollection = buildCollection<Page>({
  name: "Pages",
  singularName: "Page",
  path: "pages",
  icon: "Article",
  group: "Site Design",
  customId: false,
  permissions: ({ authController, user }) => ({
    read: true,
    edit: true,
    create: true,
    delete: true,
  }),
  subcollections: [localeCollection],
  properties: {
    title: buildProperty({
      name: "Title",
      validation: { required: true },
      dataType: "string",
      // Field: (props) => {
      //   const parentUri = props.context.values.parentUri;
      //   return (
      //     <TextFieldBinding
      //       {...props}
      //       setValue={(e) => {
      //         const slug = generateSlug(e);
      //         if (e) {
      //           props.setFieldValue("slug", slug);
      //           props.setFieldValue(
      //             "uri",
      //             parentUri ? parentUri + "/" + slug : "/" + slug
      //           );
      //         } else {
      //           props.setFieldValue("slug", "");
      //           props.setFieldValue("uri", parentUri ? parentUri + "/" : "/");
      //         }
      //         props.setValue(e);
      //       }}
      //     />
      //   );
      // },
    }),
    slug: buildProperty({
      name: "Slug",
      validation: { required: true },
      dataType: "string",
      description: "The slug is used to generate the page URL",
      unique: true,
      uri: true,
      // Field: (props) => {
      //   const parentUri = props.context.values.parentUri;
      //   return (
      //     <TextFieldBinding
      //       {...props}
      //       setValue={(e) => {
      //         if (e) {
      //           props.setFieldValue(
      //             "uri",
      //             parentUri ? parentUri + "/" + e : "/" + e
      //           );
      //         } else {
      //           props.setFieldValue("uri", parentUri ? parentUri + "/" : "/");
      //         }
      //         props.setValue(e);
      //       }}
      //     />
      //   );
      // },
    }),
    // uri: buildProperty({
    //   name: "URI",
    //   dataType: "string",
    //   description: "The URI is used to generate the page URL",
    //   readOnly: true,
    //   uri: true,
    //   hideFromCollection: true,
    //   validation: {
    //     unique: true,
    //   },
    // }),
    content: {
      name: "Content",
      dataType: "map",
      description: "Use the Page Builder to edit this content.",
      keyValue: true,
      expanded: false,
      Preview: (props) => {
        const uri = generateURI(
          props.entity?.values.slug,
          props.entity?.values.parent?.id
        );
        return (
          <>
            <MapPropertyPreview {...props} />
            <Button
              href={`http://localhost:3000/${uri}/edit`}
              target="_blank"
              sx={{ mt: 2 }}
              size="large"
              variant="outlined"
            >
              Edit in the Page Builder
            </Button>
          </>
        );
      },
      Field: (props) => {
        const uri = generateURI(
          props.context.values.slug,
          props.context.values.parent?.id
        );
        const isSlugMapped = pageIdSlugMapped(props.context.values.slug);
        return (
          <>
            <KeyValueFieldBinding {...props} />
            <Button
              href={`http://localhost:3000/${uri}/edit`}
              target="_blank"
              sx={{ mt: 2 }}
              size="large"
              variant="outlined"
              disabled={!isSlugMapped}
            >
              {isSlugMapped
                ? "Edit in the Page Builder"
                : "Create the page first to edit in the Page Builder"}
            </Button>
          </>
        );
      },
    },
    parent: buildProperty({
      name: "Parent",
      dataType: "reference",
      forceFilter: {
        status: ["==", "public"],
      },
      path: "pages",
      previewProperties: ["title", "slug"],

      // Field: (props) => {
      //   return (
      //     <ReferenceFieldBinding
      //       {...props}
      //       setValue={(e) => {
      //         if (e) {
      //           const app = initializeApp(firebaseConfig);
      //           const db = getFirestore(app);
      //           const docRef = doc(db, e.path, e.id);
      //           getDoc(docRef)
      //             .then()
      //             .then((doc) => {
      //               props.setFieldValue("parentUri", doc.data()?.uri);
      //               props.setFieldValue(
      //                 "uri",
      //                 doc.data()?.uri
      //                   ? doc.data()?.uri +
      //                       "/" +
      //                       (props.context.values?.slug || "")
      //                   : props.context.values?.slug || ""
      //               );
      //             })
      //             .catch((e) => console.error(e));
      //         }
      //         props.setValue(e);
      //       }}
      //     />
      //   );
      // },
    }),
    // parentUri: buildProperty({
    //   name: "Parent URI",
    //   dataType: "string",
    //   description: "The URI is used to generate the page URL",
    //   readOnly: true,
    //   uri: true,
    //   hideFromCollection: true,

    // }),
    status: {
      name: "Status",
      defaultValue: "draft",
      validation: { required: true },
      dataType: "string",
      description: "Should this page be visible in the website",
      enumValues: {
        private: "Private",
        draft: "Draft",
        public: "Published",
      },
    },
    dateCreated: buildProperty({
      name: "Date Created",
      dataType: "date",
      autoValue: "on_create",
    }),
    dateUpdated: buildProperty({
      name: "Date Updated",
      dataType: "date",
      autoValue: "on_update",
    }),
    tags: {
      name: "Tags",
      description: "Example of generic array",
      dataType: "array",
      of: {
        dataType: "string",
      },
    },
    category: {
      name: "Category",
      dataType: "string",
      enumValues: {
        electronics: "Electronics",
        books: "Books",
        furniture: "Furniture",
        clothing: "Clothing",
        food: "Food",
        footwear: "Footwear",
      },
    },
    metadata: {
      name: "Metadata",
      dataType: "map",
      keyValue: true,
    },
  },
  callbacks: buildEntityCallbacks({
    onSaveSuccess(entitySaveProps) {
      if (
        entitySaveProps.previousValues == undefined ||
        entitySaveProps.previousValues.slug != entitySaveProps.values.slug ||
        entitySaveProps.previousValues.parent != entitySaveProps.values.parent
      ) {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
        const docRef = doc(db, "settings", "pageIdSlugMap");
        const docField = `data.${entitySaveProps.entityId}`;
        updateDoc(docRef, {
          [docField]: {
            slug: entitySaveProps.values.slug,
            parent: entitySaveProps.values.parent?.id || null,
          },
        });
      }
    },
    onDelete(entityDeleteProps) {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      const docRef = doc(db, "settings", "pageIdSlugMap");
      const docField = `data.${entityDeleteProps.entityId}`;
      updateDoc(docRef, {
        [docField]: deleteField(),
      });
    },
  }),
});
