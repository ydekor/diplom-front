import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {App} from "./app/App";
import {BrowserRouter} from "react-router-dom";
import {ThemeProvider} from "./providers/ThemeProvider";
import {AppDataProvider} from "./shared/hooks/useApp";
import {ModalDataProvider} from "./shared/hooks/useModal";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <BrowserRouter>
          <ThemeProvider>
              <AppDataProvider>
                  <ModalDataProvider>
                      <App/>
                  </ModalDataProvider>
              </AppDataProvider>
          </ThemeProvider>
      </BrowserRouter>
  </React.StrictMode>
)
