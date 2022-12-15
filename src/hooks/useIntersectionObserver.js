import React ,{useEffect, useState} from 'react'

const useIntersectionObserver = (ref, options, checkOnce=false) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
  
   useEffect(() => {
      const observer = new IntersectionObserver(([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if(checkOnce && entry.isIntersecting){
            observer.unobserve(ref.current);
        }
      }, options);
  
      if (ref.current) observer.observe(ref.current);
  
      return () => {
        if (ref.current) observer.unobserve(ref.current);
      };
    }, []);
  
    return isIntersecting;
  };

export default useIntersectionObserver