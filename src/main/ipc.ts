import { ipcMain } from "electron";
import { IPC } from "../shared/constants/ipc";
import { randomUUID } from "node:crypto";
import {
    CreateDocumentResponse,
    DeleteDocumentRequest,
    Document,
    FetchAllDocumentsResponse,
    FetchDocumentRequest,
    FetchDocumentResponse,
    SaveDocumentRequest,
    UpdateDocumentRequest,
} from "../shared/types/ipc";
import { store } from "./store";

ipcMain.handle(
    IPC.DOCUMENTS.FETCH_ALL,
    async (): Promise<FetchAllDocumentsResponse> => {
        return {
            data: Object.values(store.get("documents")),
        };
    }
);

ipcMain.handle(
    IPC.DOCUMENTS.FETCH_ONE,
    async (_, { id }: FetchDocumentRequest): Promise<FetchDocumentResponse> => {
        const document = store.get(`documents.${id}`) as Document;
        return {
            data: document,
        };
    }
);

ipcMain.handle(
    IPC.DOCUMENTS.CREATE,
    async (): Promise<CreateDocumentResponse> => {
        const id = randomUUID();

        const document: Document = {
            id,
            title: "Untitled",
        };

        store.set(`documents.${id}`, document);

        return {
            data: document,
        };
    }
);

ipcMain.handle(
    IPC.DOCUMENTS.SAVE,
    async (_, { id, title, content }: SaveDocumentRequest): Promise<void> => {
        store.set(`documents.${id}`, {
            id,
            title,
            content,
        });
    }
);

ipcMain.handle(
    IPC.DOCUMENTS.UPDATE,
    async (_, { id, title, content }: UpdateDocumentRequest): Promise<void> => {
        store.set(`documents.${id}`, {
            id,
            title,
            content,
        });
        return;
    }
);

ipcMain.handle(
    IPC.DOCUMENTS.DELETE,
    async (_, { id }: DeleteDocumentRequest): Promise<void> => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore

        store.delete(`documents.${id}`);
        return;
    }
);
