import React from "react";
import Services from "./services";

export const ServicesContext: React.Context<Services> =
  React.createContext(null);

interface ServicesProviderProps {
  services: Services;
  children: JSX.Element;
}

/**
 * Провайдер Services.
 */
const ServicesProvider: React.FC<ServicesProviderProps> = ({
  services,
  children,
}): JSX.Element => {
  return (
    <ServicesContext.Provider value={services}>
      {children}
    </ServicesContext.Provider>
  );
};

export default React.memo(ServicesProvider);
