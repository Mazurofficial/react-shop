import React, { useEffect, useReducer } from 'react';

const setDefaultValue = () => {
   const userTimer = localStorage.getItem('timer');
   return userTimer ? +userTimer : 0;
};

const countReducer = (state, action) => {
   if (action.type === 'START') {
      return {
         ...state,
         isCounting: true,
      };
   }
   if (action.type === 'STOP') {
      return {
         ...state,
         isCounting: false,
      };
   }
   if (action.type === 'RESET') {
      return {
         timer: 0,
         isCounting: false,
      };
   }
   if (action.type === 'TICK') {
      return {
         ...state,
         timer: state.timer + 1,
      };
   }
   return state;
};

export default function Timer() {
   const [{ timer, isCounting }, dispatch] = useReducer(countReducer, {
      timer: setDefaultValue(),
      isCounting: false,
   });

   //    const [timer, setTimer] = useState(setDefaultValue());
   //    const [isCounting, setIsCounting] = useState(false);
   //    const startTimer = setInterval(() => setTimer(timer + 1), 1000);

   useEffect(() => {
      localStorage.setItem('timer', timer);
   }, [timer]);

   useEffect(() => {
      if (isCounting) {
         let timerId = null;
         timerId = setInterval(() => {
            dispatch({ type: 'TICK' });
         }, 1000);
         return () => {
            timerId && clearInterval(timerId);
            timerId = null;
         };
      }
   }, [isCounting]);

   return (
      <div
         style={{
            margin: '100px',
         }}
      >
         <h2>{timer}</h2>
         {isCounting ? (
            <button onClick={() => dispatch({ type: 'STOP' })}>
               Stop timer
            </button>
         ) : (
            <button onClick={() => dispatch({ type: 'START' })}>
               Start timer
            </button>
         )}
         <button onClick={() => dispatch({ type: 'RESET' })}>
            Reset timer
         </button>
      </div>
   );
}
