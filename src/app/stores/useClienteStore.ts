import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ICliente {
  idCliente: number;
  dataNasc: string;
  setIdCliente: (id: number) => void;
  setDataNasc: (data: string) => void;
}

const useClienteStore = create(
  persist<ICliente>(
    (set) => ({
      idCliente: 0,
      dataNasc: "",
      setIdCliente: (id) => set({ idCliente: id }),
      setDataNasc: (data) => set({ dataNasc: data }),
    }),
    { name: "cliente" }
  )
);

export default useClienteStore;
