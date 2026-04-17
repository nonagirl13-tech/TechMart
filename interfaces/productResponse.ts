import {Product} from "./Product";
import { Metadata } from "./Metadate";


export interface productResponse {
  results: number;
  metadata: Metadata;
  data: Product[];
}