"use client";

// ref: https://www.apollographql.com/blog/using-apollo-client-with-next-js-13-releasing-an-official-library-to-support-the-app-router

import { ApolloLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { createUploadLink } from "apollo-upload-client";
import {
  ApolloNextAppProvider,
  NextSSRInMemoryCache,
  NextSSRApolloClient,
  SSRMultipartLink,
} from "@apollo/experimental-nextjs-app-support/ssr";

function makeClient() {
  const httpLink = createUploadLink({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_ENTRYPOINT,
    headers: { "Apollo-Require-Preflight": "true" },
  });

  const authLink = setContext((_, { headers }) => {
    // get the authentication token from local storage if it exists
    let token: string | null = null;
    if (typeof window !== "undefined") {
      // Perform localStorage action
      token = localStorage.getItem("token");
    }

    // return the headers to the context so httpLink can read them
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  return new NextSSRApolloClient({
    cache: new NextSSRInMemoryCache(),
    link:
      typeof window === "undefined"
        ? ApolloLink.from([
            new SSRMultipartLink({
              stripDefer: true,
            }),
            authLink,
            httpLink,
          ])
        : ApolloLink.from([authLink, httpLink]),
  });
}

export function ApolloWrapper({ children }: React.PropsWithChildren) {
  return (
    <ApolloNextAppProvider makeClient={makeClient}>
      {children}
    </ApolloNextAppProvider>
  );
}
