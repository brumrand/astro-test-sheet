/**
 * Sistema de Éter — datos y cálculos puros.
 * Todo el contenido de reglas vive aquí, para que la UI no tenga lógica propia.
 */

export type BaseStatId =
	| 'FUE'
	| 'DES'
	| 'CON'
	| 'VOL'
	| 'HAB'
	| 'CAR'
	| 'INT'
	| 'PER';

export type BaseValues = Record<BaseStatId, number>;

export interface BaseStat {
	id: BaseStatId;
	name: string;
	/** Justificación de la Stat Base (ref: tabla de atributos). */
	justification: string;
}

export interface EterStat {
	name: string;
	/** Las 3 Stats Base cuya suma define esta estadística de Éter. */
	formula: [BaseStatId, BaseStatId, BaseStatId];
	/** Habilidad desbloqueada al alcanzar esta estadística. */
	unlocked: string;
	/** Función mecánica. */
	mechanic: string;
}

export interface Grade {
	roman: string;
	min: number;
	max: number;
	theoretical: string;
	profile: string;
}

export interface MagicType {
	/** Abreviatura de la escuela (etiqueta corta). */
	id: string;
	name: string;
	/** Qué hace la escuela. */
	scope: string;
	/** Ventaja o compromiso que define su uso. */
	efficiency: string;
}

/** Valor inicial de cada atributo base. */
export const DEFAULT_BASE = 5;

/** Máximo editable de un atributo base (máximo natural: 10/10/10). */
export const MAX_BASE = 10;

/** Rango de cada estadística de Éter (suma de 3). */
export const ETER_MIN = 3;
export const ETER_MAX = 30;

export const BASE_STATS: readonly BaseStat[] = [
	{
		id: 'FUE',
		name: 'Fuerza',
		justification:
			'Potencia física, tensión de empuje y resistencia mecánica del conducto.',
	},
	{
		id: 'DES',
		name: 'Destreza',
		justification:
			'Coordinación motriz fina, reflejos y enmascaramiento kinético.',
	},
	{
		id: 'CON',
		name: 'Constitución',
		justification:
			'Salud celular, vitalidad (CON7), tolerancia al flujo y depósito biológico.',
	},
	{
		id: 'VOL',
		name: 'Voluntad',
		justification:
			'Anclaje psíquico, retención de energía y concentración de densidad forzada.',
	},
	{
		id: 'HAB',
		name: 'Habilidad',
		justification:
			'Técnica adquirida, calibración de válvulas y reparación de circuitos.',
	},
	{
		id: 'CAR',
		name: 'Carisma',
		justification:
			'Resonancia áurica, armonización de canales y sincronía con redes externas.',
	},
	{
		id: 'INT',
		name: 'Inteligencia',
		justification:
			'Cálculo de vectores, tolerancias térmicas/etéricas y análisis de densidad.',
	},
	{
		id: 'PER',
		name: 'Percepción',
		justification:
			'Detección sensorial de corrientes, anticipación e interconexión de nodos.',
	},
] as const;

