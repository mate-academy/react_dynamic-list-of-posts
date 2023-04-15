import { useState } from 'react';
import { LoadStage } from '../types/LoadStage';

type DataLoaderType = [
  LoadStage,
  (handleDataLoad: () => Promise<void>) => void,
];

export const useDataLoader = (): DataLoaderType => {
  const [loadStage, setLoadStage] = useState(LoadStage.Uninitialized);

  const loadData = (handleDataLoad: () => Promise<void>) => {
    setLoadStage(LoadStage.Loading);

    handleDataLoad()
      .then(
        () => setLoadStage(LoadStage.Success),
        () => setLoadStage(LoadStage.Error),
      );
  };

  return [loadStage, loadData];
};
