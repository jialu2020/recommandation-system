import React, { useState, useEffect } from 'react';

function Timer() {
  const [timeLeft, setTimeLeft] = useState(60); // 设置倒计时的初始时间，单位为秒

  useEffect(() => {
    // 创建倒计时的定时器
    const timer = setTimeout(() => {
      if (timeLeft > 0) {
        setTimeLeft(timeLeft - 1); // 每秒减少1秒
      }
    }, 1000);

    // 当倒计时结束时，清除定时器
    if (timeLeft === 0) {
      clearTimeout(timer);
    }

    // 组件卸载时清除定时器
    return () => clearTimeout(timer);
  }, [timeLeft]); // 依赖timeLeft的变化来更新倒计时

  return (
    <div>
      <h2>Time left: {timeLeft} s</h2>
    </div>
  );
}
export default Timer;
