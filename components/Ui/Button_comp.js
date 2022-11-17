export default function Button_comp({
  placeholder,
  type,
  className,
  children,
  data_tip,
  paddingX,
  onClick,
}) {
  return (
    <button
      onClick={()=>onClick()}
      placeholder={placeholder}
      className={
        className +
        ' ' +
        'grid m-auto  py-1 border border-2 border-textColor1 hover:bg-textColor1 hover:text-primary hover:shadow-lg rounded-md  font-medium text-textColor1' +
        ' ' +
        paddingX
      }
      type={type}
      data-tip={data_tip}
    >
      {children}
    </button>
  );
}

Button_comp.defaultProps = { paddingX: 'px-2', onClick: () => {} };
