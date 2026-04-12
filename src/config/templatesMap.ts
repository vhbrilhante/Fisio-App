export interface ExtraField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'checkbox' | 'radio';
  options?: string[]; // Para campos tipo radio
}

export interface TemplateConfig {
  id: string;
  name: string;
  fields: ExtraField[];
}

export const TEMPLATES_MAP: TemplateConfig[] = [
  {
    id: "ANAMNESE- FICHA DE AVALIAÇÃO INICIAL.docx",
    name: "Avaliação Inicial",
    fields: [
      { key: "diagnostico_medico", label: "Diagnóstico Médico", type: "text" },
      { key: "queixa_principal", label: "Queixa Principal", type: "textarea" },
      { key: "intensidade_dor", label: "Intensidade da Dor", type: "text" },
      { key: "obs_dor", label: "Observações da Dor", type: "textarea" },
      { key: "hmp_hma", label: "HMP / HMA", type: "textarea" },
      { key: "doencas_associadas", label: "Doenças Associadas", type: "text" },
      { key: "historico_familiar", label: "Histórico Familiar", type: "text" },
      { key: "medicacao", label: "Medicação em Uso", type: "text" },
      { key: "fumante", label: "Fumante?", type: "radio", options: ["Sim", "Não"] },
      { key: "dieta", label: "Dieta", type: "text" },
      { key: "atividade_fisica", label: "Atividade Física", type: "text" },
      { key: "objetivos", label: "Objetivos do Paciente", type: "textarea" },
      { key: "massa", label: "Massa (Kg)", type: "text" },
      { key: "altura", label: "Altura (m)", type: "text" },
      { key: "pa", label: "P.A.", type: "text" },
      { key: "fcc", label: "F.C.C.", type: "text" },
      { key: "fr", label: "F.R.", type: "text" },
      { key: "observacoes_gerais", label: "Observações Gerais", type: "textarea" },
    ]
  },
  {
    id: "ATESTADO ALTA.docx",
    name: "Relatório de Alta",
    fields: [
      { key: "diagnostico_cinetico", label: "Diagnóstico Cinético Funcional", type: "textarea" },
      { key: "data_inicio", label: "Data de Início", type: "text" },
      { key: "data_fim", label: "Data de Fim", type: "text" },
      { key: "quadro_clinico", label: "Quadro Clínico", type: "textarea" },
      { key: "objetivo_tratamento", label: "Objetivo do Tratamento", type: "textarea" },
    ]
  },
  {
    id: "ATESTADO FISIOTERAPÊUTICO- COMPARECIMENTO.docx",
    name: "Atestado de Comparecimento",
    fields: [
      { key: "hora_inicio", label: "Hora Início", type: "text" },
      { key: "hora_fim", label: "Hora Fim", type: "text" },
      { key: "data_comparecimento", label: "Data do Comparecimento", type: "text" },
    ]
  },
  {
    id: "AVALIAÇÃO POSTURAL.docx",
    name: "Avaliação Postural",
    fields: [
      { key: "cab_n", label: "VISTA ANTERIOR - CABEÇA: NORMAL", type: "checkbox" },
      { key: "cab_rd", label: "VISTA ANTERIOR - CABEÇA: ROTAÇÃO À DIR", type: "checkbox" },
      { key: "cab_re", label: "VISTA ANTERIOR - CABEÇA: ROTAÇÃO À ESQ", type: "checkbox" },
      { key: "cab_id", label: "VISTA ANTERIOR - CABEÇA: INCLINADA À DIR", type: "checkbox" },
      { key: "cab_ie", label: "VISTA ANTERIOR - CABEÇA: INCLINAÇÃO À ESQ", type: "checkbox" },
      { key: "omb_n", label: "VISTA ANTERIOR - OMBROS: NORMAL", type: "checkbox" },
      { key: "omb_ed", label: "VISTA ANTERIOR - OMBROS: ELEVAÇÃO DIR", type: "checkbox" },
      { key: "omb_ee", label: "VISTA ANTERIOR - OMBROS: ELEVAÇÃO ESQ", type: "checkbox" },
      { key: "omb_md", label: "VISTA ANTERIOR - OMBROS: ↑ MUSCULAR DIR", type: "checkbox" },
      { key: "omb_me", label: "VISTA ANTERIOR - OMBROS: ↑ MUSCULAR ESQ", type: "checkbox" },
      { key: "mam_a", label: "VISTA ANTERIOR - LINHA MAMILAR: ALINHADOS", type: "checkbox" },
      { key: "mam_ed", label: "VISTA ANTERIOR - LINHA MAMILAR: ELEVAÇÃO DIR", type: "checkbox" },
      { key: "mam_ee", label: "VISTA ANTERIOR - LINHA MAMILAR: ELEVAÇÃO ESQ", type: "checkbox" },
      { key: "mam_md", label: "VISTA ANTERIOR - LINHA MAMILAR: ↑ MUSCULAR DIR", type: "checkbox" },
      { key: "mam_me", label: "VISTA ANTERIOR - LINHA MAMILAR: ↑ MUSCULAR ESQ", type: "checkbox" },
      { key: "quad_a", label: "VISTA ANTERIOR - QUADRIL: ALINHADO", type: "checkbox" },
      { key: "quad_id", label: "VISTA ANTERIOR - QUADRIL: INCLINAÇÃO DIR", type: "checkbox" },
      { key: "quad_ie", label: "VISTA ANTERIOR - QUADRIL: INCLINAÇÃO ESQ", type: "checkbox" },
      { key: "quad_rd", label: "VISTA ANTERIOR - QUADRIL: ROTAÇÃO DIR", type: "checkbox" },
      { key: "quad_re", label: "VISTA ANTERIOR - QUADRIL: ROTAÇÃO ESQ", type: "checkbox" },
      { key: "joe_n", label: "VISTA ANTERIOR - JOELHOS: NORMAIS", type: "checkbox" },
      { key: "joe_varo", label: "VISTA ANTERIOR - JOELHOS: VARO", type: "checkbox" },
      { key: "joe_valgo", label: "VISTA ANTERIOR - JOELHOS: VALGO", type: "checkbox" },
      { key: "pat_n", label: "VISTA ANTERIOR - PATELAS: NORMAL", type: "checkbox" },
      { key: "pat_lat", label: "VISTA ANTERIOR - PATELAS: LATERALIZADA", type: "checkbox" },
      { key: "pat_med", label: "VISTA ANTERIOR - PATELAS: MEDIALIZADAS", type: "checkbox" },
      { key: "pat_de", label: "VISTA ANTERIOR - PATELAS: D – E MAIS ALTA", type: "checkbox" },
      { key: "pe_n", label: "VISTA ANTERIOR - PÉS: NORMAL", type: "checkbox" },
      { key: "pe_abdu", label: "VISTA ANTERIOR - PÉS: PÉ ABDUTO", type: "checkbox" },
      { key: "pe_adul", label: "VISTA ANTERIOR - PÉS: PÉ ADULTO", type: "checkbox" },
      { key: "lat_cab_n", label: "VISTA LATERAL - CABEÇA: NORMAL", type: "checkbox" },
      { key: "lat_cab_ret", label: "VISTA LATERAL - CABEÇA: RETRAÇÃO", type: "checkbox" },
      { key: "lat_cab_pro", label: "VISTA LATERAL - CABEÇA: PROTUSA", type: "checkbox" },
      { key: "lat_cab_pro_i", label: "VISTA LATERAL - CABEÇA: PROTUSÃO ↑", type: "checkbox" },
      { key: "lat_omb_n", label: "VISTA LATERAL - OMBROS: NORMAL", type: "checkbox" },
      { key: "lat_omb_ret", label: "VISTA LATERAL - OMBROS: RETRAÇÃO", type: "checkbox" },
      { key: "lat_omb_pro", label: "VISTA LATERAL - OMBROS: PROTUSA", type: "checkbox" },
      { key: "lat_omb_pro_i", label: "VISTA LATERAL - OMBROS: PROTUSÃO ↑", type: "checkbox" },
      { key: "abd_n", label: "VISTA LATERAL - ABDOMEN: NORMAL", type: "checkbox" },
      { key: "abd_pro", label: "VISTA LATERAL - ABDOMEN: PROTUSA", type: "checkbox" },
      { key: "cerv_n", label: "VISTA LATERAL - CERVICAL: NORMAL", type: "checkbox" },
      { key: "cerv_hl", label: "VISTA LATERAL - CERVICAL: HIPERLORDOSE", type: "checkbox" },
      { key: "cerv_ret", label: "VISTA LATERAL - CERVICAL: RETIFICADA", type: "checkbox" },
      { key: "notas_cervical", label: "NOTAS CERVICAL", type: "textarea" },
      { key: "tor_n", label: "VISTA LATERAL - TORÁCICA: NORMAL", type: "checkbox" },
      { key: "tor_hc", label: "VISTA LATERAL - TORÁCICA: HIPERCIFOSE", type: "checkbox" },
      { key: "tor_ret", label: "VISTA LATERAL - TORÁCICA: RETIFICADA", type: "checkbox" },
      { key: "notas_toracica", label: "NOTAS TORÁCICA", type: "textarea" },
      { key: "lom_n", label: "VISTA LATERAL - LOMBAR: NORMAL", type: "checkbox" },
      { key: "lom_hl", label: "VISTA LATERAL - LOMBAR: HIPERLORDOSE", type: "checkbox" },
      { key: "lom_ret", label: "VISTA LATERAL - LOMBAR: RETIFICADA", type: "checkbox" },
      { key: "notas_lombar", label: "NOTAS LOMBAR", type: "textarea" },
      { key: "lat_quad_n", label: "VISTA LATERAL - QUADRIL: NORMAL", type: "checkbox" },
      { key: "lat_quad_ant", label: "VISTA LATERAL - QUADRIL: ANTEVERSÃO", type: "checkbox" },
      { key: "lat_quad_ret", label: "VISTA LATERAL - QUADRIL: RETROVERSÃO", type: "checkbox" },
      { key: "lat_joe_n", label: "VISTA LATERAL - JOELHOS: NORMAL", type: "checkbox" },
      { key: "lat_joe_rec", label: "VISTA LATERAL - JOELHOS: GENO RECURVATO", type: "checkbox" },
      { key: "lat_joe_fle", label: "VISTA LATERAL - JOELHOS: GENO FLEXO", type: "checkbox" },
      { key: "pe_lat_n", label: "VISTA LATERAL - PÉS: NORMAL", type: "checkbox" },
      { key: "pe_plan", label: "VISTA LATERAL - PÉS: PÉ PLANO", type: "checkbox" },
      { key: "pe_arq", label: "VISTA LATERAL - PÉS: PÉ ARQUEADO", type: "checkbox" },
      { key: "esc_n", label: "VISTA POSTERIOR - CINTURA ESCAPULAR: NORMAL", type: "checkbox" },
      { key: "esc_abdu", label: "VISTA POSTERIOR - CINTURA ESCAPULAR: ABDUZIDA", type: "checkbox" },
      { key: "esc_adu", label: "VISTA POSTERIOR - CINTURA ESCAPULAR: ADUZIDA", type: "checkbox" },
      { key: "esc_ele", label: "VISTA POSTERIOR - CINTURA ESCAPULAR: ELEVADAS", type: "checkbox" },
      { key: "esc_dep", label: "VISTA POSTERIOR - CINTURA ESCAPULAR: DEPRIMIDAS", type: "checkbox" },
      { key: "esc_tor_d", label: "VISTA POSTERIOR - COLUNA: ESCOLIOSE TORÁCICA D", type: "checkbox" },
      { key: "esc_tor_e", label: "VISTA POSTERIOR - COLUNA: ESCOLIOSE TORÁCICA ESQ", type: "checkbox" },
      { key: "esc_s", label: "VISTA POSTERIOR - COLUNA: ESCOLIOSE EM S TORACO LOMBAR", type: "checkbox" },
      { key: "esc_lom_d", label: "VISTA POSTERIOR - COLUNA: ESCOLIOSE LOMBAR D", type: "checkbox" },
      { key: "esc_lom_e", label: "VISTA POSTERIOR - COLUNA: ESCOLIOSE LOMBAR E", type: "checkbox" },
      { key: "tales_n", label: "VISTA POSTERIOR - TRIÂNGULO DE TALES: NORMAL", type: "checkbox" },
      { key: "tales_d", label: "VISTA POSTERIOR - TRIÂNGULO DE TALES: ↑ DIR", type: "checkbox" },
      { key: "tales_e", label: "VISTA POSTERIOR - TRIÂNGULO DE TALES: ↑ ESQUERDA", type: "checkbox" },
      { key: "pop_a", label: "VISTA POSTERIOR - LINHA POPLÍTEA: ALINHADA", type: "checkbox" },
      { key: "pop_d", label: "VISTA POSTERIOR - LINHA POPLÍTEA: DIR ELEVADA", type: "checkbox" },
      { key: "pop_e", label: "VISTA POSTERIOR - LINHA POPLÍTEA: ESQ ELEVADA", type: "checkbox" },
      { key: "tor_tc_n", label: "VISTA POSTERIOR - TORNOZELO TC: NORMAL", type: "checkbox" },
      { key: "tor_varo", label: "VISTA POSTERIOR - TORNOZELO TC: VARO", type: "checkbox" },
      { key: "tor_valgo", label: "VISTA POSTERIOR - TORNOZELO TC: VALGO", type: "checkbox" },

    ]
  },
  {
    id: "FICHA DE EVOLUÇÃO DIÁRIA- PILATES.docx",
    name: "Evolução Pilates",
    fields: [
      { key: "data_sessao", label: "Data da Sessão", type: "text" },
      { key: "eq_cadillac", label: "Cadillac", type: "checkbox" },
      { key: "eq_reformer", label: "Reformer", type: "checkbox" },
      { key: "eq_chair", label: "Chair", type: "checkbox" },
      { key: "eq_barrel", label: "Barrel", type: "checkbox" },
      { key: "eq_solo", label: "Solo", type: "checkbox" },
      { key: "obj_along", label: "Objetivo: Alongamento", type: "checkbox" },
      { key: "obj_fort", label: "Objetivo: Fortalecimento", type: "checkbox" },
      { key: "obj_mob", label: "Objetivo: Mobilidade", type: "checkbox" },
      { key: "notas_saida", label: "Notas de Saída", type: "textarea" },
    ]
  },
  {
    id: "FICHA DE EVOLUÇÃO PACIENTE - 1.docx",
    name: "Evolução Clínica",
    fields: [
      { key: "data_evolucao", label: "Data da Evolução", type: "text" },
      { key: "texto_evolucao", label: "Evolução do Dia", type: "textarea" },
    ]
  },
  {
    id: "LAUDO FISIOTERAPEUTICO.docx",
    name: "Laudo / Relatório",
    fields: [
      { key: "data_inicio_tratamento", label: "Data Início Tratamento", type: "text" },
      { key: "queixas_sintomas", label: "Queixas e Sintomas", type: "textarea" },
      { key: "diagnostico_funcional", label: "Diagnóstico Funcional", type: "textarea" },
      { key: "objetivos_propostos", label: "Objetivos Propostos", type: "textarea" },
      { key: "plano_tratamento", label: "Plano de Tratamento", type: "textarea" },
      { key: "evolucao_final", label: "Evolução Final", type: "textarea" },
    ]
  },
  {
    id: "RECEITUARIO.docx",
    name: "Receituário",
    fields: [
      { key: "conteudo_receituario", label: "Conteúdo do Receituário", type: "textarea" },
    ]
  },
  {
    id: "SOLICITAÇÃO PARA EXAME.docx",
    name: "Solicitação de Exame",
    fields: [
      { key: "tipo_exame", label: "Tipo de Exame", type: "text" },
      { key: "condicoes_avaliar", label: "Condições a Avaliar", type: "textarea" },
    ]
  },
  {
    id: "TERMO DE CONSENTIMENTO.docx",
    name: "Termo de Consentimento",
    fields: [
      { key: "testemunha_1_nome", label: "Nome Testemunha 1", type: "text" },
      { key: "testemunha_1_cpf", label: "CPF Testemunha 1", type: "text" },
    ]
  },
  {
    id: "FICHA DE AVALIAÇÃO ORTOPEDIA -1.docx",
    name: "Avaliação Ortopedia",
    fields: [
      { key: "hda", label: "História da Doença Atual", type: "textarea" },
      { key: "exames_complementares", label: "Exames Complementares", type: "textarea" },
      { key: "diagnostico_fisioterapeutico", label: "Diagnóstico Fisioterapêutico", type: "textarea" },
    ]
  },
  {
    id: "RELATÓRIO FISIOTERAPEUTICO.docx",
    name: "Relatório Fisioterapêutico",
    fields: [
      { key: "descricao_relatorio", label: "Descrição", type: "textarea" }
    ]
  }
];
