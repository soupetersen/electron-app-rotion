import { useQuery } from "@tanstack/react-query";
import { Command } from "cmdk";
import { File, MagnifyingGlass } from "phosphor-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Document } from "~/src/shared/types/ipc";

interface SearchBarProps {
    open: boolean;
    onOpen: (isOpen: boolean) => void;
}

export function SearchBar({ open, onOpen }: SearchBarProps) {
    const navigate = useNavigate();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            console.log(e.key, e.metaKey);
            if (e.key === "k" && e.metaKey) {
                onOpen(!open);
            }
        };

        document.addEventListener("keydown", down);

        return () => document.removeEventListener("keydown", down);
    }, [onOpen]);

    const { data } = useQuery(["documents"], async () => {
        const response = await window.api.fetchDocuments();
        return response.data;
    });

    function handleOpenDocument(document: Document) {
        if (!document) return;
        navigate(`/documents/${document.id}`);
        onOpen(false);
    }

    return (
        <Command.Dialog
            className="bg-rotion-800 text-rotion-100 border-rotion-600 fixed top-24 left-1/2 w-[480px] max-w-full -translate-x-1/2 rounded-md border shadow-2xl"
            open={open}
            onOpenChange={onOpen}
            label="Search"
        >
            <div className="border-rotion-700 flex items-center gap-2 border-b p-4">
                <MagnifyingGlass className="h-5 w-5" />
                <Command.Input
                    autoFocus
                    placeholder="Buscar documentos..."
                    className="text-rotion-50 placeholder:text-rotion-200 w-full bg-transparent text-sm focus:outline-none"
                />
            </div>
            <Command.List className="scrollbar-thin scrollbar-thumb-rotion-600 scrollbar-track-rotion-800 max-h-48 py-2">
                <Command.Empty className="text-rotion-200 py-3 px-4 text-sm">
                    Nenhum documento encontrado.
                </Command.Empty>
                {data?.map((document) => {
                    return (
                        <Command.Item
                            key={document.id}
                            onSelect={() => handleOpenDocument(document)}
                            className="text-rotion-50 hover:bg-rotion-700 aria-selected:!bg-rotion-600 flex items-center gap-2 py-3 px-4 text-sm"
                        >
                            <File className="h-4 w-4" />
                            {document.title}
                        </Command.Item>
                    );
                })}
            </Command.List>
        </Command.Dialog>
    );
}
