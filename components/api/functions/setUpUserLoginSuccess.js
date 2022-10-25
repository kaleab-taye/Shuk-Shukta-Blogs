import React from 'react';

export default function setUpUserLoginSuccess(user) {
  // localStorage.getItem(user.id)

  localStorage.setItem('user', JSON.stringify(user));

  return;
}
