import  { useEffect, useRef, useState } from 'react';
import './PageBanner.styles.css';
export const PageHeader = ({ bgColor, disabled, children }:any) => {
  const headerBgRef = useRef<any>(null);
  const headerGradientRef = useRef<any>(null);
  const [opacity, setOpacity] = useState(0);

  const opacityHandler = () => {
    const grandienInfo = headerGradientRef.current.getBoundingClientRect();
    const opacitiyPercent = (
      1 -
      ((grandienInfo.bottom - 64) * 100) / ((grandienInfo.height - 64) * 100)
    ).toFixed(2);
  

    if (opacitiyPercent as unknown as number >= 1) {
      setOpacity(1);
    } else setOpacity(opacitiyPercent as unknown as number);
  };

  useEffect(() => {
  
    headerBgRef.current.parentNode.addEventListener('scroll', () =>
      opacityHandler(),
    );
    return () => {
      headerBgRef.current?.parentNode.removeEventListener('scroll', () =>
        opacityHandler(),
      );
    };
  }, [headerBgRef]);
  return (
    <>
      <div className="page__header" ref={headerBgRef}>
        <div
          ref={headerGradientRef}
          className="pageBanner__header__gradient"
          style={{ backgroundColor: !disabled && bgColor }}
        ></div>
      </div>

      <div className="page__header__sticky">
        {children && <div className="page__header__nav">{children}</div>}
        <div
          className="page__header__sticky__color"
          style={{ backgroundColor: bgColor, opacity: opacity }}
        >
          <div className="pageBanner__header__sticky__gradient"></div>
        </div>
      </div>
    </>
  );
};
