import { TECH_STACK_OPTIONS } from '@/constants';
import type { TechStack } from '@/types';

const stackPattern = /^(?=.*[A-Za-z0-9])[A-Za-z0-9 .#+/-]+$/;
const maxStackLabelLength = 40;

function canonicalKnownStack(label: string): TechStack | undefined {
  return TECH_STACK_OPTIONS.find((option) => option.toLowerCase() === label.toLowerCase());
}

export function normalizeStackLabel(value: unknown): TechStack | undefined {
  if (typeof value !== 'string') return undefined;

  const label = value.trim().replace(/\s+/g, ' ');
  if (!label || label.length > maxStackLabelLength || !stackPattern.test(label)) {
    return undefined;
  }

  return canonicalKnownStack(label) ?? label;
}

export function sameStackLabel(a: TechStack, b: TechStack) {
  return a.toLowerCase() === b.toLowerCase();
}

export function normalizeStackList(stack: unknown): TechStack[] {
  if (!Array.isArray(stack)) return ['TypeScript'];

  const seen = new Set<string>();
  const normalized: TechStack[] = [];

  for (const item of stack) {
    const label = normalizeStackLabel(item);
    if (!label) continue;

    const key = label.toLowerCase();
    if (seen.has(key)) continue;

    seen.add(key);
    normalized.push(label);
  }

  return normalized.length ? normalized : ['TypeScript'];
}
