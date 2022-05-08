import React from 'react';
import { useContext } from 'react';

import { createContext } from 'react';
import { useState } from 'react';
;
interface IContext {
  title: string,
  setTitle: (title: string) => void
}
const TitleContext = createContext<IContext>({ title: "", setTitle: () => { console.log("ready") } });
export const TitleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState('')

  return <TitleContext.Provider value={{ title, setTitle }}>
    {children}
  </TitleContext.Provider>

}

export const useTitle = () => {
  const { title, setTitle } = useContext(TitleContext);
  return { title, setTitle }
}

