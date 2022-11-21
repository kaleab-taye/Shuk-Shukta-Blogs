import React, { useContext, useEffect, useState } from 'react';
import { blogsContext } from '../BlogContextProvider';
import HomeBlogCard from './Home-Blog-Card';
import NoBlogAvailable from '../NoBlogAvailable';
import BodyLayout from './BodyLayout';
import ChipSection from './section/ChipSection';
import { categoryList } from '../tempData/category';

export default function Blog_List() {
  const blogs = useContext(blogsContext);
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);

  const [selectedBlogs, setSelectedBlogs] = useState(blogs);
  useEffect(() => {
    let newBlogs = [];
    blogs.map((blog) => {
      let validCategory = false;
      for (let cat in blog.category) {
        if (
          selectedCategoryList.length == 0 ||
          selectedCategoryList.includes(
            blog.category[cat] || blog.category[cat].length === 0
          )
        ) {
          validCategory = true;
        }
      }
      if (validCategory) {
        newBlogs.push(blog);
      }
    });

    setSelectedBlogs(newBlogs);
  }, [selectedCategoryList, blogs]);

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
          selectedBlogs.length > 0 ? (
            <div>
              {selectedBlogs.map((blog) => {
                // category filtering

                return (
                  <>
                    <HomeBlogCard blog={blog} />
                  </>
                );
              })}
            </div>
          ) : (
            <NoBlogAvailable text=" try different category" />
          )
        ) : (
          <NoBlogAvailable />
        )}
      </BodyLayout>
    </>
  );
}
// <Link href={`blogs/${blog.id}`} key={blog.id}>
//               <a id={blog.id}></a>
