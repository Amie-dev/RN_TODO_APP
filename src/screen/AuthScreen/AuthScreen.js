import { StyleSheet } from 'react-native';
import React, { useState } from 'react';
import LogIn from '../../components/AuthComponents/LogIn';
import GetStar from '../../components/AuthComponents/GetStar';
import SingUp from '../../components/AuthComponents/SingUp';

const AuthScreen = () => {
  const [step, setStep] = useState(0);   // 0 = GetStart, 1 = Auth
  const [login, setLogin] = useState(false); // false = Signup, true = Login

  return (
    <>
      {/* 🔥 Step 0 → Get Started */}
      {step === 0 && (
        <GetStar step={step} setStep={setStep} />
      )}

      {/* 🔥 Step 1 → Auth Screen */}
      {step >0 && (
       ! login ? (
          <LogIn login={login} setLogin={setLogin} />
        ) : (
          <SingUp login={login} setLogin={setLogin} />
        )
      )}
    </>
  );
};

export default AuthScreen;

const styles = StyleSheet.create({});