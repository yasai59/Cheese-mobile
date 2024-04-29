import { useEffect, useState } from "react";
import { AppContext } from "./AppContext";
import axios from "axios";
import { getData, removeData, storeData } from "../storage/storageManager";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";

export const AppProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [tastes, setTastes] = useState([]);
  const [restrictions, setRestrictions] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [lastTab, setLastTab] = useState("Home");

  const [allTastes, setAllTastes] = useState([]);
  const [allRestrictions, setAllRestrictions] = useState([]);

  const navigate = useNavigation();

  const isLogged = !!token;

  const updateRestaurants = () => {
    axios.get("/api/restaurant").then((res) => {
      const arr = [];

      res.data.forEach((r) => {
        if (arr.find((a) => a.id === r.id)) return;

        arr.push(r);
      });

      setRestaurants(arr);
    });
  };

  const addRestaurant = (restaurant) => {
    // look for the restaurant in the list
    const res = restaurants.find((r) => r.id === restaurant.id);
    if (res) return;

    setRestaurants((prev) => [...prev, restaurant]);
  };

  useEffect(() => {
    loginLocal();
  }, []);

  useEffect(() => {
    if (!token) return;

    axios.defaults.headers.common["x-token"] = `${token}`;
    updateRestaurants();
    (async () => {
      const resTastes = await axios.get("/api/taste");
      setTastes(resTastes.data.tastes.map((t) => t.id));

      if (resTastes.data.tastes.length === 0) navigate.navigate("Tastes");

      const resRestrictions = await axios.get("/api/restriction");
      setRestrictions(resRestrictions.data.restrictions.map((r) => r.id));
    })();

    axios.get("/api/taste/all").then((res) => {
      setAllTastes(res.data.tastes);
    });
    axios.get("/api/restriction/all").then((res) => {
      setAllRestrictions(res.data.restrictions);
    });
    axios.get("/api/restaurant/favorite-restaurants").then((res) => {
      setFavoriteRestaurants(res.data);
    });
  }, [token]);

  const login = async (username, password) => {
    if (!username || !password) {
      return "Username and password are required.";
    }
    try {
      const res = await axios.post("/api/user/login", { username, password });
      setUser(res.data.user);
      setToken(res.data.token);
      axios.defaults.headers.common["x-token"] = `${res.data.token}`;
      storeData("token", res.data.token);
      storeData("user", JSON.stringify(res.data.user));
    } catch (e) {
      return e.response.data.message;
    }
  };

  const loginToken = async (token, user) => {
    if (!token) return;
    setUser(user);
    storeData("token", token);
    setToken(token);
  };

  const loginLocal = () => {
    getData("token").then(async (token) => {
      if (!token) return;
      axios.defaults.headers.common["x-token"] = `${token}`;
      const res = await axios.get("/api/user/myUser");
      setUser(res.data.user);
      setToken(token);
    });
  };

  const changeToken = (newToken) => {
    axios.defaults.headers.common["x-token"] = `${newToken}`;
    setToken(newToken);
    storeData("token", newToken);
  };

  const logout = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
    } catch (e) {
      console.log(e);
    }
    removeData("token");
    axios.defaults.headers.common["x-token"] = null;
    setToken(null);
    setUser(null);
  };

  const changeTastes = (newTastes) => {
    axios
      .post("/api/taste", { tastes: newTastes })
      .catch((e) => console.log(e.response.data.message));
    setTastes(newTastes);
  };

  const changeRestrictions = (newRestrictions) => {
    axios
      .post("/api/restriction", { restrictions: newRestrictions })
      .catch(console.log);

    setRestrictions(newRestrictions);
  };

  const toggleFavorite = (restaurant) => {
    const res = favoriteRestaurants.find((r) => r.id === restaurant.id);
    if (res) {
      setFavoriteRestaurants((prev) =>
        prev.filter((r) => r.id !== restaurant.id)
      );
      axios
        .post("/api/restaurant/favorite-restaurant/" + restaurant.id)
        .catch(() => {
          setFavoriteRestaurants((prev) => [...prev, restaurant]);
        });
    } else {
      setFavoriteRestaurants((prev) => [...prev, restaurant]);
      axios
        .post("/api/restaurant/favorite-restaurant/" + restaurant.id)
        .catch(() => {
          setFavoriteRestaurants((prev) =>
            prev.filter((r) => r.id !== restaurant.id)
          );
        });
    }
  };

  return (
    <AppContext.Provider
      value={{
        token,
        login,
        user,
        setUser,
        logout,
        isLogged,
        changeToken,
        loginLocal,
        tastes,
        restrictions,
        setRestrictions: changeRestrictions,
        setTastes: changeTastes,
        addRestaurant,
        loginToken,
        restaurants,
        updateRestaurants,
        allTastes,
        allRestrictions,
        favoriteRestaurants,
        toggleFavorite,
        lastTab,
        setLastTab,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
