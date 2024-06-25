import './style.css';
import { FormEvent, useEffect, useState } from 'react';
import { useFoodDataMutate } from '../../hooks/useFoodDataMutate';
import { Food } from '../../interfaces/Food';

interface CreateModalProps {
  closeModal(): void;
}

interface InputProps {
  label: string;
  value: string | number;
  updateValue(value: unknown): void;
}

const Input = ({ label, value, updateValue }: InputProps) => {
  return (
    <>
      <label>{label}</label>
      <input type="text" value={value} onChange={e => updateValue(e.target.value)} />
    </>
  )
}

export function CreateModal({ closeModal }: CreateModalProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");

  const { mutate, isSuccess, isPending } = useFoodDataMutate();

  const submit = (e: FormEvent) => {
    e.preventDefault();

    if (isPending || !title || !price || !image) return;

    const food: Food = {
      title,
      price,
      image
    }

    mutate(food);
  }

  useEffect(() => {
    if (!isSuccess) return;
    closeModal();
  }, [isSuccess, closeModal])

  return (
    <div className="modal-overlay">
      <div className="modal-body">
        <h2>Cadastre um novo item no cardápio</h2>
        <form className="input-container" onSubmit={submit}>
          <Input label="Title" value={title} updateValue={setTitle} />
          <Input label="Price" value={price} updateValue={setPrice} />
          <Input label="Image" value={image} updateValue={setImage} />

          <button type="submit" className="btn-secondary">
            {isPending ? 'Postando...' : 'Postar'}
          </button>
        </form>
      </div>
    </div>
  )
}
