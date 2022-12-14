import clsx from "clsx";
import { Code, CaretDoubleRight, TrashSimple } from "phosphor-react";
import * as Breadcrumbs from "./Breadcrumbs";
import * as Collapsible from "@radix-ui/react-collapsible";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Document } from "~/src/shared/types/ipc";

interface HeaderProps {
    isSidebarOpen: boolean;
}

export function Header({ isSidebarOpen }: HeaderProps) {
    const { id } = useParams<{ id: string }>();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const isMacOS = process.platform === "darwin";

    const { mutateAsync: deleteDocument, isLoading: isDeleting } = useMutation(
        async () => {
            await window.api.deleteDocument({ id: id! });
        },
        {
            onSuccess: () => {
                queryClient.setQueryData<Document[]>(
                    ["documents"],
                    (document) => document?.filter((doc) => doc.id !== id)
                );
                navigate("/");
            },
        }
    );

    return (
        <div
            id="header"
            className={clsx(
                "border-rotion-600 duration-250 region-drag flex items-center gap-4 border-b py-[1.125rem] px-6 leading-tight transition-all",
                {
                    "pl-24": !isSidebarOpen && isMacOS,
                    "w-screen": !isSidebarOpen,
                    "w-[calc(100vw-240px)]": isSidebarOpen,
                }
            )}
        >
            <Collapsible.Trigger
                className={clsx(
                    "text-rotion-200 hover:text-rotion-50 h-5 w-5",
                    {
                        hidden: isSidebarOpen,
                        block: !isSidebarOpen,
                    }
                )}
            >
                <CaretDoubleRight className="h-4 w-4" />
            </Collapsible.Trigger>

            {id && (
                <>
                    <Breadcrumbs.Root>
                        <Breadcrumbs.Item>
                            <Code
                                weight="bold"
                                className="h-4 w-4 text-pink-500"
                            />
                            Estrutura t??cnica
                        </Breadcrumbs.Item>
                        <Breadcrumbs.Separator />
                        <Breadcrumbs.HiddenItems />
                        <Breadcrumbs.Separator />
                        <Breadcrumbs.Item>Back-end</Breadcrumbs.Item>
                        <Breadcrumbs.Separator />
                        <Breadcrumbs.Item isActive>Untitled</Breadcrumbs.Item>
                    </Breadcrumbs.Root>

                    <div className="region-no-drag inline-flex">
                        <button
                            onClick={() => deleteDocument()}
                            disabled={isDeleting}
                            className="text-rotion-100 hover:text-rotion-50 inline-flex items-center gap-1 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <TrashSimple className="h-4 w-4" />
                            Apagar
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}
