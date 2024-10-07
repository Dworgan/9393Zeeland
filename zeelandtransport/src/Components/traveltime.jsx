import { useSelector } from 'react-redux';
import { Button } from './Button';

export function TravelTime() {
  const traverlTime = useSelector((state) => state.plan.time);
  return (
    <div className='display-flex  flex-align-items-center'>
      <div className='flex1'>
        <Button size={'small'} selected={true}>
          Vertrek
        </Button>
      </div>
      <div className='flex1 h3 text-align-center'>{traverlTime}</div>
    </div>
  );
}
