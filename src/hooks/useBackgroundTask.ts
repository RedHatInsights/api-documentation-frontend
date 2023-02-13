import {DependencyList, useEffect, useState} from "react";

export type BackgroundTaskState<T> = {
    loading: true
} | {
    loading: false;
    value: T
};

export const useBackgroundTask = <T>(callback: () => T, deps?: DependencyList): BackgroundTaskState<T> => {
    const [state, setState] = useState<BackgroundTaskState<T>>({
        loading: true
    });

    useEffect(() => {
        (async () => {
            const value = callback();
            setState({
                loading: false,
                value
            });
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, deps ?? [callback]);

    return state;
}
