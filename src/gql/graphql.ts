/* eslint-disable */
import type { DocumentTypeDecoration } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: { input: any; output: any; }
};

export type Cart = {
  id: Scalars['ID']['output'];
  items: Array<CartItem>;
};

export type CartItem = {
  product: Product;
  quantity: Scalars['Int']['output'];
};

export type CartItemInput = {
  productId: Scalars['String']['input'];
  quantity?: InputMaybe<Scalars['Int']['input']>;
};

export type Category = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CategoryList = {
  data: Array<Category>;
  meta: ListMeta;
};

export type Collection = {
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  products: Array<Product>;
  slug: Scalars['String']['output'];
};

export type CollectionList = {
  data: Array<Collection>;
  meta: ListMeta;
};

export type ListMeta = {
  /** The total number of items matching the query */
  count: Scalars['Int']['output'];
  /** The total number of items in the database */
  total: Scalars['Int']['output'];
};

export type Mutation = {
  cartAddItem: Cart;
  cartChangeItemQuantity: Cart;
  cartComplete: Order;
  cartFindOrCreate: Cart;
  cartRemoveItem: Cart;
  reviewCreate: Cart;
};


export type MutationCartAddItemArgs = {
  id: Scalars['ID']['input'];
  input: MutationCartAddItemInput;
};


export type MutationCartChangeItemQuantityArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
};


export type MutationCartCompleteArgs = {
  cartId: Scalars['ID']['input'];
  userEmail: Scalars['String']['input'];
};


export type MutationCartFindOrCreateArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  input: MutationCartFindOrCreateInput;
};


export type MutationCartRemoveItemArgs = {
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
};


export type MutationReviewCreateArgs = {
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
};

export type MutationCartAddItemInput = {
  item: CartItemInput;
};

export type MutationCartFindOrCreateInput = {
  items?: InputMaybe<Array<CartItemInput>>;
};

export type Order = {
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  lines: Scalars['JSON']['output'];
  status: OrderStatus;
  totalAmount: Scalars['Int']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type OrderList = {
  data: Array<Order>;
  meta: ListMeta;
};

export type OrderSortBy =
  | 'DEFAULT'
  | 'STATUS'
  | 'TOTAL';

export type OrderStatus =
  | 'CANCELLED'
  | 'CREATED'
  | 'FULFILLED'
  | 'PAID';

export type Product = {
  categories: Array<Category>;
  collections: Array<Collection>;
  description: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  images: Array<ProductImage>;
  name: Scalars['String']['output'];
  price: Scalars['Int']['output'];
  rating?: Maybe<Scalars['Float']['output']>;
  reviews: Array<Review>;
  slug: Scalars['String']['output'];
};

export type ProductImage = {
  alt: Scalars['String']['output'];
  height: Scalars['Int']['output'];
  id: Scalars['ID']['output'];
  url: Scalars['String']['output'];
  width: Scalars['Int']['output'];
};

export type ProductList = {
  data: Array<Product>;
  meta: ListMeta;
};

export type ProductSortBy =
  | 'DEFAULT'
  | 'NAME'
  | 'PRICE'
  | 'RATING';

export type Query = {
  cart?: Maybe<Cart>;
  categories: CategoryList;
  category?: Maybe<Category>;
  collection?: Maybe<Collection>;
  collections: CollectionList;
  order?: Maybe<Order>;
  orders: OrderList;
  product?: Maybe<Product>;
  products: ProductList;
};


export type QueryCartArgs = {
  id: Scalars['ID']['input'];
};


export type QueryCategoriesArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryCollectionsArgs = {
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryOrdersArgs = {
  email: Scalars['String']['input'];
  order?: SortDirection;
  orderBy?: OrderSortBy;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};


export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>;
  slug?: InputMaybe<Scalars['String']['input']>;
};


export type QueryProductsArgs = {
  order?: SortDirection;
  orderBy?: ProductSortBy;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: Scalars['Int']['input'];
  take?: Scalars['Int']['input'];
};

export type Review = {
  author: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description: Scalars['String']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  product: Product;
  rating: Scalars['Float']['output'];
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type ReviewList = {
  data: Array<Review>;
  meta: ListMeta;
};

export type SortDirection =
  | 'ASC'
  | 'DESC';

export type AddItemMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  input: MutationCartAddItemInput;
}>;


export type AddItemMutation = { cartAddItem: { id: string, items: Array<{ quantity: number, product: { id: string, name: string } }> } };

export type CartFindOrCreateMutationVariables = Exact<{
  input: MutationCartFindOrCreateInput;
}>;


export type CartFindOrCreateMutation = { cartFindOrCreate: { id: string } };

export type ChangeQuantityMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
  quantity: Scalars['Int']['input'];
}>;


