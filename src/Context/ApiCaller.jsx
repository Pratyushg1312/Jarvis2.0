import React, { createContext, useContext } from "react";
import GetDecodedToken from "../Utils/GetDecodedToken";
import {
  useGetAllUsersQuery,
  useGetUserAuthQuery,
  useGetUserDetailsByIdQuery,
  useLoginUserDataQuery,
} from "../Redux/Slices/UserSlices/UserApi";
import { useGetThemeQuery } from "../Redux/Slices/ThemeSlices/ThemeApi";
export const ApiCaller = createContext();

export const AuthEngine = ({ children }) => {
  const loginUser = GetDecodedToken()?.id || "";

  const {
    data: userAuthData,
    error: userAuthError,
    isLoading: userAuthIsLoading,
    isSuccess: userAuthIsSuccess,
  } = useGetUserAuthQuery(loginUser, { skip: !loginUser });

  const {
    data: themeData,
    error: themeError,
    isLoading: themeIsLoading,
  } = useGetThemeQuery(loginUser, { skip: !loginUser });

  const { data: loginUserData } = useLoginUserDataQuery(loginUser);

  const isUserManagementVisible =
    userAuthIsSuccess &&
    [0, 1, 2, 6, 16, 23]?.some(
      (index) => userAuthData[index]?.view_value === 1
    );
  const isWFHVisible =
    userAuthIsSuccess &&
    [17, 19].some((index) => userAuthData[index]?.view_value === 1);
  const isPantryManagementVisible =
    userAuthIsSuccess &&
    [5, 8, 9]?.some((index) => userAuthData[index]?.view_value === 1);
  const isOnboardingVisible =
    userAuthIsSuccess &&
    [18, 20, 21]?.some((index) => userAuthData[index]?.view_value === 1);
  const isLeadManagementVisible =
    userAuthIsSuccess &&
    [22]?.some((index) => userAuthData[index]?.view_value === 1);
  const isExecutionVisible =
    userAuthIsSuccess &&
    [24, 31, 32, 34, 46]?.some(
      (index) => userAuthData[index]?.view_value === 1
    );
  const isInstaApiVisible =
    userAuthIsSuccess &&
    [25]?.some((index) => userAuthData[index]?.view_value === 1);
  const isWFHDManager =
    userAuthIsSuccess &&
    [37]?.some((index) => userAuthData[index]?.view_value === 1);
  const isWFHDHRPayrollManager =
    userAuthIsSuccess &&
    [38]?.some((index) => userAuthData[index]?.view_value === 1);
  const isAssetNotifierVisible =
    userAuthIsSuccess &&
    [40]?.some((index) => userAuthData[index]?.view_value === 1);
  const isTaskManagment =
    userAuthIsSuccess &&
    [43]?.some((index) => userAuthData[index]?.view_value === 1);
  const isPHPFinance =
    userAuthIsSuccess &&
    [44]?.some((index) => userAuthData[index]?.view_value === 1);
  const isOpration =
    userAuthIsSuccess &&
    [42]?.some((index) => userAuthData[index]?.view_value === 1);
  const isCustomer =
    userAuthIsSuccess &&
    [50]?.some((index) => userAuthData[index]?.view_value === 1);
  const isPageManagement =
    userAuthIsSuccess &&
    [51]?.some((index) => userAuthData[index]?.view_value === 1);
  const isSales =
    userAuthIsSuccess &&
    [52]?.some((index) => userAuthData[index]?.view_value === 1);
  const isAssets =
    userAuthIsSuccess &&
    [53]?.some((index) => userAuthData[index]?.view_value === 1);
  const isExenseManagement =
    userAuthIsSuccess &&
    [54]?.some((index) => userAuthData[index]?.view_value === 1);

  const hrms =
    userAuthIsSuccess &&
    [6, 20, 37, 38, 53, 5, 8, 9, 18, 20, 21]?.some(
      (index) => userAuthData[index]?.view_value === 1
    );

  const isSalesAdmin =
    userAuthIsSuccess &&
    userAuthData.find((data) => data?._id === 63)?.view_value;

  return (
    <ApiCaller.Provider
      value={{
        themeData,
        dept_id: loginUserData?.dept_id,
        isUserManagementVisible,
        isWFHVisible,
        isPantryManagementVisible,
        isOnboardingVisible,
        isLeadManagementVisible,
        isExecutionVisible,
        isInstaApiVisible,
        isWFHDManager,
        isWFHDHRPayrollManager,
        isAssetNotifierVisible,
        isTaskManagment,
        isPHPFinance,
        isOpration,
        isCustomer,
        isPageManagement,
        isSales,
        isAssets,
        isExenseManagement,
        hrms,
        isSalesAdmin,
      }}
    >
      {children}
    </ApiCaller.Provider>
  );
};

export const useAuth = () => {
  return useContext(ApiCaller);
};
