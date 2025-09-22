import { useCallback, useEffect, useState } from "react";
import * as eventService from "../services/eventService";

const useEvent = () => {
    const [loading, setLoading] = useState(true);
    const [events, setEvents] = useState([]);

    const getAll = useCallback(async () => {
        let response = null;
        try {
            response = await eventService.getEvents();

            if (response.success) {
                setEvents(response.data);
            }

            return response.data;
        } catch (error) {
            throw error;
        }
    }, []);

    const create = useCallback(async (data) => {
        eventService.createEvent(data);
        await getAll();
    });

    useEffect(() => {
        const fetchData = async () => {
            await getAll();
            setLoading(false);
        };
        fetchData();
    }, []);
    return { loading, events, getAll, create };
};

export default useEvent;
