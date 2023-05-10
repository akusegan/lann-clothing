import { Children, useState } from "react";
import { createContext, useContext, useEffect } from "react";

import { getCategoriesAndDocments } from "../../utils/firebase/firebase.utils";


export const CategoriesContext = createContext({
    categoriesMap: {},
});

export const CategoriesProvider = ({children}) => {
    const [categoriesMap, setCategoriesMap] = useState({});

    useEffect(() => {
        const getCategoriesMap = async () => {
            const categoryMap = await getCategoriesAndDocments();
            console.log (categoryMap);
            setCategoriesMap(categoryMap);
        }

        getCategoriesMap();
    }, [])

    const value = { categoriesMap }
    return (
        <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
    )
};

