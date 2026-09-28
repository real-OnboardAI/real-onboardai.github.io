import React, { useEffect } from 'react';

const AIStrategy = () => {
  useEffect(() => {
    document.title = "Enterprise AI Transformation & Capability Building Proposal";
  }, []);

  return (
    <div className="w-full h-screen overflow-hidden">
      <iframe
        src="/enterprise_ai_transformation_proposal.html"
        title="Enterprise AI Strategy"
        className="w-full h-full border-0"
      />
    </div>
  );
};

export default AIStrategy;
