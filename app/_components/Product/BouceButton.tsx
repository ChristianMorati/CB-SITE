

import React from 'react';

const BounceBorderButton = ({ children }) => {
  return (
    <div className="flex items-center justify-center p-10">
      <button className="group relative transition-transform duration-300 active:scale-90">
        {/* Camada de Brilho/Bounce de fundo */}
        <div className="absolute -inset-[2px] rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 
                        opacity-70 blur-sm group-hover:opacity-100 
                        animate-[bounce-subtle_2s_infinite_ease-in-out]" />
        
        {/* Container da Borda Animada */}
        <div className="relative overflow-hidden rounded-xl p-[2px] 
                        animate-[bounce-subtle_2s_infinite_ease-in-out]">
          
          {/* O Gradiente que gira */}
          <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] 
                         bg-[conic-gradient(from_90deg_at_50%_50%,#3B82F6_0%,#8B5CF6_50%,#3B82F6_100%)]" />

          {/* Conteúdo Interno */}
          <div className="relative flex items-center justify-center rounded-[10px] bg-slate-950 px-8 py-3 
                          text-white transition-colors group-hover:bg-slate-900">
            <span className="font-bold tracking-wide">{children}</span>
          </div>
        </div>
      </button>
    </div>
  );
};

export default BounceBorderButton;