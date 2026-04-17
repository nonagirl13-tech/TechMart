import { IMetadata } from "@/interfaces/IMetadata";

export type ResponseType<T> = {
  results: number;
  metadata: IMetadata;
  data: T[];
};
