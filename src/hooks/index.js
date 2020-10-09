import { useContext } from 'react';
import { LanguageContext } from '../contexts/LanguageContext';
import { ViewModelsContext } from '../contexts/ViewModelsContext';

export const useViewModels = () => useContext(ViewModelsContext);
export const useLocale = () => useContext(LanguageContext);