export const ETER_STATS: readonly EterStat[] = [
	{
		name: 'Volumen de Éter',
		formula: ['CON', 'VOL', 'PER'],
		unlocked: 'Reserva',
		mechanic: 'Límite máximo de PE almacenables en el cuerpo.',
	},
	{
		name: 'Caudal',
		formula: ['FUE', 'CON', 'INT'],
		unlocked: 'Descarga',
		mechanic: 'Límite de PE gastables/movibles en una sola acción.',
	},
	{
		name: 'Recuperación',
		formula: ['CON', 'VOL', 'CAR'],
		unlocked: 'Recarga',
		mechanic:
			'PE que se reponen de forma natural por intervalo de respiro.',
	},
	{
		name: 'Velocidad de Flujo',
		formula: ['DES', 'HAB', 'PER'],
		unlocked: 'Aceleración',
		mechanic:
			'Reducción de tiempo de canalización e iniciativa mágica.',
	},
	{
		name: 'Precisión de Flujo',
		formula: ['DES', 'HAB', 'PER'],
		unlocked: 'Filigrana',
		mechanic: 'Puntería, exclusión de aliados y modulación de área.',
	},
	{
		name: 'Movilización Directa',
		formula: ['FUE', 'DES', 'VOL'],
		unlocked: 'Impulso',
		mechanic:
			'Manipulación vectorial y cinemática sin sellos ni fórmulas.',
	},
	{
		name: 'Ocultamiento de Éter',
		formula: ['DES', 'VOL', 'CAR'],
		unlocked: 'Velado',
		mechanic: 'Supresión y falsificación de la firma energética.',
	},
	{
		name: 'Control de Presión',
		formula: ['FUE', 'HAB', 'INT'],
		unlocked: 'Regulación',
		mechanic:
			'Tolerancia a sobrecargas y forzado de potencia sin daño.',
	},
	{
		name: 'Redundancia',
		formula: ['CON', 'HAB', 'CAR'],
		unlocked: 'Circuito Emergente',
		mechanic: 'Absorción de fallos y sustitución de canales dañados.',
	},
	{
		name: 'Disponibilidad en Red',
		formula: ['CAR', 'INT', 'PER'],
		unlocked: 'Conexión',
		mechanic:
			'Capacidad de extraer y alimentar técnicas desde nodos/leylines.',
	},
	{
		name: 'Compresión',
		formula: ['FUE', 'VOL', 'INT'],
		unlocked: 'Densificación',
		mechanic:
			'Concentración volumétrica de PE para perforación y solidez.',
	},
] as const;

/** Las 10 escuelas de magia y su compromiso operativo. */
export const MAGIC_TYPES: readonly MagicType[] = [
	{
		id: 'FOR',
		name: 'Fortificación',
		scope:
			'Potenciación física del cuerpo y del equipo del usuario.',
		efficiency:
			'Mejora resistencia, reflejos y combate cuerpo a cuerpo con alta eficiencia y mínimo consumo.',
	},
	{
		id: 'MAN',
		name: 'Manifestación',
		scope:
			'Creación de materia física tangible a partir de Éter: armas, escudos, gólems o proyectiles.',
		efficiency:
			'Sumamente versátil, pero con alto coste de energía.',
	},
	{
		id: 'ELE',
		name: 'Elementalismo',
		scope:
			'Proyección y manipulación de las fuerzas de la naturaleza (fuego, hielo, rayo, gravedad).',
		efficiency:
			'Ofrece control del terreno y devastación ofensiva a cambio de un elevado gasto de Éter.',
	},
	{
		id: 'ENC',
		name: 'Encantamiento',
		scope:
			'Fijación de propiedades mágicas de forma permanente en objetos e indumentaria.',
		efficiency:
			'Crea artefactos de gran valor mediante un proceso largo de manufactura.',
	},
	{
		id: 'RUN',
		name: 'Runología',
		scope:
			'Grabado de símbolos para almacenar y programar efectos mágicos diferidos (sellos, barreras, teletransportes).',
		efficiency: 'Requiere tiempo de preparación previo.',
	},
	{
		id: 'ALQ',
		name: 'Alquimia',
		scope:
			'Transmutación y alteración de la materia física mediante catalizadores de Éter (pociones, venenos, explosivos y aleaciones).',
		efficiency: 'Depende estrictamente de materiales físicos.',
	},
	{
		id: 'BIO',
		name: 'Biomancia',
		scope:
			'Manipulación y reestructuración de organismos vivos (curación, regeneración de tejidos, cirugía y antídotos).',
		efficiency:
			'Rama médica y de soporte esencial, sin daño directo.',
	},
	{
		id: 'ILU',
		name: 'Ilusionismo',
		scope:
			'Alteración de los sentidos y la percepción ajena (invisibilidad, copias falsas, engaños auditivos y miedo).',
		efficiency:
			'Orientada al sigilo, la infiltración y la confusión mental sin causar heridas físicas.',
	},
	{
		id: 'PAC',
		name: 'Pactismo',
		scope:
			'Negociación y contratos con entidades inteligentes (espíritus, sombras, custodios) para tomar prestados poderes ajenos.',
		efficiency:
			'Se paga con un precio o juramento pactado.',
	},
	{
		id: 'ESP',
		name: 'Espiritualismo',
		scope:
			'Interacción y control del plano del alma (purificación, anulación de maldiciones, barreras mentales y sellado de espíritus).',
		efficiency:
			'Altamente especializada contra amenazas incorpóreas.',
	},
] as const;

