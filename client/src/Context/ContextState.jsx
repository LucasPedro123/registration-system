import React, { createContext, useState } from 'react';

// Crie o contexto
const MyContext = createContext();

// Crie o provedor de contexto
export const MyProvider = ({ children }) => {
    const [isPopupActive, setIsPopupActive] = useState(false);
    const [authorizedLogin, setAuthorizedLogin] = useState(false);


    return (
        <MyContext.Provider value={{ isPopupActive, setIsPopupActive, authorizedLogin, setAuthorizedLogin }}>
            {children}
        </MyContext.Provider>
    );
};

export default MyContext;