export type ChangeQuantityMutation = { cartChangeItemQuantity: { items: Array<{ quantity: number, product: { name: string, id: string } }> } };

export type CreateReviewMutationVariables = Exact<{
  author: Scalars['String']['input'];
  description: Scalars['String']['input'];
  email: Scalars['String']['input'];
  productId: Scalars['ID']['input'];
  rating: Scalars['Int']['input'];
  title: Scalars['String']['input'];
}>;


export type CreateReviewMutation = { reviewCreate: { id: string } };

export type GetCartByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetCartByIdQuery = { cart?: { items: Array<{ quantity: number, product: { id: string, name: string, price: number, categories: Array<{ name: string }>, images: Array<{ url: string }> } }> } | null };

export type GetCollectionQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCollectionQuery = { collections: { data: Array<{ name: string, slug: string }> } };

export type GetReviewQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type GetReviewQuery = { product?: { reviews: Array<{ author: string, description: string, email: string, title: string, createdAt: any, rating: number }> } | null };

export type ProductCategoryBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>;
}>;


export type ProductCategoryBySlugQuery = { category?: { name: string, description: string, products: Array<{ name: string, id: string, price: number, images: Array<{ url: string }> }> } | null };

export type ProductGetByCollectionQueryVariables = Exact<{
  slug: Scalars['String']['input'];
}>;


export type ProductGetByCollectionQuery = { collection?: { description: string, name: string, products: Array<{ id: string, name: string, description: string, price: number, images: Array<{ url: string }> }> } | null };

export type ProductGetByIdQueryVariables = Exact<{
  id: Scalars['ID']['input'];
}>;


export type ProductGetByIdQuery = { product?: { id: string, name: string, description: string, price: number, images: Array<{ url: string }>, categories: Array<{ name: string }> } | null };

export type ProductGetListQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductGetListQuery = { products: { data: Array<{ description: string, id: string, name: string, price: number, images: Array<{ url: string }>, categories: Array<{ name: string }> }> } };

export type RemoveItemFromCartMutationVariables = Exact<{
  id: Scalars['ID']['input'];
  productId: Scalars['ID']['input'];
}>;


export type RemoveItemFromCartMutation = { cartRemoveItem: { id: string, items: Array<{ quantity: number, product: { name: string } }> } };

export type SearchQueryVariables = Exact<{
  search?: InputMaybe<Scalars['String']['input']>;
}>;


