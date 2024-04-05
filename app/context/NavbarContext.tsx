"use client"
import { createContext, useContext, useState } from 'react';

const NavbarContext = createContext({});

export const NavbarProvider = ({ children }: any) => {
  const [searchCountry, setSearchCountry] = useState('');
  const [filterContinent, setFilterContinent] = useState('Filter by Region');

  return (
    <NavbarContext.Provider value={{ searchCountry, setSearchCountry, filterContinent, setFilterContinent }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => useContext(NavbarContext);
