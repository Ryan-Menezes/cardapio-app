import { useState } from 'react';
import './App.css'
import { Card } from './components/card';
import { useFoodData } from './hooks/useFoodData';
import { CreateModal } from './components/create-modal';

function App() {
  const { data } = useFoodData();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(prev => !prev);
  }

  return (
    <div className="container">
      <h1>Cardápio</h1>

      <button onClick={handleOpenModal}>Novo</button>

      <div className="card-grid">
        {data?.map(food => <Card
          key={food.id}
          price={food.price}
          title={food.title}
          image={food.image}
        />)}
      </div>

      {isModalOpen && <CreateModal closeModal={handleOpenModal} />}
    </div>
  )
}

export default App
