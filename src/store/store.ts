import { configureStore } from "@reduxjs/toolkit";
import { loginReducer } from "./slice/login";
import { categoryReducer } from "./slice/category/category";
import { placeReducer } from "./slice/place/place";
import { productReducer } from "./slice/products/products";
import { rolesReducer } from "./slice/roles/roles";
import { usersReducer } from "./slice/users/users";
import { orderReducer } from "./slice/orders/orders";
import { operationReducer } from "./slice/operations/operations";
import { movementsReducer } from "./slice/moviments/moviments";

export const store = configureStore({
  reducer: {
    login: loginReducer,
    categories: categoryReducer,
    place: placeReducer,
    products: productReducer,
    roles: rolesReducer,
    users: usersReducer,
    orders: orderReducer,
    operation: operationReducer,
    movements: movementsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
