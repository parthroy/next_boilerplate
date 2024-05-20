import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { login, logout, getAuthState } from "../store/auth";
import { useSelector } from "react-redux";
import { unwrapResult } from '@reduxjs/toolkit';

export const useAuth = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const authState = useSelector(getAuthState);

  const handleLogin = async (credentials: { email: string; password: string }) => {


    try{
    const resultAction = await dispatch(login(credentials));
    const originalPromiseResult = unwrapResult(resultAction);
    router.push("/home"); // Navigate to home page on successful login
  } catch (rejectedValueOrSerializedError) {
    console.error(rejectedValueOrSerializedError);
  }
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login"); // Navigate to login page on logout
  };

  useEffect(() => {
    if (!authState.isAuth && router.pathname !== "/login") {
      router.push("/login");
    }
  }, [authState.isAuth, router.pathname]);

  return {
    authState,
    handleLogin,
    handleLogout,
  };
};
