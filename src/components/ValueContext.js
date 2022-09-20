import React, { useState, useContext, createContext } from "react";

const ValueContext = createContext(null)

const ValueProvider = ({value, children}) => {

  return (
    <ValueContext.Provider
        value={value} >
      {children}
    </ValueContext.Provider>
   )
}

export default ValueProvider
export const useValue = () => useContext(ValueContext)