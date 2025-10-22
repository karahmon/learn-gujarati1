import React from 'react';

const Logo: React.FC = () => (
  <div className="text-center mb-4">
    <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
      <span className="logo-learn text-blue-600">Learn </span>
      <span className="logo-gujarati font-normal" style={{ fontFamily: "'Noto Sans Gujarati', sans-serif" }}>ગુજરાતી</span>
    </h1>
    <p className="mt-1 text-sm text-gray-600" style={{ fontFamily: "'Noto Sans Gujarati', sans-serif" }}>
      લર્નિંગ મેનેજમેન્ટ સિસ્ટમ
    </p>
  </div>
);

export default Logo;