'use client'

import { useRef, useEffect, useState, useCallback } from 'react'
import * as d3 from 'd3'
import { FAILURE_MODES, FAMILY_META } from '@/src/data/failureModes'
import { RELATIONSHIPS } from '@/src/data/relationships'
import { FAMILY_COLORS, FAMILY_LABELS } from '@/src/styles/tokens'
import type { FailureMode, FailureModeFamily } from '@/src/types'

interface AtlasMapProps {
  onSelect?: (mode: FailureMode | null) => void
  selectedId?: string | null
}

const WIDTH = 760
const HEIGHT = 520
const PADDING = 48

function xScale(val: number) {
  const xMin = -3.2
  const xMax = 3.2
  return PADDING + ((val - xMin) / (xMax - xMin)) * (WIDTH - PADDING * 2)
}

function yScale(val: number) {
  const yMin = -2.6
  const yMax = 2.2
  return PADDING + ((val - yMin) / (yMax - yMin)) * (HEIGHT - PADDING * 2)
}

export function AtlasMap({ onSelect, selectedId }: AtlasMapProps) {
  const svgRef = useRef<SVGSVGElement>(null)
  const [hovered, setHovered] = useState<string | null>(null)
  const [tooltip, setTooltip] = useState<{ x: number; y: number; mode: FailureMode } | null>(null)
  const [activeFamily, setActiveFamily] = useState<FailureModeFamily | null>(null)
  const [showEdges, setShowEdges] = useState(true)

  const filteredModes = activeFamily
    ? FAILURE_MODES.filter((m) => m.family === activeFamily)
    : FAILURE_MODES

  const filteredIds = new Set(filteredModes.map((m) => m.id))

  const filteredEdges = showEdges
    ? RELATIONSHIPS.filter(
        (r) => filteredIds.has(r.source) && filteredIds.has(r.target)
      )
    : []

  const handleClick = useCallback(
    (mode: FailureMode) => {
      onSelect?.(selectedId === mode.id ? null : mode)
    },
    [onSelect, selectedId]
  )

  return (
    <div style={{ width: '100%' }}>
      {/* Controls */}
      <div
        className="flex flex-wrap items-center gap-3 mb-5"
        style={{ marginBottom: '20px' }}
      >
        <span className="font-mono text-[11px] text-secondary tracking-widest uppercase">
          Filter family:
        </span>
        <button
          type="button"
          onClick={() => setActiveFamily(null)}
          className="font-mono text-[11px] border rounded transition-all"
          style={{
            padding: '4px 12px',
            color: activeFamily === null ? '#FAFAF8' : '#5C5A54',
            backgroundColor: activeFamily === null ? '#1A1915' : 'transparent',
            borderColor: activeFamily === null ? '#1A1915' : '#E4E2DB',
            cursor: 'pointer',
          }}
        >
          All
        </button>
        {FAMILY_META.map((f) => (
          <button
            key={f.key}
            type="button"
            onClick={() => setActiveFamily(activeFamily === f.key ? null : f.key)}
            className="font-mono text-[11px] border rounded transition-all"
            style={{
              padding: '4px 12px',
              color: activeFamily === f.key ? '#FAFAF8' : f.color,
              backgroundColor: activeFamily === f.key ? f.color : 'transparent',
              borderColor: f.color,
              cursor: 'pointer',
            }}
          >
            {f.label}
          </button>
        ))}

        <label className="flex items-center gap-2 font-mono text-[11px] text-secondary ml-auto cursor-pointer">
          <input
            type="checkbox"
            checked={showEdges}
            onChange={(e) => setShowEdges(e.target.checked)}
            className="accent-accent"
          />
          Show edges
        </label>
      </div>

      {/* SVG canvas */}
      <div
        style={{
          width: '100%',
          background: '#FAFAF8',
          border: '1px solid #E4E2DB',
          borderRadius: '4px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <svg
          ref={svgRef}
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          style={{ width: '100%', display: 'block', cursor: 'crosshair' }}
          onMouseLeave={() => {
            setHovered(null)
            setTooltip(null)
          }}
        >
          {/* Grid lines — very subtle */}
          {[-2, -1, 0, 1, 2].map((v) => (
            <g key={`grid-${v}`}>
              <line
                x1={xScale(v)}
                y1={PADDING}
                x2={xScale(v)}
                y2={HEIGHT - PADDING}
                stroke="#E4E2DB"
                strokeWidth={0.5}
              />
              <line
                x1={PADDING}
                y1={yScale(v)}
                x2={WIDTH - PADDING}
                y2={yScale(v)}
                stroke="#E4E2DB"
                strokeWidth={0.5}
              />
            </g>
          ))}

          {/* Relationship edges */}
          {filteredEdges.map((rel) => {
            const src = FAILURE_MODES.find((m) => m.id === rel.source)
            const tgt = FAILURE_MODES.find((m) => m.id === rel.target)
            if (!src || !tgt) return null
            const isHoveredEdge = hovered === rel.source || hovered === rel.target
            const isSelectedEdge = selectedId === rel.source || selectedId === rel.target
            return (
              <line
                key={`${rel.source}-${rel.target}`}
                x1={xScale(src.x)}
                y1={yScale(src.y)}
                x2={xScale(tgt.x)}
                y2={yScale(tgt.y)}
                stroke={isHoveredEdge || isSelectedEdge ? '#1A1915' : '#E4E2DB'}
                strokeWidth={isHoveredEdge || isSelectedEdge ? rel.strength * 0.6 : 0.8}
                strokeOpacity={isHoveredEdge || isSelectedEdge ? 0.7 : 0.5}
              />
            )
          })}

          {/* Failure mode nodes */}
          {FAILURE_MODES.map((mode) => {
            const cx = xScale(mode.x)
            const cy = yScale(mode.y)
            const color = FAMILY_COLORS[mode.family] ?? '#888888'
            const isSelected = selectedId === mode.id
            const isHov = hovered === mode.id
            const isFiltered = filteredIds.has(mode.id)
            const r = isSelected ? 11 : isHov ? 10 : 8

            return (
              <g key={mode.id}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={r + 8}
                  fill="transparent"
                  style={{ cursor: 'pointer' }}
                  onClick={() => handleClick(mode)}
                  onMouseEnter={() => {
                    setHovered(mode.id)
                    setTooltip({ x: cx, y: cy, mode })
                  }}
                  onMouseLeave={() => {
                    setHovered(null)
                    setTooltip(null)
                  }}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={r}
                  fill={color}
                  fillOpacity={isFiltered ? (isSelected || isHov ? 1 : 0.82) : 0.2}
                  stroke={isSelected ? '#1A1915' : isHov ? color : 'transparent'}
                  strokeWidth={isSelected ? 2.5 : isHov ? 2 : 0}
                  style={{ pointerEvents: 'none', transition: 'r 0.1s, fill-opacity 0.15s' }}
                />
                {/* Label for selected or hovered */}
                {(isSelected || isHov) && isFiltered && (
                  <text
                    x={cx}
                    y={cy - r - 6}
                    textAnchor="middle"
                    fill="#1A1915"
                    style={{
                      fontFamily: "'Sora', sans-serif",
                      fontSize: '10px',
                      fontWeight: 600,
                      pointerEvents: 'none',
                    }}
                  >
                    {mode.displayName.length > 20
                      ? mode.displayName.slice(0, 20) + '...'
                      : mode.displayName}
                  </text>
                )}
              </g>
            )
          })}
        </svg>

        {/* Tooltip */}
        {tooltip && (
          <div
            style={{
              position: 'absolute',
              left: `${(tooltip.x / WIDTH) * 100}%`,
              top: `${(tooltip.y / HEIGHT) * 100}%`,
              transform: 'translate(-50%, -120%)',
              background: '#FFFFFF',
              border: '1px solid #E4E2DB',
              borderRadius: '4px',
              padding: '10px 14px',
              maxWidth: '220px',
              pointerEvents: 'none',
              zIndex: 10,
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            }}
          >
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: '#1A1915',
                marginBottom: '4px',
              }}
            >
              {tooltip.mode.displayName}
            </p>
            <p
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '12px',
                color: '#5C5A54',
                lineHeight: 1.5,
              }}
            >
              {tooltip.mode.shortDefinition.slice(0, 90)}
              {tooltip.mode.shortDefinition.length > 90 ? '...' : ''}
            </p>
            <p
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: '10px',
                color: FAMILY_COLORS[tooltip.mode.family] ?? '#888888',
                marginTop: '6px',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {FAMILY_LABELS[tooltip.mode.family]}
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4">
        {FAMILY_META.map((f) => (
          <div key={f.key} className="flex items-center gap-2">
            <div
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                backgroundColor: f.color,
                flexShrink: 0,
              }}
            />
            <span className="font-mono text-[11px] text-secondary">{f.label}</span>
          </div>
        ))}
      </div>

      <p
        className="font-sans text-[12px] text-[#8A8880]"
        style={{ marginTop: '12px', fontStyle: 'italic' }}
      >
        Distance and layout are teaching aids, not ground truth. Click any node to see details.
      </p>
    </div>
  )
}
