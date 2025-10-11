import app from "./firebaseConfig";
import { getDatabase, connectDatabaseEmulator } from "firebase/database";

export const db = getDatabase(app);

if (import.meta.env.VITE_ENV === "DEV") { // Vite env flag
    connectDatabaseEmulator(db, "127.0.0.1", 9000);
}
