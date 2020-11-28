import React, { useEffect, useState } from "react";
import { handleBottomScroll } from "../services/utilities";
import { showLoader } from "../actions/baseActions";
import { useDispatch } from "react-redux";

const InfinityScrollHook = (props) => {
    const {children, onBottom, onUnmount} = props;
    const [isBottom, setIsBottom] = useState(false);
    const [offset, setOffset] = useState(1);
    const [loadEnd, setLoadEnd] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showLoader());
        onBottom(offset).finally(() => {
            setOffset(offset => offset + 1)
            dispatch(showLoader(false));
        });

        window.addEventListener("scroll", () => handleBottomScroll(() => setIsBottom(true)));

        return () => {
            onUnmount && onUnmount();
            window.removeEventListener("scroll", () => handleBottomScroll(() => setIsBottom(true)));
        };
    }, []);

    useEffect(() => {
        if (isBottom && !loadEnd) {
            onBottom(offset)
                .then(data => {
                    if (!data) {
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
