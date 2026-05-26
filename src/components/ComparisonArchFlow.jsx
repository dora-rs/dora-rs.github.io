import { useState, useEffect } from 'react';
import { ReactFlow, Background, Position, Handle } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const TEAL = '#00D4AA';
const TEAL_DARK = '#00A882';
const AMBER = '#FFB84D';
const AMBER_DARK = '#D49A30';
const MUTED = '#5A5A7A';
const MUTED_DARK = '#3A3A55';
const INDIGO = '#4A4AFF';

const hs = { background: 'transparent', border: 'none', width: 1, height: 1 };

const AllHandles = () => (
  <>
    <Handle type="source" position={Position.Top} id="top-src" style={hs} />
    <Handle type="target" position={Position.Top} id="top-tgt" style={hs} />
    <Handle type="source" position={Position.Bottom} id="bot-src" style={hs} />
    <Handle type="target" position={Position.Bottom} id="bot-tgt" style={hs} />
  </>
);

function ArchNode({ data }) {
  return (
    <div style={{
      background: data.bg, border: `1.5px solid ${data.border}`, borderRadius: 8,
      padding: '10px 18px', color: '#FAFAFA', fontSize: 14, fontFamily: "'Geist Mono', monospace",
      textAlign: 'center', minWidth: data.wide ? 160 : 100, opacity: data.muted ? 0.5 : 1,
      boxShadow: data.muted ? 'none' : '0 4px 16px rgba(0,0,0,0.3)',
    }}>
      <AllHandles />
      <div style={{ fontWeight: 600, fontSize: 15 }}>{data.label}</div>
      {data.sub && <div style={{ fontSize: 10, color: '#8888AA', marginTop: 2 }}>{data.sub}</div>}
    </div>
  );
}

function LabelNode({ data }) {
  return (
    <div style={{
      fontSize: 14, fontFamily: "'Geist', sans-serif", fontWeight: 500,
      color: data.color || '#8888AA', textAlign: 'center', padding: '4px 12px',
      borderBottom: `2px solid ${data.color || '#8888AA'}`,
    }}>
      {data.label}
    </div>
  );
}

const nodeTypes = { arch: ArchNode, label: LabelNode };

const doraNodes = [
  { id: 'dl', type: 'label', position: { x: 60, y: 0 }, data: { label: 'dora 0.x', color: MUTED } },
  { id: 'd-cli', type: 'arch', position: { x: 50, y: 50 }, data: { label: 'dora CLI', bg: MUTED_DARK, border: MUTED, muted: true } },
  { id: 'd-coord', type: 'arch', position: { x: 30, y: 140 }, data: { label: 'Coordinator', sub: 'TCP', bg: MUTED_DARK, border: MUTED, muted: true, wide: true } },
  { id: 'd-daemon', type: 'arch', position: { x: 50, y: 230 }, data: { label: 'Daemon', bg: MUTED_DARK, border: MUTED, muted: true } },
  { id: 'd-n1', type: 'arch', position: { x: 10, y: 320 }, data: { label: 'Node A', bg: MUTED_DARK, border: MUTED, muted: true } },
  { id: 'd-n2', type: 'arch', position: { x: 120, y: 320 }, data: { label: 'Node B', bg: MUTED_DARK, border: MUTED, muted: true } },
];

