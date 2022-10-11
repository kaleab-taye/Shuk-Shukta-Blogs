export default function Button(props) {
  var classDesign =
    props.background +
    ' ' +
    props.color +
    ' ' +
    props.margin +
    ' ' +
    props.width +
    ' ' +
    ' cursor-pointer flex px-6 py-2 rounded disabled:opacity-60 ' +
    ' ' +
    ' ' +
`shadow-${props.color}`
    ' '
    +
    props.className;
  return (
    <button onClick={props.onClick} type={props.type} className={classDesign} disabled={props.disable} >
      <div className="hover:drop-shadow-xl text-2xl md:text-3xl  m-auto font-bold flex gap-1 sm:gap-4"> 
        {props.icon}
        {props.placeholder}
      </div>
    </button>
  );
}

Button.defaultProps = {
  placeholder: 'Button',
  width: 'w-1/2 md:w-1/3',
  margin: 'm-auto',
  color: 'text-primary',
  background: 'bg-accent',
  icon: '',
};
