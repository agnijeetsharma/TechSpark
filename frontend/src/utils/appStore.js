
import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./userSlice"
import feedReducer from "./feedSlice"
// import storage from 'redux-persist/lib/storage'; // Local storage
// import { persistReducer, persistStore } from 'redux-persist';
// const persistConfig = {
//     key: 'root',
//     storage,
//   };
  
//   const persistedReducer = persistReducer(persistConfig, userReducer);

const appStore=configureStore({
    reducer: {
        user:userReducer,
        feed:feedReducer,
        // user: persistedReducer,
    }
})
// export const persistor = persistStore(appStore);
export default appStore