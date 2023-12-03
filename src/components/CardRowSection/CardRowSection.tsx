import { useEffect, useState } from 'react';

import { Card } from '..';
import { Loading } from '..';

import { useContainerDimensions } from '../../utils';

import './CardRowSection.styles.css';

export const CardRowSection = (props: { title: any; data: any; }) => {
  const { title, data } = props;
  const [itensLength, setItensLength] = useState(0);
  const [newArray, setNewArray] = useState(
    data.filter((e:any, index:any) => index < itensLength - 1),
  );
  const { dimensions, ref } = useContainerDimensions();
  useEffect(() => {
    if (itensLength < 2) {
      const filteredData = data.filter((e: number) => e === 0);
      setNewArray(filteredData);
    } else if (data) {
      const newData = data.filter((e: any, index: number) => index < itensLength - 1);
      setNewArray(newData);
    }
  }, [itensLength, data]);
  useEffect(() => {
    setItensLength(Math.floor(dimensions.width / 204) + 1);
  }, [dimensions]);



  return (
    <div ref={ref} className="main__row">
      
      <div className="main__row--header">
        
        <h2>{title
        }</h2>
      </div>
      <div className="main__row--main">
      
        {newArray ? (
          newArray.map((e: any, index: any) => <Card data={e} key={index} />)
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};
