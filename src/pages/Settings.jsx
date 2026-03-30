import { Settings as SettingsIcon, Save } from 'lucide-react';

export default function Settings() {
  return (
    <div className="p-4 md:p-8 max-w-4xl mx-auto">
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2 flex items-center gap-2 md:gap-3">
          <SettingsIcon className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" />
          Configuración
        </h1>
        <p className="text-sm md:text-base text-slate-500">Ajustes generales del sistema e información del comercio</p>
      </div>

      <div className="bg-white rounded-2xl md:rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 md:p-8 space-y-6 md:space-y-8">
          
          <section>
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-3 md:mb-4 pb-2 border-b border-slate-100">Información de la Tienda</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-medium text-slate-700">Nombre del Comercio</label>
                <input type="text" defaultValue="MiniMarket La Esquina" className="w-full px-3 py-2 md:px-4 md:py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-medium text-slate-700">RUC / ID Fiscal</label>
                <input type="text" defaultValue="123456789001" className="w-full px-3 py-2 md:px-4 md:py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs md:text-sm font-medium text-slate-700">Dirección Mátriz</label>
                <input type="text" defaultValue="Av. Principal 123 y Calle Secundaria" className="w-full px-3 py-2 md:px-4 md:py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-base md:text-lg font-bold text-slate-900 mb-3 md:mb-4 pb-2 border-b border-slate-100">Ajustes de Cobro</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-medium text-slate-700">Cobro de IVA (%)</label>
                <input type="number" defaultValue="12" className="w-full px-3 py-2 md:px-4 md:py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50" />
              </div>
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-medium text-slate-700">Moneda por defecto</label>
                <select className="w-full px-3 py-2 md:px-4 md:py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/50">
                  <option value="USD">Dólar Estadounidense (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                  <option value="MXN">Peso Mexicano (MXN)</option>
                </select>
              </div>
            </div>
          </section>

          <div className="pt-4 md:pt-6 border-t border-slate-100 flex justify-end">
            <button className="w-full md:w-auto justify-center bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl font-medium flex items-center gap-2 transition-all shadow-lg shadow-indigo-600/20">
              <Save className="w-4 h-4 md:w-5 md:h-5" /> Guardar Cambios
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
