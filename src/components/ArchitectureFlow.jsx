import React, { useEffect, useState } from 'react';
import { ReactFlow, Background, Position, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const AMBER = '#FFB84D';
const AMBER_DARK = '#D49A30';
const TEAL = '#00D4AA';
const TEAL_DARK = '#00A882';
const INDIGO = '#4A4AFF';
const INDIGO_DARK = '#3535CC';
const NEUTRAL = '#5A5A7A';
const NEUTRAL_DARK = '#3A3A55';

const hs = { background: 'transparent', border: 'none', width: 1, height: 1 };

// Handles on all 4 sides, each acting as both source AND target
const AllHandles = () => (
  <>
    <Handle type="source" position={Position.Top} id="top-src" style={hs} />
    <Handle type="target" position={Position.Top} id="top-tgt" style={hs} />
    <Handle type="source" position={Position.Bottom} id="bot-src" style={hs} />
    <Handle type="target" position={Position.Bottom} id="bot-tgt" style={hs} />
    <Handle type="source" position={Position.Left} id="left-src" style={hs} />
    <Handle type="target" position={Position.Left} id="left-tgt" style={hs} />
    <Handle type="source" position={Position.Right} id="right-src" style={hs} />
    <Handle type="target" position={Position.Right} id="right-tgt" style={hs} />
  </>
);

const makeNodeStyle = (bg, border) => ({
  background: bg,
  border: `2px solid ${border}`,
  borderRadius: '10px',
  padding: '12px 18px',
  minWidth: '160px',
  textAlign: 'center',
  color: '#fff',
  fontFamily: "'Geist Mono', monospace",
  fontSize: '14px',
  letterSpacing: '0.02em',
  boxShadow: `0 4px 20px rgba(0,0,0,0.3), 0 0 15px ${border}22`,
});

const doraNode = ({ data }) => (
  <div style={makeNodeStyle(data.bg, data.border)}>
    <AllHandles />
    <div style={{ fontWeight: 600, fontSize: '15px' }}>{data.label}</div>
    {data.description && (
      <div style={{ opacity: 0.8, marginTop: '4px', fontSize: '12px', fontFamily: "'Geist', sans-serif" }}>
        {data.description}
      </div>
    )}
  </div>
);

const EntryNode = ({ data }) => (
  <div style={{ ...makeNodeStyle(AMBER, AMBER_DARK), color: '#1a1a2e', minWidth: '220px', fontSize: '16px', fontWeight: 700 }}>
    <AllHandles />
    <div>{data.label}</div>
  </div>
);

const ZenohNode = ({ data }) => (
  <div style={{
    background: 'rgba(74, 74, 255, 0.08)', border: `2px dashed ${INDIGO}`, borderRadius: '8px',
    padding: '8px 14px', minWidth: '560px', textAlign: 'center', color: INDIGO,
    fontFamily: "'Geist Mono', monospace", fontSize: '14px', fontWeight: 600, letterSpacing: '0.04em',
  }}>
    <AllHandles />
    {data.label}
  </div>
);

const nodeTypes = { adora: doraNode, entry: EntryNode, zenoh: ZenohNode };

const initialNodes = [
  { id: 'cli', type: 'entry', position: { x: 280, y: 0 }, data: { label: 'dora CLI' } },
  { id: 'coordinator', type: 'adora', position: { x: 280, y: 120 }, data: { label: 'Coordinator', description: 'WebSocket control plane', bg: TEAL, border: TEAL_DARK } },
  { id: 'daemon1', type: 'adora', position: { x: 60, y: 240 }, data: { label: 'Daemon (host-1)', bg: INDIGO, border: INDIGO_DARK } },
  { id: 'daemon2', type: 'adora', position: { x: 280, y: 240 }, data: { label: 'Daemon (host-2)', bg: INDIGO, border: INDIGO_DARK } },
  { id: 'daemon3', type: 'adora', position: { x: 500, y: 240 }, data: { label: 'Daemon (host-3)', bg: INDIGO, border: INDIGO_DARK } },
  { id: 'zenoh', type: 'zenoh', position: { x: 60, y: 340 }, data: { label: 'Zenoh Data Plane' } },
  { id: 'nodeA', type: 'adora', position: { x: 20, y: 420 }, data: { label: 'Node A', bg: NEUTRAL, border: NEUTRAL_DARK } },
  { id: 'nodeB', type: 'adora', position: { x: 140, y: 420 }, data: { label: 'Node B', bg: NEUTRAL, border: NEUTRAL_DARK } },
  { id: 'nodeC', type: 'adora', position: { x: 260, y: 420 }, data: { label: 'Node C', bg: NEUTRAL, border: NEUTRAL_DARK } },
  { id: 'nodeD', type: 'adora', position: { x: 380, y: 420 }, data: { label: 'Node D', bg: NEUTRAL, border: NEUTRAL_DARK } },
  { id: 'nodeE', type: 'adora', position: { x: 480, y: 420 }, data: { label: 'Node E', bg: NEUTRAL, border: NEUTRAL_DARK } },
  { id: 'nodeF', type: 'adora', position: { x: 600, y: 420 }, data: { label: 'Node F', bg: NEUTRAL, border: NEUTRAL_DARK } },
];

const te = { type: 'smoothstep', animated: true, style: { stroke: TEAL, strokeWidth: 2 } };
const ie = { type: 'smoothstep', animated: true, style: { stroke: INDIGO, strokeWidth: 2 } };
const de = { type: 'smoothstep', animated: true, style: { stroke: INDIGO, strokeWidth: 1.5, strokeDasharray: '5 5' } };

const initialEdges = [
  { id: 'e1', source: 'cli', target: 'coordinator', sourceHandle: 'bot-src', targetHandle: 'top-tgt', ...te },
  { id: 'e2', source: 'coordinator', target: 'daemon1', sourceHandle: 'bot-src', targetHandle: 'top-tgt', ...te },
  { id: 'e3', source: 'coordinator', target: 'daemon2', sourceHandle: 'bot-src', targetHandle: 'top-tgt', ...te },
  { id: 'e4', source: 'coordinator', target: 'daemon3', sourceHandle: 'bot-src', targetHandle: 'top-tgt', ...te },
  { id: 'e5', source: 'daemon1', target: 'nodeA', sourceHandle: 'bot-src', targetHandle: 'top-tgt', ...ie },
  { id: 'e6', source: 'daemon1', target: 'nodeB', sourceHandle: 'bot-src', targetHandle: 'top-tgt', ...ie },
  { id: 'e7', source: 'daemon2', target: 'nodeC', sourceHandle: 'bot-src', targetHandle: 'top-tgt', ...ie },
  { id: 'e8', source: 'daemon2', target: 'nodeD', sourceHandle: 'bot-src', targetHandle: 'top-tgt', ...ie },
  { id: 'e9', source: 'daemon3', target: 'nodeE', sourceHandle: 'bot-src', targetHandle: 'top-tgt', ...ie },
  { id: 'e10', source: 'daemon3', target: 'nodeF', sourceHandle: 'bot-src', targetHandle: 'top-tgt', ...ie },
  { id: 'e11', source: 'zenoh', target: 'daemon1', sourceHandle: 'top-src', targetHandle: 'bot-tgt', ...de },
  { id: 'e12', source: 'zenoh', target: 'daemon2', sourceHandle: 'top-src', targetHandle: 'bot-tgt', ...de },
  { id: 'e13', source: 'zenoh', target: 'daemon3', sourceHandle: 'top-src', targetHandle: 'bot-tgt', ...de },
];

export default function ArchitectureFlow() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ height: 580, display: 'grid', placeItems: 'center', color: '#5A5A7A' }}>Loading...</div>;

  return (
    <div style={{ height: 580, width: '100%' }}>
      <ReactFlow nodes={initialNodes} edges={initialEdges} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.15 }}
        nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
        panOnDrag={false} zoomOnScroll={false} zoomOnPinch={false} zoomOnDoubleClick={false}
        preventScrolling={false} proOptions={{ hideAttribution: true }} style={{ background: 'transparent' }}>
        <Background color="rgba(0, 212, 170, 0.04)" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}
