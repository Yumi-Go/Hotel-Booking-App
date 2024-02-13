// SearchContext.js
import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export function useSearch() {
    return useContext(SearchContext);
}

export const SearchProvider = ({ children }) => {
    const [hotelName, setHotelName] = useState('');
    const [cityArea, setCityArea] = useState('');

    const value = {
        hotelName,
        setHotelName,
        cityArea,
        setCityArea
    };

    return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
};
