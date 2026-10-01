/**
 * Geometría del gráfico de araña.
 * Compartida entre el render inicial de Astro (frontmatter) y el script
 * cliente, de modo que el SVG se dibuja igual en servidor y en navegador.
 */

export const RADAR_VIEWBOX = '0 0 640 580';
export const RADAR_CX = 320;
export const RADAR_CY = 275;
/** Radio del anillo exterior (valor máximo). */
export const RADAR_R = 152;

/**
 * Radios de las etiquetas de eje, alternados.
 * Con 11 ejes los textos se solapan si todos comparten radio, así que cada
 * etiqueta se separa de su vecina empujándola un anillo más hacia fuera.
 */
const LABEL_R_NEAR = 180;
const LABEL_R_FAR = 208;

/** Desplazamiento vertical del nombre respecto al punto de la etiqueta. */
const LABEL_DY_NAME = -7;
/** Desplazamiento vertical del valor respecto al punto de la etiqueta. */
const LABEL_DY_VALUE = 10;

/** Anillos de la retícula, en valor de estadística de Éter. */
export const RADAR_RINGS: readonly number[] = [6, 12, 18, 24, 30];

/** Ángulo (en grados) del eje `index` de un radar de `count` ejes. */
export function axisAngle(index: number, count: number): number {
	return -90 + (index * 360) / count;
}

/** Punto cartesiano de un eje. `ratio` es 0–1 respecto al radio exterior. */
export function axisPoint(
	index: number,
	count: number,
	ratio: number,
	radius = RADAR_R,
): { x: number; y: number } {
	const rad = (axisAngle(index, count) * Math.PI) / 180;
	return {
		x: RADAR_CX + Math.cos(rad) * radius * ratio,
		y: RADAR_CY + Math.sin(rad) * radius * ratio,
	};
}

/** `points` de un polígono regular (retícula o serie de datos). */
export function ringPoints(
	count: number,
	ratio: number,
	radius = RADAR_R,
): string {
	return Array.from({ length: count }, (_, i) => {
		const { x, y } = axisPoint(i, count, ratio, radius);
		return `${x.toFixed(2)},${y.toFixed(2)}`;
	}).join(' ');
}

/** `points` del polígono de la serie, a partir de valores absolutos. */
export function seriesPoints(
	values: readonly number[],
	max: number,
): string {
	const count = values.length;
	return values
		.map((value, i) => {
			const ratio = Math.max(0, Math.min(1, value / max));
			const { x, y } = axisPoint(i, count, ratio);
			return `${x.toFixed(2)},${y.toFixed(2)}`;
		})
		.join(' ');
}

/**
 * Anclaje de texto según la posición del eje, para que el texto crezca
 * hacia fuera del gráfico y nunca se salga del viewBox.
 */
export function anchorFor(
	index: number,
	count: number,
): 'start' | 'middle' | 'end' {
	const cos = Math.cos((axisAngle(index, count) * Math.PI) / 180);
	if (cos > 0.25) return 'start';
	if (cos < -0.25) return 'end';
	return 'middle';
}

export interface LabelPlacement {
	x: number;
	y: number;
	anchor: 'start' | 'middle' | 'end';
	dyName: number;
	dyValue: number;
}

/**
 * Posición de las dos líneas de la etiqueta de un eje (nombre y valor).
 * Los desplazamientos son absolutos y en unidades del viewBox, no `em`, para
 * que el nombre y el valor nunca se pisen entre sí.
 */
export function labelPlacement(
	index: number,
	count: number,
): LabelPlacement {
	const radius = index % 2 === 0 ? LABEL_R_NEAR : LABEL_R_FAR;
	const { x, y } = axisPoint(index, count, 1, radius);
	return {
		x,
		y,
		anchor: anchorFor(index, count),
		dyName: LABEL_DY_NAME,
		dyValue: LABEL_DY_VALUE,
	};
}
