import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectActivatedCategoryLabels } from '../redux/marketSlice';
import { getData } from '../redux/dataSlice';

const useInitData = () => {
  const dispatch = useDispatch();
  const activatedCategories = useSelector(selectActivatedCategoryLabels);
  useEffect(() => {
    console.log('activatedCategories');
    dispatch(getData());
  }, [dispatch, activatedCategories.length]);
};

export default useInitData;
