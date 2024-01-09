import React, { ReactNode, createContext, forwardRef, useEffect } from "react";
import { useImmerReducer } from "use-immer";

import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../firebase-config";

import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import { TransitionProps } from "@mui/material/transitions";
import Slide from "@mui/material/Slide";
import DialogContent from "@mui/material/DialogContent";
import CircularProgress from "@mui/material/CircularProgress";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { ThemeProvider } from "@mui/material/styles";
import { edraakTheme } from "./mui-theme";
import { useDataSource } from "firecms";
import { settingsCollection } from "../collections/settings";

export type AppState = {
  gallery: { name: string; url: string; width?: number; height?: number }[];
  pageIdSlugMap: { [key: string]: { parent: string; slug: string } };
  selected: string[];
  isModalOpen: boolean;
  loading: boolean;
  customFields: { [key: string]: any };
};

export type AppActionType =
  | {
      type: "SET_GALLERY";
      payload: { name: string; url: string; width?: number; height?: number }[];
    }
  | {
      type: "SET_PAGE_ID_SLUG_MAP";
      payload: { [key: string]: { parent: string; slug: string } };
    }
  | {
      type: "UPDATE_GALLERY_ITEM";
      payload: { width: number; height: number };
      index: number;
    }
  | {
      type: "SET_LOADING";
      payload: boolean;
    }
  | {
      type: "SET_MODAL";
      payload: boolean;
    }
  | {
      type: "TOGGLE_SELECTED";
      payload: string;
    }
  | {
      type: "SET_CUSTOM_FIELD";
      payload: { [key: string]: any };
    };

const initialState: AppState = {
  gallery: [],
  isModalOpen: false,
  loading: true,
  selected: [],
  customFields: {},
  pageIdSlugMap: {},
};

export const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppActionType>;
}>({
  state: initialState,
  dispatch: () => null,
});

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useImmerReducer(
    (draft: AppState, action: AppActionType) => {
      switch (action.type) {
        case "SET_PAGE_ID_SLUG_MAP":
          draft.pageIdSlugMap = action.payload;
          break;
        case "SET_GALLERY":
          draft.gallery = action.payload;
          break;
        case "UPDATE_GALLERY_ITEM":
          draft.gallery[action.index] = {
            ...draft.gallery[action.index],
            ...action.payload,
          };
          break;
        case "SET_LOADING":
          draft.loading = action.payload;
          break;
        case "SET_MODAL":
          draft.isModalOpen = action.payload;
          break;
        case "TOGGLE_SELECTED":
          draft.selected.includes(action.payload)
            ? (draft.selected = draft.selected.filter(
                (item) => item !== action.payload
              ))
            : draft.selected.push(action.payload);
          break;
        case "SET_CUSTOM_FIELD":
          draft.customFields = action.payload;
          break;
        default:
          break;
      }
    },
    initialState
  );
  const dataSource = useDataSource();

  useEffect(() => {
    async function getInitailProps() {
      const app = initializeApp(firebaseConfig);
      // const storage = getStorage(app);
      // const listRef = ref(storage, "/images");
      // const data = await list(listRef, {});
      // const imageItems = data.items.filter((item) =>
      //   item.name.match(/.(jpg|jpeg|png|gif|webp|avif)$/i)
      // );
      // const imageURLs = await Promise.all(
      //   imageItems.map(async (item) => getDownloadURL(item))
      // );
      // dispatch({
      //   type: "SET_GALLERY",
      //   payload: imageItems.map((item, index) => ({
      //     name: item.name,
      //     url: imageURLs[index],
      //   })),
      // });

      // const db = getFirestore(app);
      // const collectionRef = collection(db, "settings");
      // const docRef = doc(collectionRef, "pageIdSlugMap");
      // const data = getDoc(docRef);
      // const response = await data;

      // if (response.exists())
      //   dispatch({
      //     type: "SET_PAGE_ID_SLUG_MAP",
      //     payload: response.data().data,
      //   });
      const data = await dataSource.fetchEntity({
        path: "settings",
        collection: settingsCollection,
        entityId: "pageIdSlugMap",
      });

      if (data && data.values)
        dispatch({
          type: "SET_PAGE_ID_SLUG_MAP",
          payload: data.values.data as {
            [key: string]: { parent: string; slug: string };
          },
        });
      dispatch({ type: "SET_LOADING", payload: false });
    }
    if (state.loading) getInitailProps();
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      <ThemeProvider theme={edraakTheme}>
        <Dialog
          open={state.isModalOpen}
          onClose={() => dispatch({ type: "SET_MODAL", payload: false })}
        >
          <DialogTitle>Media</DialogTitle>
          <DialogContent>
            {state.loading ? (
              <CircularProgress />
            ) : (
              <ImageList cols={3} variant="masonry">
                {state.gallery.map((item, index) => (
                  <ImageListItem
                    sx={{
                      background: "#202020",
                      overflow: "hidden",
                    }}
                    key={item.name}
                    title={item.name}
                    onClick={() =>
                      dispatch({ type: "TOGGLE_SELECTED", payload: item.url })
                    }
                  >
                    <img
                      width={256}
                      src={item.url}
                      alt={item.name}
                      loading="lazy"
                      onLoad={(event) => {
                        dispatch({
                          type: "UPDATE_GALLERY_ITEM",
                          payload: {
                            width: event.currentTarget.naturalWidth,
                            height: event.currentTarget.naturalHeight,
                          },
                          index: index,
                        });
                      }}
                    />
                    <ImageListItemBar
                      title={item.name}
                      sx={{
                        fontSize: "0.5rem",
                        background: "#101010",
                        px: 1,
                      }}
                      subtitle={
                        <span>
                          {item.width}&times;{item.height} px
                        </span>
                      }
                      position="below"
                      // actionIcon={
                      //   <IconButton
                      //     sx={{ color: "rgba(255, 255, 255, 0.54)" }}
                      //     aria-label={`info about ${item.title}`}
                      //   >
                      //     <InfoIcon />
                      //   </IconButton>
                      // }
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            )}
          </DialogContent>
        </Dialog>
      </ThemeProvider>
      {children}
    </AppContext.Provider>
  );
};
