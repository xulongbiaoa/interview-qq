import React from 'react';
import './index.scss';
interface ISvgIcon {
  iconName: string;
  className: string;
  size: 'sm' | 'md' | number;
  clickable: boolean;
}
const SvgIcon: React.FC<ISvgIcon> = ({
  iconName,
  className = '',
  size = 'sm', // size 支持预定义类型传字符串如： size="sm"、size="md"，也支持自定义像素大小传number类型如：size={20}
  clickable = false,
}) => {
  const isCustomSize = typeof size === 'number';
  const style = isCustomSize ? { fontSize: size } : {};
  return (
    <svg
      className={`svg-icon ${!isCustomSize ? size : ''} ${
        clickable ? 'clickable' : ''
      } ${className}`}
      aria-hidden="true"
      style={style}
    >
      <use xlinkHref={`#${iconName}`} />
    </svg>
  );
};
export default React.memo(SvgIcon);
