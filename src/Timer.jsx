import React, { useEffect, useRef, useState } from 'react';

const setDefaultValue = () => {
   const userTimer = localStorage.getItem('timer');
   return userTimer ? +userTimer : 0;
};

export default function Timer() {
   const [timer, setTimer] = useState(setDefaultValue());
   const [isCounting, setIsCounting] = useState(false);
   const timerIdRef = useRef(null);
   //    const startTimer = setInterval(() => setTimer(timer + 1), 1000);
   const startTimer = () => {
      setIsCounting(true);
   };
   const stopTimer = () => {
      setIsCounting(false);
   };
   const resetTimer = () => {
      setIsCounting(false);
      setTimer(0);
   };

   useEffect(() => {
      localStorage.setItem('timer', timer);
   }, [timer]);

   useEffect(() => {
      if (isCounting) {
         timerIdRef.current = setInterval(() => {
            setTimer((prevTimer) => prevTimer + 1);
         }, 1000);
         return () => {
            timerIdRef.current && clearInterval(timerIdRef.current);
            timerIdRef.current = null;
         };
      }
   }, [isCounting]);

   return (
      <>
         {timer}
         <br />
         <button onClick={startTimer}>Start timer</button>
         <button onClick={stopTimer}>Stop timer</button>
         <button onClick={resetTimer}>Reset timer</button>
      </>
   );
}
