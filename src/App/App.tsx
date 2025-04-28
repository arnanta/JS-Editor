import ViewContextWrapper from '@/contexts/View/ViewContext';
import style from './App.module.css';

import Header from '@/Header';

function App() {
  return (
    <div className={style.container}>
      <ViewContextWrapper>
        <Header />
      </ViewContextWrapper>
    </div>
  );
}

export default App;
