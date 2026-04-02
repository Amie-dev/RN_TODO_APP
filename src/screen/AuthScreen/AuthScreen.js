import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import LogIn from '../../components/AuthComponents/LogIn';
import GetStar from '../../components/AuthComponents/GetStar';
import SingUp from '../../components/AuthComponents/SingUp';

const AuthScreen = () => {
  const [step, setStep] = useState(0);   // 0 = GetStart, 1 = Auth
  const [loginScreen, setLoginScreen] = useState(false); // false = Signup, true = Login

  return (
    <>
      {/* 🔥 Step 0 → Get Started */}
      {step === 0 && (
        <GetStar step={step} setStep={setStep} />
      )}

      {/* 🔥 Step 1 → Auth Screen */}
      {step >0 && (
       ! loginScreen ? (
          <LogIn loginScreen={loginScreen} setLoginScreen={setLoginScreen} />
        ) : (
          <SingUp loginScreen={loginScreen} setLoginScreen={setLoginScreen} />
        )
      )}
    </>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});