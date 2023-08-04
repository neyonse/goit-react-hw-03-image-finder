import { ThreeDots } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader}>
      <p className={css.loaderMessage}>Loading images... Please, wait.</p>
      <ThreeDots height="40" color="#3f51b5" />
    </div>
  );
}
