import { useEffect, useRef, useState } from "react";

export default function Stopwatch() {
    const [isRunning, setIsRunning] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(0);

    useEffect(() => {
        if (isRunning) {
            intervalIdRef.current = setInterval(() => {
                setElapsedTime(Date.now() - startTimeRef.current);
            }, 10);
        }
        return(() => {
            clearInterval(intervalIdRef.current);
        });
    }, [isRunning]);
    function start() {
        setIsRunning(true);
        startTimeRef.current = Date.now() - elapsedTime;
    }
    function stop() {
        setIsRunning(false);
    }
    function reset() {
        setElapsedTime(0);
        setIsRunning(false);
    }
    function formatTime() {
        let hrs = Math.floor(elapsedTime / (1000*60*60));
        let min = Math.floor(elapsedTime / (1000*60) % 60);
        let sec = Math.floor(elapsedTime / (1000) % 60);
        let milisec = Math.floor((elapsedTime % 1000)/10);
        hrs = String(hrs).padStart(2, '0');
        min = String(min).padStart(2, '0');
        sec = String(sec).padStart(2, '0');
        milisec = String(milisec).padStart(2, '0');
        return `${min}:${sec}:${milisec}`;
    }
    return(
        <div className="stopwatch">
            <div className="display">{formatTime()}</div>
            <div className="controls">
                <button className="startButton" onClick={start}>Start</button>
                <button className="stopButton" onClick={stop}>Stop</button>
                <button className="resetButton" onClick={reset}>Reset</button>
            </div>
        </div>
    );    
}