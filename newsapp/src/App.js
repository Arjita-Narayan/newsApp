import React from "react";
import Navbar from "./Components/Navbar";
import News from "./Components/News";
import { Routes, Route } from "react-router-dom";

const App = () => {
  const pageSize = 15;
  const apiKey = process.env.REACT_APP_NEWS_API;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <News
              apiKey={apiKey}
              key="general"
              pageSize={pageSize}
              country="us"
              category="general"
            />
          }
        />
        <Route
          path="/business"
          element={
            <News
              apiKey={apiKey}
              key="business"
              pageSize={pageSize}
              country="us"
              category="business"
            />
          }
        />
        <Route
          path="/entertainment"
          element={
            <News
              apiKey={apiKey}
              key="entertainment"
              pageSize={pageSize}
              country="us"
              category="entertainment"
            />
          }
        />
        <Route
          path="/health"
          element={
            <News
              apiKey={apiKey}
              key="health"
              pageSize={pageSize}
              country="us"
              category="health"
            />
          }
        />
        <Route
          path="/science"
          element={
            <News
              apiKey={apiKey}
              key="science"
              pageSize={pageSize}
              country="us"
              category="science"
            />
          }
        />
        <Route
          path="/sports"
          element={
            <News
              apiKey={apiKey}
              key="sports"
              pageSize={pageSize}
              country="us"
              category="sports"
            />
          }
        />
        <Route
          path="/technology"
          element={
            <News
              apiKey={apiKey}
              key="technology"
              pageSize={pageSize}
              country="us"
              category="technology"
            />
          }
        />
      </Routes>
    </div>
  );
};
export default App;
