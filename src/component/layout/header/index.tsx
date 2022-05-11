import React, { useState } from 'react';
import { Menu, Button, Layout } from 'antd';
import "./header.scss";
const isImg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?/;
const getChildrenToRender = (item, i): React.ReactNode => {
  let tag = item.name.indexOf('title') === 0 ? 'h1' : 'div';
  tag = item.href ? 'a' : tag;
  let children = typeof item.children === 'string' && item.children.match(isImg)
    ? React.createElement('img', { src: item.children, alt: 'img' })
    : item.children;
  if (item.name.indexOf('button') === 0 && typeof item.children === 'object') {
    children = React.createElement(Button, {
      ...item.children
    });
  }
  return React.createElement(tag, { key: i.toString(), ...item }, children);
};

const { Item, SubMenu } = Menu;


const Header: React.FC = () => {


  return <Layout.Header className='header'>
    <img src="https://os.alipayobjects.com/rmsportal/mlcYmsRilwraoAe.svg" ></img>
  </Layout.Header>





}

export default Header;
