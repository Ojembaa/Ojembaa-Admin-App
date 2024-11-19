"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface IModalContextProps {
  isShowModal?: boolean;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
}

const ToggleModal = createContext<IModalContextProps>({
  setIsShowModal: () => true,
  isShowModal: false,
});

export const ToggleModalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isShowModal, setIsShowModal] = useState(false);

  return (
    <ToggleModal.Provider
      value={{
        isShowModal,
        setIsShowModal,
      }}
    >
      {children}
    </ToggleModal.Provider>
  );
};

export const useToggleModalContext = () => useContext(ToggleModal);
