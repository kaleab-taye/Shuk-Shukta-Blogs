import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { blogsContext } from '../BlogContextProvider';
import HomeBlogCard from './Home-Blog-Card';
import NoBlogAvailable from '../NoBlogAvailable';
import BodyLayout from './BodyLayout';
import MyBlogCard from './My-Blog-Card';
import ChipSection from './section/ChipSection';
import { categoryList } from '../tempData/category';

export default function My_Blog_List({ userId, token }) {
  const blogs = useContext(blogsContext);
  const [selectedCategoryList, setSelectedCategoryList] = useState([]);
  const [availableCategoryList, setAvailableCategoryList] = useState([]);
  const [selectedBlogs, setSelectedBlogs] = useState(blogs);

  useEffect(() => {
    let catList = [];
    blogs.map((blog) => {
      var cats = blog.category.filter((cat) => !catList.includes(cat));
      catList.push(...cats);
    });
    setAvailableCategoryList(catList);
  }, [blogs]);

  useEffect(() => {
    let newBlogs = [];
    // console.log(blogs)
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
            options={availableCategoryList}
            selected={selectedCategoryList}
            selectedSetter={setSelectedCategoryList}
          />
        }
      >
        {blogs.length > 0 ? (
          <div>
            {selectedBlogs.map((blog) => {
              return (
                <>
                  <MyBlogCard userId={userId} token={token} blog={blog} />
                </>
              );
            })}
          </div>
        ) : (
          <NoBlogAvailable />
        )}
      </BodyLayout>
    </>
  );
}
