export default function Button_comp({
  placeholder,
  type,
  className,
  children,
  data_tip,
}) {
  return (
    <button
      placeholder={placeholder}
      className={
        className +
        ' ' +
        'grid m-auto px-2 py-1 border border-2 border-textColor1 hover:bg-textColor1 hover:text-primary hover:shadow-lg rounded-md  font-medium text-textColor1'
      }
      type={type}
      data-tip={data_tip}
    >
      {children}
    </button>
  );
}
