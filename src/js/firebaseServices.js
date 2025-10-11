import app from "./firebaseConfig";
import { getDatabase } from "firebase/database";

export const db = getDatabase(app);
