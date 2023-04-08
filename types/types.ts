type MetadataType = {
  categories: string;
};

export type ProductType = {
  id: string;
  name: string;
  image: string;
  unit_amount: number | null;
  quantity?: number | 1;
  description: string | null;
  metadata: MetadataType;
};

type Params = {
  id: string;
};

type SearchParams = {
  id: string;
  name: string;
  image: string;
  unit_amount: number | null;
  description: string | null;
  categories: string;
};

export type SearchParamType = {
  params: Params;
  searchParams: SearchParams;
};

export type AddCartType = {
  name: string;
  image: string;
  id: string;
  quantity?: number | 1;
  unit_amount: number | null;
};

export type CreateCartType = {
  name: string;
  description: string | null;
  unit_amount: string;
  image: string;
  quantity: number;
};
