import { createTransform } from "redux-persist";
import { persistStore, persistReducer } from "redux-persist";

const SetTransform = createTransform(
  // transform state on its way to being serialized and persisted.
  (inboundState, key) => {
    // convert mySet to an Array.
    console.error("inboundState", inboundState);
    return { ...inboundState };
  },

  // transform state being rehydrated
  (outboundState, key) => {
    // convert mySet back to a Set.
    console.error("outboundState", outboundState);

    return { ...outboundState };
  },

  // define which reducers this transform gets called for.
  { whitelist: ["auth"] }
);

export default SetTransform;
