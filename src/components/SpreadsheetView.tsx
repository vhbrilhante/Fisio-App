'use client';

import { useState } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { utils, writeFile } from 'xlsx';
import { Download, Plus, Save, Trash2, Table as TableIcon } from 'lucide-react';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SpreadsheetViewProps {
  patientId: string;
  sheets: any[];
  onAddSheet: (name: string) => void;
  onUpdateSheet: (sheetId: string, data: any[][]) => void;
}

export function SpreadsheetView({ patientId, sheets, onAddSheet, onUpdateSheet }: SpreadsheetViewProps) {
  const [activeSheetId, setActiveSheetId] = useState<string | null>(sheets[0]?.id || null);
  const [newSheetName, setNewSheetName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const activeSheet = sheets.find(s => s.id === activeSheetId);

  const handleCellChange = (rowIndex: number, colIndex: number, value: string) => {
    if (!activeSheet) return;
    const newData = [...activeSheet.data.map((row: any[]) => [...row])];
    newData[rowIndex][colIndex] = value;
    onUpdateSheet(activeSheet.id, newData);
  };

  const exportToExcel = () => {
    if (!activeSheet) return;
    const ws = utils.aoa_to_sheet(activeSheet.data);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, activeSheet.name);
    writeFile(wb, `${activeSheet.name}_${patientId}.xlsx`);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <h3 className="text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
          <TableIcon size={40} />
          PLANILHAS CLÍNICAS
        </h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-black text-white px-6 py-3 font-black uppercase flex items-center gap-2 hover:bg-zinc-800 transition-all border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <Plus size={20} /> NOVA PLANILHA
        </button>
      </div>

      {/* ABAS DE PLANILHAS */}
      <div className="flex flex-wrap gap-2">
        {sheets.map(sheet => (
          <button
            key={sheet.id}
            onClick={() => setActiveSheetId(sheet.id)}
            className={cn(
              "px-6 py-3 font-black uppercase border-4 border-black transition-all",
              activeSheetId === sheet.id 
                ? "bg-black text-white translate-y-1 shadow-none" 
                : "bg-white hover:bg-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            )}
          >
            {sheet.name}
          </button>
        ))}
      </div>

      {activeSheet ? (
        <div className="space-y-6">
          <div className="bg-white border-8 border-black shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-zinc-100">
                    <th className="border-r-4 border-b-4 border-black w-12 p-2 font-black text-xs text-center bg-zinc-200">#</th>
                    {activeSheet.data[0].map((_: any, i: number) => (
                      <th key={i} className="border-r-4 border-b-4 border-black p-2 font-black text-xs text-center uppercase">
                        {String.fromCharCode(65 + i)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {activeSheet.data.map((row: any[], rowIndex: number) => (
                    <tr key={rowIndex}>
                      <td className="border-r-4 border-b-4 border-black p-2 font-black text-xs text-center bg-zinc-100 italic">
                        {rowIndex + 1}
                      </td>
                      {row.map((cell, colIndex) => (
                        <td key={colIndex} className="border-r-4 border-b-4 border-black p-0 group">
                          <input 
                            type="text" 
                            value={cell} 
                            onChange={(e) => handleCellChange(rowIndex, colIndex, e.target.value)}
                            className="w-full p-2 bg-transparent outline-none font-bold text-sm focus:bg-black focus:text-white transition-colors"
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          
          <div className="flex gap-4">
             <button 
                onClick={exportToExcel}
                className="flex-1 bg-green-600 text-white p-6 text-xl font-black uppercase border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all flex items-center justify-center gap-4"
             >
                <Download size={32} /> EXPORTAR PARA EXCEL (.XLSX)
             </button>
             <button 
                className="bg-zinc-200 p-6 text-xl font-black uppercase border-4 border-black flex items-center justify-center gap-4 opacity-30 cursor-not-allowed"
             >
                <Save size={32} /> AUTO-SALVAMENTO ATIVO
             </button>
          </div>
        </div>
      ) : (
        <div className="p-32 border-8 border-dashed border-black bg-zinc-50 flex flex-col items-center justify-center text-center space-y-6">
           <TableIcon size={120} className="opacity-10" />
           <p className="font-black uppercase tracking-widest text-3xl opacity-20">NENHUMA PLANILHA NESTA FICHA</p>
           {!isAdding && (
             <button 
               onClick={() => setIsAdding(true)}
               className="bg-black text-white px-10 py-5 text-2xl font-black uppercase shadow-[8px_8px_0px_0px_rgba(0,0,0,0.2)]"
             >
               CRIAR PRIMEIRA PLANILHA
             </button>
           )}
        </div>
      )}

      {/* MODAL ADICIONAR PLANILHA */}
      {isAdding && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100] flex items-center justify-center p-8">
          <div className="bg-white border-[12px] border-black p-12 max-w-xl w-full space-y-8 animate-in zoom-in-95 duration-200">
            <h2 className="text-5xl font-black uppercase tracking-tighter">NOME DA PLANILHA</h2>
            <input 
              autoFocus
              className="w-full bg-transparent border-8 border-black p-6 text-3xl font-black uppercase placeholder:text-black/10 outline-none"
              placeholder="EX: CONTROLE DE SESSÕES"
              value={newSheetName}
              onChange={(e) => setNewSheetName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  onAddSheet(newSheetName || 'SEM NOME');
                  setIsAdding(false);
                  setNewSheetName('');
                }
              }}
            />
            <div className="flex gap-4">
              <button 
                onClick={() => setIsAdding(false)}
                className="flex-1 bg-zinc-200 p-6 text-2xl font-black uppercase border-4 border-black"
              >
                CANCELAR
              </button>
              <button 
                onClick={() => {
                  onAddSheet(newSheetName || 'SEM NOME');
                  setIsAdding(false);
                  setNewSheetName('');
                }}
                className="flex-1 bg-black text-white p-6 text-2xl font-black uppercase border-4 border-black"
              >
                CRIAR
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
