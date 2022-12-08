import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";

export function createTray(window: BrowserWindow) {
    const tray = new Tray(path.resolve(__dirname, "rotionTemplate.png"));
    const menu = Menu.buildFromTemplate([
        {
            label: "Rotion",
            enabled: false,
        },
        {
            type: "separator",
        },
        {
            label: "Create new document",
            click: () => {
                window.webContents.send("new-document");
            },
        },
        {
            type: "separator",
        },
        {
            label: "Recent documents",
            enabled: false,
        },
        {
            label: "Document 1",
            accelerator: "CmdOrCtrl+1",
            acceleratorWorksWhenHidden: false,
        },
        {
            type: "separator",
        },
        {
            label: "Quit",
            role: "quit",
        },
    ]);

    tray.setContextMenu(menu);
}
