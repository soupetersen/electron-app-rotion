import { MagnifyingGlass } from "phosphor-react";
import { useState } from "react";
import { SearchBar } from "../SearchBar";

export function Search() {
    const [searchBarOpen, setSearchBarOpen] = useState(false);

    function handleOpen(isOpen: boolean) {
        setSearchBarOpen(isOpen);
    }

    return (
        <>
            <button
                onClick={() => handleOpen(true)}
                className="flex mx-5 items-center gap-2 text-rotion-100 text-sm hover:text-rotion-50"
            >
                <MagnifyingGlass className="w-5 h-5" />
                Search
            </button>
            <SearchBar open={searchBarOpen} onOpen={handleOpen} />
        </>
    );
}
