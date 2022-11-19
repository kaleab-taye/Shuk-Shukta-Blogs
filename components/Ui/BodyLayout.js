import Footer from './Footer';

export default function BodyLayout({ leftContent, children, rightContent }) {
  return (
    <div className=" sticky min-h-[95vh] top-12 grid grid-cols-12 max-w-contentWid 2xl:max-w-contentWidLg m-auto">
      <div className="h-96 sticky top-96  mb-auto hidden lg:inline-flex lg:col-span-2">
        <div className="  mt-auto mx-auto">
          {leftContent}
          <Footer />
        </div>
      </div>
      <div className="col-span-12 lg:col-span-7 ">
        <div className="m-auto max-w-blogCardWid 2xl:max-w-contentWidLg">
          {children}
        </div>
      </div>
      <div className=" mt-5 sticky top-20 mb-auto hidden lg:inline-flex lg:col-span-3">
        {rightContent}
      </div>
    </div>
  );
}

BodyLayout.defaultProps = {
  leftContent: '',
  centerContent: 'center',
  rightContent: '',
};

// <div className="h-96 sticky top-96  mb-auto hidden lg:inline-flex lg:col-span-2">
//         <div className="  mt-auto mx-auto">
//           {props.leftContent}
//           <Footer />
//         </div>
//       </div>
