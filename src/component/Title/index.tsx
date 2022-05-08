import React from 'react';
import { useContext } from 'react';

import { createContext } from 'react';
import { useState } from 'react';
import MetaTags from 'react-meta-tags';
interface IContext {
  title: string,
  setTitle?: (title: string) => void
}
const TitleContext = createContext<IContext>({ title: "" })
export const TitleProvider: React.FC<any> = ({ children }) => {
  const [title, setTitle] = useState('')

  return <TitleContext.Provider value={{ title, setTitle }}>
    <MetaTags>
      <title>{title}</title>
    </MetaTags>
    {children}
  </TitleContext.Provider>

}

export const useTitle = () => {
  const { title, setTitle } = useContext(TitleContext);
  return { title, setTitle }
}

