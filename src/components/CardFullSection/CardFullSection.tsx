
import { Card } from '..';

import './CardFullSection.styles.css';

export const CardFullSection = (props) => {
  const { title, data, children } = props;


  return (
    <div className="main__full">
      <div className="main__full--header">
        <h2>{title}</h2>
      </div>
      <div className="main__full--main">
        {children && children}
        {data && data.map((e, index) => <Card data={e} key={index} />)}
      </div>
    </div>
  );
};
