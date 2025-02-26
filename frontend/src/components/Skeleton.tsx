import { useState, useEffect } from 'react';

const SkeletonUI = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate data loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      
      

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {loading && (
            <>
              {[1, 2, 3,4,5,6,7].map((item) => (
                <div key={item} className="animate-pulse bg-white p-4 rounded-lg shadow">
                  <div className="h-4 bg-gray-200 rounded-md w-3/4 mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded-md mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded-md w-1/2"></div>
                </div>
              ))}
            </>
          )}
        </div>
    </div>
  );
};

export default SkeletonUI;