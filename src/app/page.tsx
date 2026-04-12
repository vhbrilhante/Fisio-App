'use client';

import { useState, useMemo } from 'react';
import { usePatientStore, Patient } from '@/store/useStore';
import { generateDocument } from '@/utils/docEngine';
import { TEMPLATES_MAP } from '@/config/templatesMap';
import { Input, TextArea, CheckboxCard, RadioGroup, SectionHeader } from '@/components/BrutalistUI';
import { SpreadsheetView } from '@/components/SpreadsheetView';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Dashboard() {
  const { patients, selectedPatientId, addPatient, setSelectedPatient, deletePatient, registerDocumentToPatient } = usePatientStore();
  const [isAddingPatient, setIsAddingPatient] = useState(false);
  const [isDeletingPatient, setIsDeletingPatient] = useState(false);
  const [selectedPresetId, setSelectedPresetId] = useState<string | null>(null);
  const [extraData, setExtraData] = useState<Record<string, any>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Filtro de Busca (Opcional, mas útil)
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'history' | 'sheets'>('form');

  const filteredPatients = useMemo(() => 
    patients.filter(p => (p.nome_paciente || (p as any).name || '').toLowerCase().includes(search.toLowerCase())),
    [patients, search]
  );
  
  const selectedPatient = useMemo(() => 
    patients.find(p => p.id === selectedPatientId), 
    [patients, selectedPatientId]
  );

  const selectedTemplate = useMemo(() => 
    TEMPLATES_MAP.find(t => t.id === selectedPresetId),
    [selectedPresetId]
  );

  const handleGenerate = async () => {
    if (!selectedPatient || !selectedTemplate) return;
    
    setIsProcessing(true);
    
    // Combina dados do paciente com dados extras do formulário
    const fullData = {
      ...selectedPatient,
      ...extraData,
    };

    const finalResult = await generateDocument(
      `templates/${selectedTemplate.id}`,
      fullData,
      `${selectedTemplate.name.toUpperCase()} - ${(selectedPatient.nome_paciente || (selectedPatient as any).name || 'PACIENTE').toUpperCase()}`
    );

    if (finalResult && typeof finalResult === 'string') {
      // Registrar no histórico do paciente
      registerDocumentToPatient(selectedPatient.id, finalResult);
      
      setTimeout(() => {
        setIsProcessing(false);
        setActiveTab('history'); // Muda para aba de histórico após gerar
      }, 500);
    } else {
      setIsProcessing(false);
    }
  };

  const handleAddPatientSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: any = {};
    formData.forEach((value, key) => data[key] = value);
    
    addPatient(data);
    setIsAddingPatient(false);
  };

  return (
    <div className="flex h-screen bg-[#F4F4F0] text-black overflow-hidden font-sans selection:bg-black selection:text-white">
      
      {/* SIDEBAR BRUTALISTA */}
      <aside className="w-[380px] border-r-8 border-black flex flex-col bg-white shrink-0">
        <div className="p-8 space-y-6 border-b-8 border-black bg-[#E0E0E0]">
          <h1 className="text-6xl font-black leading-[0.8] tracking-tighter uppercase mr-[-20px]">
            FISIO<br/>SHARA
          </h1>
          <div className="bg-black h-2 w-full" />
          <button 
            onClick={() => setIsAddingPatient(true)}
            className="w-full bg-black text-white text-2xl font-black p-6 hover:bg-zinc-800 transition-all active:scale-[0.98]"
          >
            + NOVO PACIENTE
          </button>
          <input 
            type="text" 
            placeholder="BUSCAR PACIENTE..."
            className="w-full bg-transparent border-4 border-black p-3 font-bold uppercase placeholder:text-black/30 outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {filteredPatients.map((p) => (
            <div 
              key={p.id}
              onClick={() => setSelectedPatient(p.id)}
              className={cn(
                "p-6 border-b-4 border-black cursor-pointer transition-all flex justify-between items-center group",
                selectedPatientId === p.id ? "bg-black text-white" : "hover:bg-zinc-100"
              )}
            >
              <div className="space-y-1">
                <p className="font-black text-xl uppercase leading-tight truncate max-w-[280px]">{p.nome_paciente || (p as any).name}</p>
                <p className={cn("text-xs font-bold uppercase", selectedPatientId === p.id ? "text-white/60" : "text-black/40")}>
                    CPF: {p.cpf} | PROF: {p.profissao}
                </p>
              </div>
              <div className={cn("opacity-0 group-hover:opacity-100 transition-opacity", selectedPatientId === p.id ? "text-white" : "text-black")}>
                →
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ÁREA DE TRABALHO */}
      <main className="flex-1 flex flex-col overflow-y-auto relative">
        {selectedPatient ? (
          <div className="p-16 space-y-16 max-w-6xl w-full mx-auto">
            
            {/* CABEÇALHO DO PACIENTE */}
            <div className="flex justify-between items-end">
                <div className="space-y-4">
                    <span className="bg-black text-white px-4 py-1 text-sm font-black uppercase tracking-widest inline-block">MODO EDIÇÃO</span>
                    <h2 className="text-8xl font-black tracking-tighter uppercase leading-[0.85]">{selectedPatient.nome_paciente || (selectedPatient as any).name}</h2>
                    <div className="flex flex-wrap gap-x-8 gap-y-2 text-md font-black uppercase tracking-tight">
                        <span className="border-b-4 border-black">PROFISSÃO: {selectedPatient.profissao}</span>
                        <span className="border-b-4 border-black">DATA NASC: {selectedPatient.data_nascimento}</span>
                        <span className="border-b-4 border-black">CONTATO: {selectedPatient.telefone}</span>
                    </div>
                </div>
                <button 
                  onClick={() => setIsDeletingPatient(true)}
                  className="bg-red-600 text-white font-black p-4 hover:bg-black transition-colors uppercase border-4 border-black"
                >
                  DELETAR FICHA
                </button>
            </div>

            <div className="bg-black h-8 w-full" />

            {/* ABAS */}
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveTab('form')}
                className={cn(
                  "flex-1 p-6 text-2xl font-black uppercase border-4 border-black transition-all",
                  activeTab === 'form' ? "bg-black text-white shadow-none translate-y-2" : "bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-50"
                )}
              >
                1. PREENCHIMENTO
              </button>
              <button 
                onClick={() => setActiveTab('history')}
                className={cn(
                  "flex-1 p-6 text-2xl font-black uppercase border-4 border-black transition-all",
                  activeTab === 'history' ? "bg-black text-white shadow-none translate-y-2" : "bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-50"
                )}
              >
                2. HISTÓRICO ({selectedPatient.generatedDocs?.length || 0})
              </button>
              <button 
                onClick={() => setActiveTab('sheets')}
                className={cn(
                  "flex-1 p-6 text-2xl font-black uppercase border-4 border-black transition-all",
                  activeTab === 'sheets' ? "bg-black text-white shadow-none translate-y-2" : "bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:bg-zinc-50"
                )}
              >
                3. PLANILHAS ({selectedPatient.sheets?.length || 0})
              </button>
            </div>

            {activeTab === 'form' ? (
              <>
                {/* SELEÇÃO DE DOCUMENTO */}
                <div className="space-y-8">
                  <h3 className="text-4xl font-black uppercase tracking-tighter">MODELO DE DOCUMENTO</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {TEMPLATES_MAP.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => {
                          setSelectedPresetId(template.id);
                          setExtraData({});
                        }}
                        className={cn(
                          "p-6 border-4 border-black text-left transition-all relative overflow-hidden h-32 flex flex-col justify-between",
                          selectedPresetId === template.id ? "bg-black text-white -translate-y-2 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]" : "bg-white hover:bg-zinc-100"
                        )}
                      >
                        <p className="text-xl font-black uppercase leading-none">{template.name}</p>
                        <div className={cn("text-[10px] font-black uppercase tracking-widest opacity-40", selectedPresetId === template.id && "opacity-100")}>
                          {template.fields.length} CAMPOS
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* FORMULÁRIO DINÂMICO */}
                {selectedTemplate && (
                  <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-500 pb-20">
                    <div className="bg-black h-2 w-full" />
                    <h3 className="text-4xl font-black uppercase tracking-tighter">PREENCHA OS DADOS</h3>
                    
                    <div className="grid grid-cols-1 gap-8 bg-white border-8 border-black p-12">
                      {(() => {
                        if (!selectedTemplate.fields.length) return (
                          <div className="p-12 border-4 border-dashed border-black bg-zinc-50 flex items-center justify-center">
                            <p className="font-black uppercase tracking-widest text-2xl opacity-20 text-center">SEM CAMPOS ADICIONAIS NECESSÁRIOS</p>
                          </div>
                        );

                        const renderedGroups: React.ReactNode[] = [];
                        let i = 0;
                        while (i < selectedTemplate.fields.length) {
                          const field = selectedTemplate.fields[i];
                          
                          // Lógica de Agrupamento para Checkboxes com prefixo "CATEGORIA: "
                          if (field.type === 'checkbox' && field.label.includes(':')) {
                            const prefix = field.label.split(':')[0].trim();
                            const group = [field];
                            let j = i + 1;
                            
                            while (j < selectedTemplate.fields.length && 
                                   selectedTemplate.fields[j].type === 'checkbox' && 
                                   selectedTemplate.fields[j].label.startsWith(prefix + ':')) {
                              group.push(selectedTemplate.fields[j]);
                              j++;
                            }

                            if (group.length > 1) {
                              renderedGroups.push(
                                <div key={`group-${prefix}-${i}`} className="space-y-4 border-l-8 border-black pl-6 py-2 bg-zinc-50/50">
                                  <h4 className="text-xl font-black uppercase tracking-tighter bg-black text-white px-3 py-1 inline-block">{prefix}</h4>
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {group.map((f) => (
                                      <CheckboxCard 
                                        key={f.key}
                                        label={f.label.split(':')[1].trim()} 
                                        checked={!!extraData[f.key]} 
                                        onChange={() => setExtraData(p => ({ ...p, [f.key]: !p[f.key] }))}
                                      />
                                    ))}
                                  </div>
                                </div>
                              );
                              i = j;
                              continue;
                            }
                          }

                          // Renderização Padrão para campos isolados
                          renderedGroups.push(
                            <div key={field.key}>
                              {field.type === 'text' && (
                                <Input 
                                  label={field.label} 
                                  value={extraData[field.key] || ''} 
                                  onChange={(e) => setExtraData(p => ({ ...p, [field.key]: e.target.value }))}
                                />
                              )}
                              {field.type === 'textarea' && (
                                <TextArea 
                                  label={field.label} 
                                  value={extraData[field.key] || ''} 
                                  onChange={(e) => setExtraData(p => ({ ...p, [field.key]: e.target.value }))}
                                />
                              )}
                              {field.type === 'radio' && (
                                <RadioGroup 
                                  label={field.label} 
                                  options={field.options || []} 
                                  value={extraData[field.key] || ''} 
                                  onChange={(val) => setExtraData(p => ({ ...p, [field.key]: val }))}
                                />
                              )}
                              {field.type === 'checkbox' && (
                                <div className="space-y-2">
                                   <label className="text-xs font-black uppercase tracking-widest block border-l-4 border-black pl-2 mb-2">{field.label}</label>
                                   <CheckboxCard 
                                      label="MARCAR" 
                                      checked={!!extraData[field.key]} 
                                      onChange={() => setExtraData(p => ({ ...p, [field.key]: !p[field.key] }))}
                                   />
                                </div>
                              )}
                            </div>
                          );
                          i++;
                        }
                        return renderedGroups;
                      })()}
                    </div>

                    <button 
                      onClick={handleGenerate}
                      disabled={isProcessing}
                      className={cn(
                        "w-full bg-black text-white text-5xl font-black py-12 tracking-tighter transition-all hover:bg-zinc-800 disabled:opacity-50",
                        isProcessing && "scale-[0.98] blur-[2px]"
                      )}
                    >
                      {isProcessing ? "PROCESSANDO..." : "GERAR DOCUMENTO FINAL"}
                    </button>
                  </div>
                )}
              </>
            ) : activeTab === 'history' ? (
              <div className="space-y-8 pb-40">
                <h3 className="text-4xl font-black uppercase tracking-tighter">ARQUIVOS GERADOS</h3>
                {selectedPatient.generatedDocs && selectedPatient.generatedDocs.length > 0 ? (
                  <div className="space-y-4">
                    {selectedPatient.generatedDocs.slice().reverse().map((path: string, i: number) => {
                      const fileName = path.split('\\').pop() || path.split('/').pop() || 'Arquivo';
                      return (
                        <div key={i} className="bg-white border-4 border-black p-6 flex justify-between items-center group shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                          <div className="space-y-1">
                            <p className="font-black text-xl uppercase truncate max-w-xl">{fileName}</p>
                            <p className="text-xs font-bold opacity-30 select-all">{path}</p>
                          </div>
                          <button 
                            onClick={() => (window as any).electronAPI?.openFolder(path)}
                            className="bg-black text-white px-8 py-3 font-black uppercase text-sm hover:bg-zinc-800 transition-all active:translate-y-1 shadow-[4px_4px_0px_0px_rgba(100,100,100,1)]"
                          >
                            VER ARQUIVO
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="p-20 border-8 border-dashed border-black bg-zinc-50 flex flex-col items-center justify-center text-center space-y-4">
                     <div className="text-8xl font-black opacity-10">?</div>
                     <p className="font-black uppercase tracking-widest text-2xl opacity-20">NENHUM ARQUIVO GERADO AINDA</p>
                  </div>
                )}
                
                <button 
                  onClick={() => (window as any).electronAPI?.openFolder()} 
                  className="w-full border-4 border-black p-4 font-black uppercase hover:bg-black hover:text-white transition-all"
                >
                  ABRIR PASTA GERAL DE RELATÓRIOS
                </button>
              </div>
            ) : (
              <SpreadsheetView 
                patientId={selectedPatient.id}
                sheets={selectedPatient.sheets || []}
                onAddSheet={(name) => usePatientStore.getState().addPatientSheet(selectedPatient.id, name)}
                onUpdateSheet={(sheetId, data) => usePatientStore.getState().updatePatientSheet(selectedPatient.id, sheetId, data)}
              />
            )}
            
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-20 text-center space-y-10">
            <div className="w-48 h-48 border-[20px] border-black" />
            <div className="space-y-4">
              <h2 className="text-7xl font-black uppercase tracking-tighter">BEM-VINDA,<br/>DRA. SHARA</h2>
              <div className="bg-black text-white p-4 font-black uppercase inline-block text-2xl tracking-widest">
                SELECIONE UM PACIENTE PARA COMEÇAR
              </div>
            </div>
            <p className="max-w-md mx-auto font-bold opacity-30 uppercase text-xs">FISIOAPP v2.0 // BRUTALIST ENGINE // ZERO LATENCY SYSTEM</p>
          </div>
        )}

        {/* FEEDBACK DE PROCESSAMENTO OVERLAY */}
        {isProcessing && (
           <div className="fixed inset-0 bg-white/50 backdrop-blur-md z-[100] flex items-center justify-center">
               <div className="bg-black text-white p-20 flex flex-col items-center space-y-8 animate-bounce">
                  <div className="text-9xl font-black">!</div>
                  <h2 className="text-4xl font-black uppercase">GERANDO .DOCX...</h2>
               </div>
           </div>
        )}
      </main>

      {/* MODAL NOVO PACIENTE - TELA CHEIA BRUTALISTA */}
      {isAddingPatient && (
        <div className="fixed inset-0 bg-white z-[60] overflow-y-auto">
          <div className="max-w-4xl mx-auto p-20 space-y-12 pb-40">
            <div className="flex justify-between items-center">
                <h2 className="text-7xl font-black uppercase tracking-tighter">NOVO CADASTRO</h2>
                <button onClick={() => setIsAddingPatient(false)} className="bg-black text-white p-4 font-black text-2xl leading-none">FECHAR [X]</button>
            </div>
            
            <div className="bg-black h-4 w-full" />

            <form onSubmit={handleAddPatientSubmit} className="space-y-12">
              <SectionHeader title="DADOS PESSOAIS" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input label="NOME COMPLETO" name="nome_paciente" required className="md:col-span-2" />
                <Input label="SEXO" name="sexo" placeholder="M / F / OUTRO" />
                <Input label="DATA NASCIMENTO" name="data_nascimento" placeholder="DD/MM/AAAA" />
                <Input label="IDADE" name="idade" />
                <Input label="PROFISSÃO" name="profissao" />
                <Input label="RG" name="rg" />
                <Input label="CPF" name="cpf" />
                <Input label="ESTADO CIVIL" name="estado_civil" />
                <Input label="NACIONALIDADE" name="nacionalidade" />
              </div>

              <SectionHeader title="CONTATO E ENDEREÇO" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Input label="TELEFONE" name="telefone" />
                <Input label="EMAIL" name="email" />
                <Input label="ENDEREÇO" name="endereco" className="md:col-span-2" />
                <Input label="NÚMERO" name="numero" />
                <Input label="COMPLEMENTO" name="complemento" />
                <Input label="BAIRRO" name="bairro" />
                <Input label="MUNICÍPIO" name="municipio" />
              </div>

              <div className="pt-12">
                <button type="submit" className="w-full bg-black text-white text-4xl font-black py-10 hover:bg-zinc-800 transition-all">
                  SALVAR CADASTRO NO SISTEMA
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL DELEÇÃO */}
      {isDeletingPatient && (
        <div className="fixed inset-0 bg-red-600 z-[70] flex items-center justify-center p-12">
          <div className="bg-white border-[12px] border-black p-16 max-w-2xl w-full text-center space-y-10 shadow-[32px_32px_0px_0px_rgba(0,0,0,1)]">
            <h2 className="text-8xl font-black uppercase text-red-600 leading-none tracking-tighter">CUIDADO!</h2>
            <div className="space-y-4">
                <p className="text-3xl font-black uppercase">VOCÊ ESTÁ PRESTES A EXCLUIR TODOS OS DADOS DE {(selectedPatient?.nome_paciente || (selectedPatient as any)?.name)?.toUpperCase()}</p>
                <div className="bg-zinc-100 border-4 border-black p-6 font-bold uppercase text-red-800 text-sm">
                    ⚠️ ESSA AÇÃO É IRREVERSÍVEL E TAMBÉM APAGARÁ OS ARQUIVOS .DOCX GERADOS DESTE PACIENTE.
                </div>
            </div>
            <div className="flex gap-6">
              <button 
                onClick={() => setIsDeletingPatient(false)} 
                className="flex-1 bg-zinc-200 p-6 text-2xl font-black uppercase border-4 border-black"
              >
                CANCELAR
              </button>
              <button 
                onClick={async () => {
                  if (!selectedPatient) return;
                  // Deletar arquivos (já implementado no Electron handle)
                  deletePatient(selectedPatient.id);
                  setIsDeletingPatient(false);
                }} 
                className="flex-1 bg-red-600 text-white p-6 text-2xl font-black uppercase border-4 border-black"
              >
                EXCLUIR TUDO
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