const doraEdges = [
  { id: 'de1', source: 'd-cli', target: 'd-coord', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', style: { stroke: MUTED, strokeWidth: 1.5, opacity: 0.5 } },
  { id: 'de2', source: 'd-coord', target: 'd-daemon', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', style: { stroke: MUTED, strokeWidth: 1.5, opacity: 0.5 } },
  { id: 'de3', source: 'd-daemon', target: 'd-n1', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', style: { stroke: MUTED, strokeWidth: 1, opacity: 0.4 } },
  { id: 'de4', source: 'd-daemon', target: 'd-n2', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', style: { stroke: MUTED, strokeWidth: 1, opacity: 0.4 } },
];

const adoraNodes = [
  { id: 'al', type: 'label', position: { x: 460, y: 0 }, data: { label: 'dora 1.0', color: TEAL } },
  { id: 'a-cli', type: 'arch', position: { x: 440, y: 50 }, data: { label: 'dora CLI', bg: AMBER_DARK, border: AMBER, wide: true } },
  { id: 'a-coord', type: 'arch', position: { x: 430, y: 140 }, data: { label: 'Coordinator', sub: 'WebSocket :6013', bg: TEAL_DARK, border: TEAL, wide: true } },
  { id: 'a-d1', type: 'arch', position: { x: 330, y: 240 }, data: { label: 'Daemon 1', bg: '#2A2A66', border: INDIGO } },
  { id: 'a-d2', type: 'arch', position: { x: 460, y: 240 }, data: { label: 'Daemon 2', bg: '#2A2A66', border: INDIGO } },
  { id: 'a-d3', type: 'arch', position: { x: 590, y: 240 }, data: { label: 'Daemon 3', bg: '#2A2A66', border: INDIGO } },
  { id: 'a-zenoh', type: 'arch', position: { x: 380, y: 310 }, data: { label: 'Zenoh Data Plane', bg: 'rgba(74, 74, 255, 0.08)', border: TEAL, wide: true } },
  { id: 'a-n1', type: 'arch', position: { x: 310, y: 380 }, data: { label: 'Node A', bg: MUTED_DARK, border: MUTED } },
  { id: 'a-n2', type: 'arch', position: { x: 410, y: 380 }, data: { label: 'Node B', bg: MUTED_DARK, border: MUTED } },
  { id: 'a-n3', type: 'arch', position: { x: 510, y: 380 }, data: { label: 'Node C', bg: MUTED_DARK, border: MUTED } },
  { id: 'a-n4', type: 'arch', position: { x: 610, y: 380 }, data: { label: 'Node D', bg: MUTED_DARK, border: MUTED } },
];

const adoraEdges = [
  { id: 'ae1', source: 'a-cli', target: 'a-coord', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', animated: true, style: { stroke: AMBER, strokeWidth: 2 } },
  { id: 'ae2', source: 'a-coord', target: 'a-d1', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', animated: true, style: { stroke: TEAL, strokeWidth: 1.5 } },
  { id: 'ae3', source: 'a-coord', target: 'a-d2', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', animated: true, style: { stroke: TEAL, strokeWidth: 1.5 } },
  { id: 'ae4', source: 'a-coord', target: 'a-d3', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', animated: true, style: { stroke: TEAL, strokeWidth: 1.5 } },
  { id: 'ae5', source: 'a-d1', target: 'a-n1', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', animated: true, style: { stroke: INDIGO, strokeWidth: 1 } },
  { id: 'ae6', source: 'a-d1', target: 'a-n2', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', animated: true, style: { stroke: INDIGO, strokeWidth: 1 } },
  { id: 'ae7', source: 'a-d2', target: 'a-n3', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', animated: true, style: { stroke: INDIGO, strokeWidth: 1 } },
  { id: 'ae8', source: 'a-d3', target: 'a-n4', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', animated: true, style: { stroke: INDIGO, strokeWidth: 1 } },
  { id: 'ae9', source: 'a-d1', target: 'a-zenoh', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', animated: true, style: { stroke: TEAL, strokeWidth: 1, strokeDasharray: '4 4' } },
  { id: 'ae10', source: 'a-d2', target: 'a-zenoh', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', animated: true, style: { stroke: TEAL, strokeWidth: 1, strokeDasharray: '4 4' } },
  { id: 'ae11', source: 'a-d3', target: 'a-zenoh', sourceHandle: 'bot-src', targetHandle: 'top-tgt', type: 'smoothstep', animated: true, style: { stroke: TEAL, strokeWidth: 1, strokeDasharray: '4 4' } },
];

const nodes = [...doraNodes, ...adoraNodes];
const edges = [...doraEdges, ...adoraEdges];

export default function ComparisonArchFlow() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div style={{ height: 460, display: 'grid', placeItems: 'center', color: '#5A5A7A' }}>Loading...</div>;

  return (
    <div style={{ height: 460, width: '100%' }}>
      <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} fitView fitViewOptions={{ padding: 0.12 }}
        nodesDraggable={false} nodesConnectable={false} elementsSelectable={false}
        panOnDrag={false} zoomOnScroll={false} zoomOnPinch={false} zoomOnDoubleClick={false}
        preventScrolling={false} proOptions={{ hideAttribution: true }} style={{ background: 'transparent' }}>
        <Background color="rgba(0, 212, 170, 0.04)" gap={20} size={1} />
      </ReactFlow>
    </div>
  );
}
