import Button_comp from '../Button_comp';
import InputField from '../../InputField';
import Chip from '../Chip';
import { useEffect } from 'react';

export default function ChipSection({ options, selectedSetter,selected }) {
  
  return (
    <div>
      <div className="w-full grid gap-2">
        <div className="flex flex-wrap gap-0 grid-col-auto">
          {options.map((option) => (
            <Chip key={option} text={option} selectedSetter={selectedSetter} selected={selected} />
          ))}
        </div>
        
      </div>
    </div>
  );
}
