import {
  createHashRouter,
  createRoutesFromElements,
  Outlet,
  RouterProvider,
  ScrollRestoration,
} from "react-router-dom";
import { AppHeader } from "components/AppHeader/AppHeader";
import { Route } from "react-router-dom";
import { ThemeProvider } from "@fluentui/react";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";
import { UserProvider } from "providers/UserProvider";
import { lazy, Suspense } from "react";
import Home from "Home";

// const Home = lazy(() => import("Home"));

// Begin module downloads immediately, but still utilize lazy() for code splitting
const newRequestFormPromise = import("components/Request/NewRequestForm");
const NewRequestForm = lazy(() => newRequestFormPromise);

const viewRequestPromise = import("components/ViewRequest/ViewRequest");
const ViewRequestPage = lazy(() => viewRequestPromise);

const router = createHashRouter(
  createRoutesFromElements(
    <Route element={<MainLayout />}>
      <Route path="/" element={<Home />} />
      <Route path="new" element={<NewRequestForm />} />
      <Route path="/Request/:requestId" element={<ViewRequestPage />} />
    </Route>
  )
);

function MainLayout() {
  return (
    <>
      <ScrollRestoration /> {/* Scroll window back to top on navigation */}
      <UserProvider>
        <FluentProvider theme={webLightTheme}>
          <ThemeProvider>
            <AppHeader />
            <Suspense
              fallback={<div style={{ paddingLeft: ".5em" }}>Loading...</div>}
            >
              <Outlet />
            </Suspense>
          </ThemeProvider>
        </FluentProvider>
      </UserProvider>
    </>
  );
}

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
