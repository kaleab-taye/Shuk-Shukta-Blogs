import React from 'react';

export default function upload() {

  return (
    <div className="grid m-auto mt-10 p-2 max-w-contentWid bg-secondary">
      <form id="signupForm" action='/api/upload' method='post' encType='multipart/form-data'>
        <div className="">
          <label htmlFor="file" required>
            profile picture{' '}
          </label>
          <input
            type="file"
            id="file"
            name="file"
            required
          ></input>
        </div>
        <button
          type="submit"
          placeholder="Submit"
          className="flex px-3 py-1 m-auto text-primary bg-green-400"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
