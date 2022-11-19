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
    <div className={className + ' grid '}>
      <input
        className="border border-secondary rounded py-1 px-3 text-sm w-full"
        placeholder={placeholder}
        id={id}
        // value={valueState}
        onChange={(e) => {
          onChangeSetterState((a) => e.target.value);
        }}
        onInput={() => formValidatorFunc()}
      />
      <span className="mr-auto text-failure text-xs  ">
        {errorState.length > 1 ? errorState : null}
      </span>
    </div>
  );
}
