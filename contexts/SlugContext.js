import React, { createContext, useContext, useState } from "react";

export const SlugContext = createContext({ slug: "/", setSlug: () => {} });

export default function SlugProvider({ children }) {
  const [slug, setSlug] = useState("/");

  return (
    <SlugContext.Provider value={{ slug, setSlug }}>
      {children}
    </SlugContext.Provider>
  );
}

export const useSlugContext = () => {
  return useContext(SlugContext);
};