export const GRADE_SCALE: readonly Grade[] = [
	{
		roman: 'I',
		min: 3,
		max: 7,
		theoretical: 'Residual',
		profile: 'Manejo torpe, fugas constantes y límites mínimos.',
	},
	{
		roman: 'II',
		min: 8,
		max: 11,
		theoretical: 'Básico',
		profile: 'Competencia estándar de aprendiz.',
	},
	{
		roman: 'III',
		min: 12,
		max: 15,
		theoretical: 'Operativo',
		profile: 'Mago funcional de campo; efectividad consistente.',
	},
	{
		roman: 'IV',
		min: 16,
		max: 19,
		theoretical: 'Avanzado',
		profile:
			'Especialista; acceso a técnicas complejas y divididas.',
	},
	{
		roman: 'V',
		min: 20,
		max: 23,
		theoretical: 'Superior',
		profile:
			'Rango del personaje inicial (todas las stats en 7 = 21).',
	},
	{
		roman: 'VI',
		min: 24,
		max: 27,
		theoretical: 'Excepcional',
		profile: 'Maestro de élite; manipulación a escala mayor.',
	},
	{
		roman: 'VII',
		min: 28,
		max: 30,
		theoretical: 'Trascendente',
		profile:
			'Máximo natural alcanzable con atributos al límite (10/10/10).',
	},
] as const;

/** Nombre corto de un atributo base, para mostrar en fórmulas. */
export const BASE_LABEL: Record<BaseStatId, string> = {
	FUE: 'Fuerza',
	DES: 'Destreza',
	CON: 'Constitución',
	VOL: 'Voluntad',
	HAB: 'Habilidad',
	CAR: 'Carisma',
	INT: 'Inteligencia',
	PER: 'Percepción',
};

/**
 * Estadísticas de Éter en las que influye cada atributo base.
 * Se deriva de las fórmulas, así que no puede desincronizarse de la tabla.
 */
export const BASE_INFLUENCES: Record<BaseStatId, string[]> = (
	BASE_STATS.reduce(
		(acc, stat) => {
			acc[stat.id] = ETER_STATS.filter((s) =>
				(s.formula as readonly string[]).includes(stat.id),
			).map((s) => s.name);
			return acc;
		},
		{} as Record<BaseStatId, string[]>,
	)
) as Record<BaseStatId, string[]>;

/** Atributos base con todos los valores por defecto. */
export function defaultBaseValues(): BaseValues {
	return BASE_STATS.reduce(
		(acc, stat) => {
			acc[stat.id] = DEFAULT_BASE;
			return acc;
		},
		{} as BaseValues,
	);
}

/** Acota un valor al rango permitido de un atributo base. */
export function clampBase(value: number): number {
	if (!Number.isFinite(value)) return DEFAULT_BASE;
	return Math.min(MAX_BASE, Math.max(0, Math.round(value)));
}

/** Devuelve el grado correspondiente a una suma de Éter. */
export function gradeFor(sum: number): Grade {
	const clamped = Math.min(ETER_MAX, Math.max(ETER_MIN, sum));
	const found = GRADE_SCALE.find(
		(g) => clamped >= g.min && clamped <= g.max,
	);
	return found ?? GRADE_SCALE[0];
}

export interface ComputedEter {
	stat: EterStat;
	sum: number;
	grade: Grade;
	formulaLabel: string;
}

/** Calcula las 11 estadísticas de Éter a partir de los atributos base. */
export function computeEter(base: BaseValues): ComputedEter[] {
	return ETER_STATS.map((stat) => {
		const sum = stat.formula.reduce(
			(total, id) => total + clampBase(base[id]),
			0,
		);
		return {
			stat,
			sum,
			grade: gradeFor(sum),
			formulaLabel: stat.formula.join(' + '),
		};
	});
}

/** Suma total de los 8 atributos base. */
export function totalBase(base: BaseValues): number {
	return BASE_STATS.reduce((acc, s) => acc + clampBase(base[s.id]), 0);
}

/** Grado más alto alcanzado por el personaje, si alguna estadística lo toca. */
export function topGrade(eter: ComputedEter[]): Grade {
	return eter.reduce(
		(best, cur) => (cur.grade.max > best.max ? cur.grade : best),
		GRADE_SCALE[0],
	);
}
