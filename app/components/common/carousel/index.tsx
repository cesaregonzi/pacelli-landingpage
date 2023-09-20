'use client';

import clsx from 'clsx';
import { useCallback, useRef, useState } from 'react';
import { useDebounce } from 'usehooks-ts';

interface CarouselProps {
  className?: string;
  data?: any[];
  renderItem?: (item?: any, index?: number, active?: boolean) => React.ReactNode;
  renderIndicator?: (item?: any, index?: number, active?: boolean, onClick?: any) => React.ReactNode;
  indicatorClassName?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  className = '',
  data = [],
  renderItem,
  renderIndicator,
  indicatorClassName = '',
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const debounceIndex = useDebounce(currentIndex, 20);

  const onIndicatorClick = (id: string, index: number = 0) => {
    if (carouselRef.current) {
      console.log(document.getElementById(id)?.offsetLeft);
      carouselRef.current.scrollTo({ left: document.getElementById(id)?.offsetLeft });
      setCurrentIndex(index);
    }
  };

  const defaultRenderIndicator: (
    item?: any,
    index?: number,
    active?: boolean,
    onClick?: (id: string, index?: number) => void
  ) => React.ReactNode = useCallback(
    (item: any, index?: number, active?: boolean, onClick?: (id: string, index?: number) => void) => (
      <span
        key={`indicator-${item.id}`}
        onClick={() => (onClick ? onClick(item.id, index) : onIndicatorClick(item.id, index))}
        className="py-1 w-10 cursor-pointer"
      >
        <span
          className={clsx('h-0.5 inline-block w-10 cursor-pointer shadow', active ? 'bg-white' : 'bg-gray-400')}
        ></span>
      </span>
    ),
    []
  );

  return (
    <>
      <div
        ref={carouselRef}
        className={clsx('carousel w-full h-full', className)}
        onScroll={(e) => {
          const scrollLeft = (e.target as HTMLDivElement).scrollLeft;
          // const scrollWidth = (e.target as HTMLDivElement).scrollWidth;
          const clientWidth = (e.target as HTMLDivElement).clientWidth;
          // const scrollRight = scrollWidth - scrollLeft - clientWidth;
          const index = Math.round(scrollLeft / clientWidth);
          setCurrentIndex(index);
        }}
      >
        {data.map((item, index) =>
          renderItem ? (
            renderItem(item, index)
          ) : (
            <div id={item.id} key={item.id} className="carousel-item w-full">
              <img src={item.src} className="w-full object-cover object-center" />
            </div>
          )
        )}
      </div>
      <div className={clsx('absolute z-100 bottom-24 left-0 w-full', indicatorClassName)}>
        <div className={clsx('base-container flex justify-start py-2 gap-2')}>
          {data.map((item, index) =>
            (renderIndicator ?? defaultRenderIndicator)(item, index, index === debounceIndex, onIndicatorClick)
          )}
        </div>
      </div>
    </>
  );
};

export default Carousel;
