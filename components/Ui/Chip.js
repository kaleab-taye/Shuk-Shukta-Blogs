import { useEffect, useState } from 'react';

export default function Chip({ text, selectedSetter, selected,disabled=false }) {
  const [clickedState, setClickedState] = useState(false);
  let handleClick = () => {
    // setClickedState(() => !clickedState);
    if (clickedState === false && !disabled) {
      setClickedState(!clickedState);
      selectedSetter([...selected, text]);
    } else if (clickedState === true && !disabled) {
      setClickedState(!clickedState);

      const filteredList = selected.filter((item) => item !== text);
      selectedSetter(filteredList);
    }

  };
  const clickedStateClass =
    'text-textColor1 border-[1.9px] border-textColor1 rounded-full px-3';
  const notClickedStateClass =
    'text-textColor3 border-[1.9px] border-textColor3 rounded-full px-3';
  
    useEffect(()=>{
        if(!selected.includes(text)){
            setClickedState(false)
        }
        if(selected.includes(text)){
            setClickedState(true)
        }
    },[selected])
  
    return (
    <div className="text-sm cursor-pointer w-fit text-center m-1">
      <div
        className={clickedState ? clickedStateClass : notClickedStateClass}
        onClick={() => handleClick()}
      >
        {text}
      </div>
    </div>
  );
}
