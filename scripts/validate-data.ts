/**
 * Validate all static data files for internal consistency.
 * Run: npm run validate:data
 */
import { FAILURE_MODES } from '../src/data/failureModes'
import { EXAMPLES } from '../src/data/examples'
import { LEARNING_PATHS } from '../src/data/learningPaths'
import { RELATIONSHIPS } from '../src/data/relationships'

const errors: string[] = []
const warnings: string[] = []

const modeIds = new Set(FAILURE_MODES.map((m) => m.id))

// 1. No duplicate failure mode IDs
const modeIdList = FAILURE_MODES.map((m) => m.id)
const duplicateModes = modeIdList.filter((id, idx) => modeIdList.indexOf(id) !== idx)
if (duplicateModes.length > 0) {
  errors.push(`Duplicate failure mode IDs: ${duplicateModes.join(', ')}`)
}

// 2. Every relatedMode in each failure mode points to a real mode
for (const mode of FAILURE_MODES) {
  for (const related of mode.relatedModes) {
    if (!modeIds.has(related)) {
      errors.push(`Failure mode "${mode.id}" has unknown relatedMode: "${related}"`)
    }
  }
}

// 3. No duplicate example IDs
const exampleIdList = EXAMPLES.map((e) => e.id)
const duplicateExamples = exampleIdList.filter((id, idx) => exampleIdList.indexOf(id) !== idx)
if (duplicateExamples.length > 0) {
  errors.push(`Duplicate example IDs: ${duplicateExamples.join(', ')}`)
}

// 4. Every example points to an existing failure mode
for (const example of EXAMPLES) {
  if (!modeIds.has(example.failureModeId)) {
    errors.push(`Example "${example.id}" references unknown failureModeId: "${example.failureModeId}"`)
  }
}

// 5. Every learning path mode exists
for (const path of LEARNING_PATHS) {
  for (const modeId of path.orderedModeIds) {
    if (!modeIds.has(modeId)) {
      errors.push(`Learning path "${path.id}" references unknown mode: "${modeId}"`)
    }
  }
}

// 6. No duplicate learning path IDs
const pathIdList = LEARNING_PATHS.map((p) => p.id)
const duplicatePaths = pathIdList.filter((id, idx) => pathIdList.indexOf(id) !== idx)
if (duplicatePaths.length > 0) {
  errors.push(`Duplicate learning path IDs: ${duplicatePaths.join(', ')}`)
}

// 7. Every relationship points to existing modes
for (const rel of RELATIONSHIPS) {
  if (!modeIds.has(rel.source)) {
    errors.push(`Relationship has unknown source: "${rel.source}"`)
  }
  if (!modeIds.has(rel.target)) {
    errors.push(`Relationship has unknown target: "${rel.target}"`)
  }
  if (rel.strength < 1 || rel.strength > 5) {
    errors.push(`Relationship "${rel.source} -> ${rel.target}" has invalid strength: ${rel.strength}`)
  }
}

// 8. Warn on modes with no examples
for (const mode of FAILURE_MODES) {
  const exCount = EXAMPLES.filter((e) => e.failureModeId === mode.id).length
  if (exCount === 0) {
    warnings.push(`Failure mode "${mode.id}" has no examples.`)
  }
}

// 9. Warn on modes with no relationships
for (const mode of FAILURE_MODES) {
  const hasRel = RELATIONSHIPS.some(
    (r) => r.source === mode.id || r.target === mode.id
  )
  if (!hasRel) {
    warnings.push(`Failure mode "${mode.id}" has no relationships.`)
  }
}

// Report
console.log('\n=== Failure Mode Atlas: Data Validation ===\n')
console.log(`Failure modes:   ${FAILURE_MODES.length}`)
console.log(`Examples:        ${EXAMPLES.length}`)
console.log(`Learning paths:  ${LEARNING_PATHS.length}`)
console.log(`Relationships:   ${RELATIONSHIPS.length}`)

if (warnings.length > 0) {
  console.log(`\nWarnings (${warnings.length}):`)
  for (const w of warnings) console.log(`  WARN  ${w}`)
}

if (errors.length > 0) {
  console.log(`\nErrors (${errors.length}):`)
  for (const e of errors) console.log(`  ERROR ${e}`)
  process.exit(1)
} else {
  console.log('\nAll checks passed.\n')
}
