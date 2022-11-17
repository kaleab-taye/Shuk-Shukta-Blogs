import React from 'react';

export default function InputField({
  className,
  valueState,
  onChangeSetterState,
  formValidatorFunc = () => {},
  errorState = '',
  placeholder,
  id,
  errorStateSetter,
}) {
  return (
    <div className={className + ' '}>
      <input
        className="border border-secondary rounded py-1 px-3 text-sm "
        placeholder={placeholder}
        id={id}
        // value={valueState}
        onChange={(e) => {
          onChangeSetterState((a) => e.target.value);
        }}
        onInput={() => formValidatorFunc()}
      />
      <span className="mr-auto text-failure text-xs bg-red-500 h-0 col-span-5">
        {errorState.length > 1 ? errorState : null}
      </span>
    </div>
  );
}
