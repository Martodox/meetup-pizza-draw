import React, {useEffect} from 'react';
import useSound from 'use-sound';
import prompt from './notification.mp3'



function Prompt() {

    const [play, { duration }] = useSound(prompt, { volume: 1 });

    useEffect(() => {
        let interval;
        if (duration) {
            interval = setInterval(play, duration)
        }
        
        return () => {
            if (interval) {
                clearInterval(interval);
            }
        }
    }, [duration])
    
  return null;
}

export default Prompt;
