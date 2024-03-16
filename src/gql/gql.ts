/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "mutation addItem($id: ID!, $input: MutationCartAddItemInput!) {\n  cartAddItem(id: $id, input: $input) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n      }\n    }\n  }\n}": types.AddItemDocument,
    "mutation CartFindOrCreate($input: MutationCartFindOrCreateInput!) {\n  cartFindOrCreate(input: $input) {\n    id\n  }\n}": types.CartFindOrCreateDocument,
    "mutation ChangeQuantity($id: ID!, $productId: ID!, $quantity: Int!) {\n  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {\n    items {\n      product {\n        name\n        id\n      }\n      quantity\n    }\n  }\n}": types.ChangeQuantityDocument,
    "mutation CreateReview($author: String!, $description: String!, $email: String!, $productId: ID!, $rating: Int!, $title: String!) {\n  reviewCreate(\n    author: $author\n    description: $description\n    email: $email\n    productId: $productId\n    rating: $rating\n    title: $title\n  ) {\n    id\n  }\n}": types.CreateReviewDocument,
    "query GetCartByID($id: ID!) {\n  cart(id: $id) {\n    items {\n      product {\n        id\n        name\n        price\n        categories {\n          name\n        }\n        images {\n          url\n        }\n      }\n      quantity\n    }\n  }\n}": types.GetCartByIdDocument,
    "query GetCollection {\n  collections {\n    data {\n      name\n      slug\n    }\n  }\n}": types.GetCollectionDocument,
    "query GetReview($id: ID!) {\n  product(id: $id) {\n    reviews {\n      author\n      description\n      email\n      title\n      createdAt\n      rating\n    }\n  }\n}": types.GetReviewDocument,
    "query ProductCategoryBySlug($slug: String) {\n  category(slug: $slug) {\n    name\n    description\n    products {\n      name\n      id\n      images {\n        url\n      }\n      price\n      categories {\n        name\n      }\n    }\n  }\n}": types.ProductCategoryBySlugDocument,
    "query ProductGetByCollection($slug: String!) {\n  collection(slug: $slug) {\n    description\n    name\n    products {\n      id\n      name\n      description\n      price\n      images {\n        url\n      }\n    }\n  }\n}": types.ProductGetByCollectionDocument,
    "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    id\n    name\n    description\n    images {\n      url\n    }\n    price\n    categories {\n      name\n    }\n  }\n}": types.ProductGetByIdDocument,
    "query ProductGetList($orderBy: ProductSortBy) {\n  products(orderBy: $orderBy) {\n    data {\n      description\n      id\n      name\n      price\n      images {\n        url\n      }\n      categories {\n        name\n      }\n    }\n  }\n}": types.ProductGetListDocument,
    "mutation RemoveItemFromCart($id: ID!, $productId: ID!) {\n  cartRemoveItem(id: $id, productId: $productId) {\n    id\n    items {\n      product {\n        name\n      }\n      quantity\n    }\n  }\n}": types.RemoveItemFromCartDocument,
    "query Search($search: String) {\n  products(search: $search) {\n    data {\n      name\n      images {\n        url\n      }\n      id\n      description\n      categories {\n        name\n      }\n      price\n    }\n  }\n}": types.SearchDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation addItem($id: ID!, $input: MutationCartAddItemInput!) {\n  cartAddItem(id: $id, input: $input) {\n    id\n    items {\n      quantity\n      product {\n        id\n        name\n      }\n    }\n  }\n}"): typeof import('./graphql').AddItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CartFindOrCreate($input: MutationCartFindOrCreateInput!) {\n  cartFindOrCreate(input: $input) {\n    id\n  }\n}"): typeof import('./graphql').CartFindOrCreateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ChangeQuantity($id: ID!, $productId: ID!, $quantity: Int!) {\n  cartChangeItemQuantity(id: $id, productId: $productId, quantity: $quantity) {\n    items {\n      product {\n        name\n        id\n      }\n      quantity\n    }\n  }\n}"): typeof import('./graphql').ChangeQuantityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateReview($author: String!, $description: String!, $email: String!, $productId: ID!, $rating: Int!, $title: String!) {\n  reviewCreate(\n    author: $author\n    description: $description\n    email: $email\n    productId: $productId\n    rating: $rating\n    title: $title\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CreateReviewDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCartByID($id: ID!) {\n  cart(id: $id) {\n    items {\n      product {\n        id\n        name\n        price\n        categories {\n          name\n        }\n        images {\n          url\n        }\n      }\n      quantity\n    }\n  }\n}"): typeof import('./graphql').GetCartByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCollection {\n  collections {\n    data {\n      name\n      slug\n    }\n  }\n}"): typeof import('./graphql').GetCollectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetReview($id: ID!) {\n  product(id: $id) {\n    reviews {\n      author\n      description\n      email\n      title\n      createdAt\n      rating\n    }\n  }\n}"): typeof import('./graphql').GetReviewDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductCategoryBySlug($slug: String) {\n  category(slug: $slug) {\n    name\n    description\n    products {\n      name\n      id\n      images {\n        url\n      }\n      price\n      categories {\n        name\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductCategoryBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetByCollection($slug: String!) {\n  collection(slug: $slug) {\n    description\n    name\n    products {\n      id\n      name\n      description\n      price\n      images {\n        url\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductGetByCollectionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(id: $id) {\n    id\n    name\n    description\n    images {\n      url\n    }\n    price\n    categories {\n      name\n    }\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetList($orderBy: ProductSortBy) {\n  products(orderBy: $orderBy) {\n    data {\n      description\n      id\n      name\n      price\n      images {\n        url\n      }\n      categories {\n        name\n      }\n    }\n  }\n}"): typeof import('./graphql').ProductGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation RemoveItemFromCart($id: ID!, $productId: ID!) {\n  cartRemoveItem(id: $id, productId: $productId) {\n    id\n    items {\n      product {\n        name\n      }\n      quantity\n    }\n  }\n}"): typeof import('./graphql').RemoveItemFromCartDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query Search($search: String) {\n  products(search: $search) {\n    data {\n      name\n      images {\n        url\n      }\n      id\n      description\n      categories {\n        name\n      }\n      price\n    }\n  }\n}"): typeof import('./graphql').SearchDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
