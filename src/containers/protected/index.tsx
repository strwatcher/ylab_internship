import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useSelector from "@src/hooks/use-selector";

interface ProtectedProps {
  redirect: string;
  children: JSX.Element;
}

const Protected: React.FC<ProtectedProps> = ({ redirect, children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const select = useSelector((state) => ({
    exists: state.session.exists,
    waiting: state.session.waiting,
  }));

  useEffect(() => {
    if (!select.exists && !select.waiting) {
      navigate(redirect, { state: { back: location.pathname } });
    }
  }, [select.exists, select.waiting]);

  return !select.exists || select.waiting ? (
    <div>Проверка доступа...</div>
  ) : (
    children
  );
};

export default React.memo(Protected);
