import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { saveAs } from 'file-saver';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

export const generateDocument = async (templatePath: string, data: any, fileName: string) => {
  try {
    const response = await fetch(templatePath + `?t=${Date.now()}`);
    const content = await response.arrayBuffer();
    const zip = new PizZip(content);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      delimiters: { start: '{{', end: '}}' },
      nullGetter(part: any) {
        if (!part.module) {
          return " "; // Retorna um espaço em branco para variáveis não preenchidas
        }
        return "";
      }
    });

    // Injeção Automática de Datas
    const now = new Date();
    const processedData = {
      ...data,
      data_hoje: format(now, 'dd/MM/yyyy'),
      data_extenso: `Porto Velho, ${format(now, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}`
    };

    // Sanitização de Checkboxes e Campos
    // Converte booleanos em "X" para marcação no Word, ou "" se falso
    Object.keys(processedData).forEach(key => {
      if (typeof processedData[key] === 'boolean') {
        processedData[key] = processedData[key] ? "X" : "";
      }
    });

    doc.render(processedData);

    const out = doc.getZip().generate({
      type: 'blob',
      mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    });

    // Se estiver no Electron, tenta salvar direto via IPC
    if ((window as any).electronAPI?.saveDocument) {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = async () => {
          const buffer = reader.result as ArrayBuffer;
          const res = await (window as any).electronAPI.saveDocument(buffer, fileName);
          if (res && res.success) {
            resolve(res.path);
          } else {
            resolve(false);
          }
        };
        reader.readAsArrayBuffer(out);
      });
    } else {
      // Fallback Web
      saveAs(out, `${fileName}.docx`);
      return true;
    }
  } catch (error: any) {
    console.error('Erro ao gerar documento:', error);
    
    let errorMsg = "O Template Word está com formatação corrompida.\nDetalhes do Erro:\n";
    if (error.properties && error.properties.errors instanceof Array) {
        error.properties.errors.forEach((err: any) => {
            errorMsg += `${err.explanation}\n`;
        });
    } else {
        errorMsg += error.message || "Erro desconhecido";
    }
    
    alert(errorMsg + "\n\nPor favor, abra o arquivo no Word e corrija as chaves falsas (ex: {{ sem fechar).");
    return false;
  }
};
