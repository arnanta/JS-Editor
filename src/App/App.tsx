import ViewContextWrapper from '@/contexts/View/ViewContext';
import style from './App.module.css';

import Container from '@/container/Container';

function App() {
  return (
    <div className={style.container}>
      <ViewContextWrapper>
        <Container />
      </ViewContextWrapper>
    </div>
  );
}

export default App;
