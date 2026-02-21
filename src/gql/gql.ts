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
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "mutation CreateReview($author: String!, $title: String!, $description: String!, $email: String!, $rating: Float!, $productSlug: String!) {\n  createReview(\n    data: {author: $author, title: $title, description: $description, email: $email, rating: $rating, products: {connect: {slug: $productSlug}}}\n  ) {\n    id\n  }\n}": typeof types.CreateReviewDocument,
    "query GetCategories {\n  categories {\n    name\n    slug\n  }\n}": typeof types.GetCategoriesDocument,
    "query GetReview($id: ID!) {\n  product(where: {id: $id}) {\n    reviews {\n      author\n      title\n      description\n      email\n      rating\n      createdAt\n    }\n  }\n}": typeof types.GetReviewDocument,
    "query ProductCategoryBySlug($slug: String) {\n  category(where: {slug: $slug}) {\n    name\n    description\n    products {\n      name\n      id\n      images {\n        url\n      }\n      price\n      categories {\n        name\n      }\n      rating\n    }\n  }\n}": typeof types.ProductCategoryBySlugDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    slug\n    name\n    description\n    images {\n      url\n    }\n    price\n    categories {\n      name\n    }\n  }\n}": typeof types.ProductGetByIdDocument,
    "query ProductGetList {\n  products {\n    id\n    name\n    description\n    price\n    rating\n    images {\n      url\n    }\n    categories {\n      name\n    }\n  }\n}": typeof types.ProductGetListDocument,
    "mutation ReviewCreate($author: String!, $title: String!, $description: String!, $email: String!, $rating: Float!, $productSlug: String!) {\n  createReview(\n    data: {author: $author, title: $title, description: $description, email: $email, rating: $rating, products: {connect: {slug: $productSlug}}}\n  ) {\n    id\n  }\n}": typeof types.ReviewCreateDocument,
};
const documents: Documents = {
    "mutation CreateReview($author: String!, $title: String!, $description: String!, $email: String!, $rating: Float!, $productSlug: String!) {\n  createReview(\n    data: {author: $author, title: $title, description: $description, email: $email, rating: $rating, products: {connect: {slug: $productSlug}}}\n  ) {\n    id\n  }\n}": types.CreateReviewDocument,
    "query GetCategories {\n  categories {\n    name\n    slug\n  }\n}": types.GetCategoriesDocument,
    "query GetReview($id: ID!) {\n  product(where: {id: $id}) {\n    reviews {\n      author\n      title\n      description\n      email\n      rating\n      createdAt\n    }\n  }\n}": types.GetReviewDocument,
    "query ProductCategoryBySlug($slug: String) {\n  category(where: {slug: $slug}) {\n    name\n    description\n    products {\n      name\n      id\n      images {\n        url\n      }\n      price\n      categories {\n        name\n      }\n      rating\n    }\n  }\n}": types.ProductCategoryBySlugDocument,
    "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    slug\n    name\n    description\n    images {\n      url\n    }\n    price\n    categories {\n      name\n    }\n  }\n}": types.ProductGetByIdDocument,
    "query ProductGetList {\n  products {\n    id\n    name\n    description\n    price\n    rating\n    images {\n      url\n    }\n    categories {\n      name\n    }\n  }\n}": types.ProductGetListDocument,
    "mutation ReviewCreate($author: String!, $title: String!, $description: String!, $email: String!, $rating: Float!, $productSlug: String!) {\n  createReview(\n    data: {author: $author, title: $title, description: $description, email: $email, rating: $rating, products: {connect: {slug: $productSlug}}}\n  ) {\n    id\n  }\n}": types.ReviewCreateDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation CreateReview($author: String!, $title: String!, $description: String!, $email: String!, $rating: Float!, $productSlug: String!) {\n  createReview(\n    data: {author: $author, title: $title, description: $description, email: $email, rating: $rating, products: {connect: {slug: $productSlug}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').CreateReviewDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetCategories {\n  categories {\n    name\n    slug\n  }\n}"): typeof import('./graphql').GetCategoriesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query GetReview($id: ID!) {\n  product(where: {id: $id}) {\n    reviews {\n      author\n      title\n      description\n      email\n      rating\n      createdAt\n    }\n  }\n}"): typeof import('./graphql').GetReviewDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductCategoryBySlug($slug: String) {\n  category(where: {slug: $slug}) {\n    name\n    description\n    products {\n      name\n      id\n      images {\n        url\n      }\n      price\n      categories {\n        name\n      }\n      rating\n    }\n  }\n}"): typeof import('./graphql').ProductCategoryBySlugDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetById($id: ID!) {\n  product(where: {id: $id}) {\n    id\n    slug\n    name\n    description\n    images {\n      url\n    }\n    price\n    categories {\n      name\n    }\n  }\n}"): typeof import('./graphql').ProductGetByIdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "query ProductGetList {\n  products {\n    id\n    name\n    description\n    price\n    rating\n    images {\n      url\n    }\n    categories {\n      name\n    }\n  }\n}"): typeof import('./graphql').ProductGetListDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "mutation ReviewCreate($author: String!, $title: String!, $description: String!, $email: String!, $rating: Float!, $productSlug: String!) {\n  createReview(\n    data: {author: $author, title: $title, description: $description, email: $email, rating: $rating, products: {connect: {slug: $productSlug}}}\n  ) {\n    id\n  }\n}"): typeof import('./graphql').ReviewCreateDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
