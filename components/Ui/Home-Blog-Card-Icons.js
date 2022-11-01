import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

export default function HomeBlogCardIcons({
  icon,
  data,
  data_tip,
  data_data_tip,
  icon_data_tip,
  className,
  onClick,
  theme,
  color,
}) {
  return (
    <div data-tip={data_tip} className={`grid grid-flow-col gap-1  m-auto `}>
      <FontAwesomeIcon
        icon={icon}
        className={
          ' max-w-iconWid w-4 h-4 m-auto ' +
          ` ` +
          `${className}` +
          ' ' +
          (theme === 'selected' ? color : 'text-textColor2')
        }
        onClick={onClick}
        data-tip={icon_data_tip}
      />
      <div
        data-tip={data_data_tip}
        className={
          'm-auto p-1 ' +
          ' ' +
          (theme === 'selected' ? color : 'text-textColor3') +
          ' ' +
          (theme === 'selected' ? 'font-bold' : null)
        }
      >
        {data}
      </div>
    </div>
  );
}

HomeBlogCardIcons.defaultProps = {
  color: 'text-textColor3',
};
