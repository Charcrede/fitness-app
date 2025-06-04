export function Calendar() {
  const week = ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"];
  return (
    <div className="mb-6 bg-white rounded-xl p-4 shadow">
      <h2 className="text-xl font-semibold mb-4">Calendrier</h2>
      <div className="grid grid-cols-7 gap-2 text-center">
        {week.map((day, i) => (
          <div key={i} className="bg-gray-100 p-2 rounded">
            {day}
          </div>
        ))}
      </div>
    </div>
  );
}