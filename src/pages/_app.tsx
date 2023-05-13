import React, { Suspense } from "react";
import { Provider as StoreProvider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import type { AppProps } from "next/app";
import { configureAppStore, persistor, store } from "@/store";
import "@/styles/globals.css";
import ErrorBoundary from "@/common/ErrorBoundary";
import addAuthTokenInterceptor from "@/api/addAuthTokenInterceptor";

addAuthTokenInterceptor(store);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback="loading">
          <StoreProvider store={store}>
            <PersistGate loading={<></>} persistor={persistor}>
              <Component {...pageProps} />
            </PersistGate>
          </StoreProvider>
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default MyApp;
