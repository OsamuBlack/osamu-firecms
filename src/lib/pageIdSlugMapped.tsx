import { useContext } from "react";
import { AppContext } from "../lib/context.tsx";

export function pageIdSlugMapped(slug: string): boolean {
  const { state } = useContext(AppContext);
  return state.pageIdSlugMap[slug] ? true : false;
}
