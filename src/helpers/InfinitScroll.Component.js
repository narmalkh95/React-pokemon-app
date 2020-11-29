import React, { useEffect, useState } from "react";
import { handleBottomScroll } from "../services/utilities";

const InfinityScrollHook = (props) => {
    const {children, onBottom, onUnmount, initialData} = props;
    const [isBottom, setIsBottom] = useState(false);
    const [offset, setOffset] = useState(0);
    const [loadEnd, setLoadEnd] = useState(false);

    useEffect(() => {
        if (!initialData) {
            //Get data if not already exists on first rend
            onBottom(offset).finally(() => {
                setOffset(offset => offset + 1)
            });
        }

        window.addEventListener("scroll", () => handleBottomScroll(() => setIsBottom(true)));

        return () => {
            onUnmount && onUnmount();
            window.removeEventListener("scroll", () => handleBottomScroll(() => setIsBottom(true)));
        };
    }, []);

    useEffect(() => {
        if (isBottom && !loadEnd) {
            onBottom(offset)
                .then(dataLength => {
                    if (!dataLength) {
                        setLoadEnd(true);
                        return
                    }
                    setOffset(offset => offset + 1)
                })
                .finally(() => setIsBottom(false));
        }
    }, [isBottom]);

    return (
        <div>
            {children}
        </div>
    );
}


export default InfinityScrollHook;
