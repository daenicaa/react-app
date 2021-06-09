import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      title
      content
      createdAt
      image
    	comments {
        id
        postId
        content
        createdAt
      }
    }
  }
`;

export const SINGLE_POST = gql`
  query singlePost($postId: Int!) {
    post(id: $postId) {
      id
      title
      content
      createdAt
      image
    	comments {
        id
        postId
        content
        createdAt
      }
    }
  }
`;

export const CREATE_POST_MUTATION = gql`
  mutation addPost(
    $title: String!,
    $content: String!,
    $image: String
    ){
    addPost(
      post: {
        title: $title,
        content:$content,
        image: $image
      })
    {
      id
      title
      content
      image
    }
  }
`;

export const UPDATE_POST_MUTATION = gql`
  mutation updatePost(
    $id: Int,
    $title: String!,
    $content: String,
    $image: String
  ){
    updatePost(
      post: {
      id:$id,
      title: $title,
      content: $content,
      image: $image
    })
    {
      id
      title
      content
      image
    }
  }
`;

export const ADD_COMMENT_MUTATION = gql`
  mutation($postId: Int!, $content: String!){
    addComment(postId: $postId, content: $content){
      id
      content
    }
  }
`;

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    authenticate(email: $email, password: $password )
  }
`;

export const AUTHENTICATE_USER = gql`
  mutation authenticate($email: String!, $password: String!) {
    token: authenticate(email: $email, password: $password )
  }
`;

export const REGISTER_USER = gql `
  mutation register($email: String!, $password: String!) {
    register(
      email: $email,
      password: $password
    )
    authenticate(
        email: $email,
        password: $password
    )
  }
`;
