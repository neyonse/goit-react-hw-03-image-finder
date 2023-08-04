import React from 'react';
import css from './Button.module.css';
import { ThreeDots } from 'react-loader-spinner';

export default function Button({ onClick, showLoader }) {
  return (
    <button className={css.button} type="button" onClick={onClick}>
      {showLoader ? (
        <ThreeDots height="12" color="#fff" />
      ) : (
        <span>Load more</span>
      )}
    </button>
  );
}
