### Como configurar o Redux

1. Instalar `redux` e `react-redux`
2. Criar uma pasta `store` com um `index.js`:

```javascript
import { createStore } from 'redux';

import rootReducer from './modules/rootReducer';

const store = createStore(rootReducer);

export default store;
```

3. Dentro da pasta `store` criar uma pasta `modules` onde vão ficar cada um dos seus modules/estados.
4. Exemplo de módulo é a pasta `cart` que pode conter o reducer em `reducer.js`:

```javascript
export default function cart() {
  return [];
}
```

5. Dentro da pasta `modules`, criar um `rootReducer.js` para combinar todos os reducers:

```javascript
import { combineReducers } from 'redux';

import cart from './cart/reducer';

export default combineReducers({
  cart,
});
```
