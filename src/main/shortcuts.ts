import { BrowserWindow, globalShortcut, app } from "electron";

export function createShortcuts(window: BrowserWindow) {
    app.on("browser-window-focus", () => {
        globalShortcut.register("CommandOrControl+Shift+N", () => {
            window.webContents.send("new-document");
        });
    });
    app.on("browser-window-blur", () => {
        globalShortcut.unregisterAll();
    });
}
