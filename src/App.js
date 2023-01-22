import React from 'react';
import { Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      setIsLoading(true)
      const cartResponse = await axios.get('https://63c590a5f3a73b347859655a.mockapi.io/cart');
      // const favoritesResponse = await axios.get('https://63c590a5f3a73b347859655a.mockapi.io/favorites'); // Не прогружается фавориты, т.к нет апи
      const itemsResponse = await axios.get('https://63c590a5f3a73b347859655a.mockapi.io/items');

      setIsLoading(false)


      setCartItems(cartResponse.data)
      // setFavorites(favoritesResponse.data) // Не прогружается фавориты, т.к нет апи
      setItems(itemsResponse.data)
    }

    fetchData()
  }, []);

  const onAddToCart = (obj) => {
    if (cartItems.find((item) => (item.id) === (obj.id))) { // Numbers если убрать, то товар исчезает, но в бэке остаётся
      axios.delete(`https://63c590a5f3a73b347859655a.mockapi.io/cart/${obj.id}`);
      setCartItems((prev) => prev.filter((item) => (item.id) !== (obj.id))) // Numbers если убрать, то товар исчезает, но в бэке остаётся
    } else {
      axios.post('https://63c590a5f3a73b347859655a.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`https://63c590a5f3a73b347859655a.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const onAddToFavorite = async (obj) => {
    try {
      if (favorites.find((favObj) => favObj.id === obj.id)) {
        // axios.delete(`https://63c590a5f3a73b347859655a.mockapi.io/favorites/${obj.id}`); Не прогружается фавориты, т.к нет апи
      } else {
        // const { data } = await axios.post('https://63c590a5f3a73b347859655a.mockapi.io/favorites', obj); Не прогружается фавориты, т.к нет апи
        // setFavorites((prev) => [...prev, data]);
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты');
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className="wrapper clear">
      {cartOpened && (
        <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
      )}

      <Header onClickCart={() => setCartOpened(true)} />

      <Routes>
        <Route path="" element={<Home
          items={items}
          cartItems={cartItems}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          onChangeSearchInput={onChangeSearchInput}
          onAddToFavorite={onAddToFavorite}
          onAddToCart={onAddToCart}
          isLoading={!items.length}
        />}
        />
        <Route path="favorites" element={<Favorites items={favorites} onAddToFavorite={onAddToFavorite} />} />
      </Routes>
    </div >
  );
}

export default App;