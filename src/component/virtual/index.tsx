import { throttle } from 'lodash';
import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import styles from './virturalList.module.scss';
interface IProps {
  data: any[]; // 渲染的数据
  count: number; // 列表的数量、长度
  size: number; // 可视区渲染的列表项数量(真实DOM节点数量)
  viewSize: number; // 可视区能看到的列表数量, 数值比size小, 即DOM比可见数量多, 具有缓冲作用
  rowHeight: number; // 每一行列表项的高度
  renderNode: (item: any, index: number) => React.ReactElement; // 渲染的列表项DOM节点
}

export const VirtrualList: React.FC<IProps> = ({
  data,
  count,
  size,
  viewSize,
  rowHeight,
  renderNode
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [startIndex, setStartIndex] = useState(0);

  const [startOffset, setStartOffset] = useState(0); // 渲染区域偏移量

  const phantomHeight = useMemo(() => {
    if (data.length < viewSize) {
      return { height: 0 };
    }
    return { height: rowHeight * count };
  }, [count, rowHeight, viewSize]);

  const getContainerHeight = useMemo(() => {
    return (data && data.length > viewSize) || (data && data.length === 0)
      ? { height: rowHeight * viewSize }
      : { height: rowHeight * data.length, overflow: 'hidden' };
  }, [data, rowHeight, viewSize]);
  const handleScroll = useCallback(
    throttle((e: any) => {
      const scrollTop = e.target.scrollTop;
      const offset = scrollTop - (scrollTop % rowHeight);
      const index = Math.floor(scrollTop / rowHeight);
      setStartOffset(offset);
      setStartIndex(index);
    }, 50),
    []
  );
  useEffect(() => {
    containerRef.current?.addEventListener('scroll', handleScroll);

    return () => {
      containerRef.current?.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={(ref) => {
          containerRef.current = ref;
        }}
        className={styles.container}
        style={getContainerHeight}
      >
        <div className={styles.phantom} style={phantomHeight}></div>
        <div className={styles.view} style={{ transform: `translateY(${startOffset}px)` }}>
          {data.slice(startIndex, startIndex + size).map((item, index) => {
            const child = renderNode(item, index);
            return React.cloneElement(child, { style: { height: rowHeight } });
          })}
        </div>
      </div>
    </>
  );
};
