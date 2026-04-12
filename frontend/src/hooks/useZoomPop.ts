import { useEffect, useRef, useState } from "react";

export function useZoomPop(threshold = 0.12) {
    const ref = useRef<HTMLDivElement>(null);
    const [popped, setPopped] = useState(false);

useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
        ([e]) => {
        if (e.isIntersecting) {
            setPopped(true);
            obs.disconnect();
        }
    },
        { threshold, rootMargin: "-40px" }
    );

    obs.observe(el);
    return () => obs.disconnect();
}, [threshold]);

    return { ref, popped };
}