import Footer from './Footer';

export default function BodyLayout(props) {
  console.log('ggg', props);
  return (
    <div className=" sticky top-12 grid grid-cols-12 max-w-contentWid 2xl:max-w-contentWidLg m-auto">
      <div className="h-96 sticky top-96  mb-auto hidden lg:inline-flex lg:col-span-2">
        <div className="  mt-auto mx-auto">
          {props.leftContent}
          <Footer />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7 ">
        <div className="m-auto max-w-blogCardWid 2xl:max-w-contentWidLg">
          {props.children}
        </div>
      </div>
      <div className=" sticky top-20 mb-auto hidden lg:inline-flex bg-yellow-600 lg:col-span-3">
        {props.rightContent} 
      </div>
    </div>
  );
}

BodyLayout.defaultProps = {
  leftContent: '',
  centerContent: 'center',
  rightContent: 'right',
};

// <div className="h-96 sticky top-96  mb-auto hidden lg:inline-flex lg:col-span-2">
//         <div className="  mt-auto mx-auto">
//           {props.leftContent}
//           <Footer />
//         </div>
//       </div>
