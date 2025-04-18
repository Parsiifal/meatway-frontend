export function GridDev() {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">

      {/* Контейнер с ограничением ширины и паддингами*/}
      <div className="h-full w-full md:w-5/6 lg:w-4/5 xl:w-4/5 max-w-screen-md mx-auto">
        
        {/* Мобильные (default, <640px) - 4 колонки */}
        <div className="grid grid-cols-4 h-full w-full gap-2 px-5 sm:hidden">
          {[...Array(4)].map((_, i) => (
            <div 
              key={`mobile-${i}`}
              className="bg-red-100/20 border border-dashed border-red-500 h-full"
            />
          ))}
        </div>

        {/* Планшеты (sm, ≥640px) - 8 колонок */}
        <div className="hidden sm:grid sm:grid-cols-8 h-full w-full gap-4 px-16 lg:hidden">
          {[...Array(8)].map((_, i) => (
            <div 
              key={`sm-${i}`}
              className="bg-red-100/20 border-l border-r border-dashed border-red-500 h-full"
            />
          ))}
        </div>

        {/* Ноутбуки (lg, ≥1024px) - 12 колонок */}
        <div className="hidden lg:grid lg:grid-cols-12 h-full w-full gap-4 xl:hidden">
          {[...Array(12)].map((_, i) => (
            <div 
              key={`lg-${i}`}
              className="bg-blue-100/20 border-l border-r border-dashed border-blue-400/50 h-full"
            />
          ))}
        </div>

        {/* Большие экраны (xl, ≥1280px) - 12 колонок */}
        <div className="hidden xl:grid xl:grid-cols-12 h-full w-full gap-4">
          {[...Array(12)].map((_, i) => (
            <div 
              key={`xl-${i}`}
              className={`h-full ${i % 2 === 0 ? "bg-purple-100/20" : "bg-pink-100/20"} border-l border-r border-dashed border-gray-400/50`}
            />
          ))}
        </div>

      </div>
    </div>
  );
};