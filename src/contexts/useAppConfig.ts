import { useContext } from 'react';
import { AppConfigContext } from './appConfigContextObject';

export const useAppConfig = () => {
  const context = useContext(AppConfigContext);
  if (!context) throw new Error('useAppConfig must be used within an AppProvider');
  return context;
};
