import { buildCollection } from "firecms";

type Record = {
  [key: string]: string;
};

export const recordCollection = buildCollection<Record>({
  path: "records",
  name: "Records",
  singularName: "Record",
  properties: {},
});
