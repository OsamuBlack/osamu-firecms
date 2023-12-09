import { useContext } from "react";
import { AppContext } from "../lib/context.tsx";


export function generateURI(slug: string, parentId: string): string {
  const { state } = useContext(AppContext);
  function mapParentUri(parentId: string, uri: string = ""): string {
    if (parentId && state.pageIdSlugMap[parentId]) {
      const parent = state.pageIdSlugMap[parentId];
      const grandParent = parent.parent;
      if (grandParent)
        return mapParentUri(grandParent, uri) + parent.slug + "/" + uri;
      return parent.slug + "/" + uri;
    } else return uri;
  }
  if (parentId && state.pageIdSlugMap[parentId]) {
    return mapParentUri(parentId).replace(/([^:]\/)\/+/g, "$1") + slug;
  } else return slug;
}
