import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

/**
 * React Query를 사용하기 위해 QueryClient를 설정 /
 * 전역적인 상태를 관리하고 데이터 캐싱을 담당
 */
const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </React.StrictMode>,
);
