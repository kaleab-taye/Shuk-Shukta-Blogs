
export default function Button(props) {

var classDesign =props.background+' '+ props.color+' '+props.margin + ' '+props.width + ' '+" cursor-pointer flex px-6 py-2 rounded"+' ' + props.className;
  return (
    <div className= {classDesign}>
    <div className='text-xl md:text-2xl m-auto font-bold flex gap-1 sm:gap-4'>
    {props.icon}
    {props.placeholder}
    </div>
    </div>
  );
}

Button.defaultProps = {
  placeholder: 'Button',
  width : 'w-1/2 md:w-1/3',
  margin : 'm-auto',
  color : 'text-primary',
  background : 'bg-accent',
  icon : ''
};