export type SearchQuery = { products: { data: Array<{ name: string, id: string, description: string, price: number, images: Array<{ url: string }>, categories: Array<{ name: string }> }> } };

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(private value: string, public __meta__?: Record<string, any>) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const AddItemDocument = new TypedDocumentString(`
    mutation addItem($id: ID!, $input: MutationCartAddItemInput!) {
  cartAddItem(id: $id, input: $input) {
    id
    items {
      quantity
      product {
        id
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<AddItemMutation, AddItemMutationVariables>;
export const CartFindOrCreateDocument = new TypedDocumentString(`
    mutation CartFindOrCreate($input: MutationCartFindOrCreateInput!) {
  cartFindOrCreate(input: $input) {
    id
  }
}
    `) as unknown as TypedDocumentString<CartFindOrCreateMutation, CartFindOrCreateMutationVariables>;
export const ChangeQuantityDocument = new TypedDocumentString(`
    mutation ChangeQuantity($id: ID!, $productId: ID!, $quantity: Int!) {
  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {
    items {
      product {
        name
        id
      }
      quantity
    }
  }
}
    `) as unknown as TypedDocumentString<ChangeQuantityMutation, ChangeQuantityMutationVariables>;
export const CreateReviewDocument = new TypedDocumentString(`
    mutation CreateReview($author: String!, $description: String!, $email: String!, $productId: ID!, $rating: Int!, $title: String!) {
  reviewCreate(
    author: $author
    description: $description
    email: $email
    productId: $productId
    rating: $rating
    title: $title
  ) {
    id
  }
}
    `) as unknown as TypedDocumentString<CreateReviewMutation, CreateReviewMutationVariables>;
export const GetCartByIdDocument = new TypedDocumentString(`
    query GetCartByID($id: ID!) {
  cart(id: $id) {
    items {
      product {
        id
        name
        price
        categories {
          name
        }
        images {
          url
        }
      }
      quantity
    }
  }
}
    `) as unknown as TypedDocumentString<GetCartByIdQuery, GetCartByIdQueryVariables>;
export const GetCollectionDocument = new TypedDocumentString(`
    query GetCollection {
  collections {
    data {
      name
      slug
    }
  }
}
    `) as unknown as TypedDocumentString<GetCollectionQuery, GetCollectionQueryVariables>;
export const GetReviewDocument = new TypedDocumentString(`
    query GetReview($id: ID!) {
  product(id: $id) {
    reviews {
      author
      description
      email
      title
      createdAt
      rating
    }
  }
}
    `) as unknown as TypedDocumentString<GetReviewQuery, GetReviewQueryVariables>;
export const ProductCategoryBySlugDocument = new TypedDocumentString(`
    query ProductCategoryBySlug($slug: String) {
  category(slug: $slug) {
    name
    description
    products {
      name
      id
      images {
        url
      }
      price
    }
  }
}
    `) as unknown as TypedDocumentString<ProductCategoryBySlugQuery, ProductCategoryBySlugQueryVariables>;
export const ProductGetByCollectionDocument = new TypedDocumentString(`
    query ProductGetByCollection($slug: String!) {
  collection(slug: $slug) {
    description
    name
    products {
      id
      name
      description
      price
      images {
        url
      }
    }
  }
}
    `) as unknown as TypedDocumentString<ProductGetByCollectionQuery, ProductGetByCollectionQueryVariables>;
export const ProductGetByIdDocument = new TypedDocumentString(`
    query ProductGetById($id: ID!) {
  product(id: $id) {
    id
    name
    description
    images {
      url
    }
    price
    categories {
      name
    }
  }
}
    `) as unknown as TypedDocumentString<ProductGetByIdQuery, ProductGetByIdQueryVariables>;
export const ProductGetListDocument = new TypedDocumentString(`
    query ProductGetList {
  products {
    data {
      description
      id
      name
      price
      images {
        url
      }
      categories {
        name
      }
    }
  }
}
    `) as unknown as TypedDocumentString<ProductGetListQuery, ProductGetListQueryVariables>;
export const RemoveItemFromCartDocument = new TypedDocumentString(`
    mutation RemoveItemFromCart($id: ID!, $productId: ID!) {
  cartRemoveItem(id: $id, productId: $productId) {
    id
    items {
      product {
        name
      }
      quantity
    }
  }
}
    `) as unknown as TypedDocumentString<RemoveItemFromCartMutation, RemoveItemFromCartMutationVariables>;
export const SearchDocument = new TypedDocumentString(`
    query Search($search: String) {
  products(search: $search) {
    data {
      name
      images {
        url
      }
      id
      description
      categories {
        name
      }
      price
    }
  }
}
    `) as unknown as TypedDocumentString<SearchQuery, SearchQueryVariables>;