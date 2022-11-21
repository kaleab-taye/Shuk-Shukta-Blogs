import Button_comp from '../Button_comp';
import InputField from '../../InputField';
import Chip from '../Chip';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

export default function ChipSection({
  chipTitle,
  options,
  selectedSetter = () => {},
  selected = [],
  disabled = false,
}) {
  return (
    <div>
      <div className="w-full grid gap-0">
        {chipTitle ? (
          <div className="text-sm text-textColor3 pb-2">{chipTitle}</div>
        ) : null}
        <div className="flex flex-wrap gap-0 grid-col-auto">
          {options.map((option) => (
            <Chip
              key={option}
              text={option}
              selectedSetter={selectedSetter}
              selected={selected}
              disabled={disabled}
            />
          ))}
          {selected.length > 0 ? (
            <div
              onClick={() => selectedSetter('')}
              className="flex gap-2 text-sm cursor-pointer w-fit text-center m-1 text-textColor3 border-[1.9px] border-textColor3 rounded-full px-3"
            >
              <FontAwesomeIcon className="w-2 m-auto" icon={faX} />
              <span> clear</span>{' '}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
