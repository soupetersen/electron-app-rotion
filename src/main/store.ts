import Store from "electron-store";
import { Document } from "../shared/types/ipc";

interface StoreSchema {
    documents: Record<string, Document>;
}

export const store = new Store<StoreSchema>({
    defaults: {
        documents: {},
    },
});
