import React, { useContext, useState } from 'react';
import { blogsContext } from '../BlogContextProvider';
import HomeBlogCard from './Home-Blog-Card';
import NoBlogAvailable from '../NoBlogAvailable';
import BodyLayout from './BodyLayout';
import ChipSection from './section/ChipSection';
import { categoryList } from '../tempData/category';

export default function Blog_List() {
  const blogs = useContext(blogsContext);
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);

  return (
    <>
      <BodyLayout
        rightContent={
          <ChipSection
            options={categoryList}
            selected={selectedCategoryList}
            selectedSetter={setSelectedCategoryList}
          />
        }
      >
        {blogs.length > 0 ? (
          <div>
            {blogs.map((blog) => {
              // category filtering 
              let validCategory = false;
              for (let cat in blog.category) {
                if (selectedCategoryList.length==0 || selectedCategoryList.includes(blog.category[cat])) {
                  validCategory = true;
                }
              }
              if (validCategory) {
                return (
                  <>
                    <HomeBlogCard blog={blog} />
                  </>
                );
              }
            })}
          </div>
        ) : (
          <NoBlogAvailable />
        )}
      </BodyLayout>
    </>
  );
}
// <Link href={`blogs/${blog.id}`} key={blog.id}>
//               <a id={blog.id}></a>
