import { useEffect, useState } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import axios from "axios";
import Home from "./pages/Home/Home";
import About from "./pages/About/About";
import Layout from "./Layout";
import Discover from "./pages/Discover/Discover";
import Category from "./pages/Category/Category";
import { RecipeProvider } from "./contexts/recipes";
import { ModalProvider } from "./contexts/modal";
import { AuthProvider } from "./contexts/auth";
import { IRecipe } from "./interfaces/RecipeInterfaces";
import { recipeURL } from "./utils/globalVar";
import SingleRecipe from "./pages/SingleRecipe/SingleRecipe";
import SearchResult from "./pages/SearchResult/SearchResult";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Profile from "./pages/Profile/Profile";
import SignUp from "./pages/SignUp/SignUp";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Layout />}>
      <Route
        index
        path=''
        element={<Home />}
      />
      <Route
        path='discover'
        element={<Discover />}
      />
      <Route
        path='discover/:discId'
        element={<Category />}
      />
      <Route
        path='discover/:discId/:recipeId'
        element={<SingleRecipe />}
      />
      <Route
        path='about'
        element={<About />}
      />
      <Route
        path=':recipeId'
        element={<SingleRecipe />}
      />
      <Route
        path='search/:searchId'
        element={<SearchResult />}
      />
      <Route
        path='signup'
        element={<SignUp />}
      />
      <Route element={<ProtectedRoute />}>
        <Route
          path='profile'
          element={<Profile />}
        />
      </Route>
    </Route>
  )
);

function App() {
  const [isLoading, setLoading] = useState<boolean>(true);
  const [recipeData, setRecipeData] = useState<[IRecipe]>([
    {
      name: "",
      ingredients: [""],
      calories: 0,
      total_fat: 0,
      saturated_fat: 0,
      cholesterol: 0,
      sodium: 0,
      carbohydrates: 0,
      dietary_fiber: 0,
      sugars: 0,
      protein: 0,
      _id: 0,
      categories: [""],
      steps: "",
    },
  ]);

  useEffect(() => {
    axios.get(recipeURL).then((response) => {
      const result = response.data;
      setRecipeData(result.data.recipes);
      setLoading(false);
    });
  }, []);

  return (
    <>
      <AuthProvider>
        <ModalProvider>
          <RecipeProvider value={{ isLoading, recipeData }}>
            <RouterProvider router={router} />
          </RecipeProvider>
        </ModalProvider>
      </AuthProvider>
    </>
  );
}

export default App;
